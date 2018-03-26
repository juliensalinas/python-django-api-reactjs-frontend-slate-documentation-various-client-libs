# -*- coding: utf-8 -*-

"""Billing view."""

import stripe
from dateutil.relativedelta import *  # noqa

from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from django.contrib.auth import login
from django.core import exceptions
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt

from api_core.models import (
    Customer,
    ApiAccessLog
)

from billing.models import Plan

from utils import billing_errors

# --------------------------------------------------

stripe.api_key = ""
customer_billing_errors = billing_errors.errors_for_customers

# --------------------------------------------------


def stripe_webhooks(request):
    """Get Stripe webhook."""
    # Todo : get the webhook content, store it, make
    # relevant actions, and send us an email if
    # necessary.
    pass


def token_login(request, api_token):
    """Log user in based on API token passed in url."""
    try:
        user = User.objects.get(auth_token__key=api_token)
    except exceptions.ObjectDoesNotExist:
        return redirect(reverse('index'))

    login(request, user)

    return redirect(reverse('subscription'))


def subscription(request):
    """Render subscription page."""
    user = request.user
    customer = user.customer
    plan = user.customer.plan
    plan_monthly_requests = customer.plan.monthly_requests
    current_period_end_date = customer.current_period_end_date
    spare_requests = customer.spare_requests
    current_period_start_date = current_period_end_date - relativedelta(
        months=1
    )

    api_calls_counter = ApiAccessLog.objects.filter(
        user=user,
        http_response_code=200,
        date__lte=current_period_end_date,
        date__gt=current_period_start_date
    ).distinct('user_input').count()

    remaining_requests = plan_monthly_requests + spare_requests - api_calls_counter  # noqa

    return render(request, 'billing/subscription.html', locals())


def plans(request):
    """Render plans page."""
    user = request.user
    plan = user.customer.plan

    subscription_plans = Plan.objects.filter(
        active=True
    ).exclude(
        name=plan.name
    ).order_by(
        'euro_price'
    ).values()

    return render(request, 'billing/plans.html', locals())


def payment(request):
    """Render payment page."""
    try:
        plan = request.GET['plan']
    except KeyError:
        error_message = customer_billing_errors['1']
        return render(request, 'billing/subscription.html', locals())

    try:
        subscription_plan = Plan.objects.get(name=plan, active=True)
    except exceptions.ObjectDoesNotExist:
        # if no plan found in the list
        error_message = customer_billing_errors['1']
        return render(request, 'billing/subscription.html', locals())

    # If free plan:
    if not subscription_plan.euro_price:

        user = request.user
        customer = user.customer
        plan_monthly_requests = customer.plan.monthly_requests
        current_period_end_date = customer.current_period_end_date
        spare_requests = customer.spare_requests
        current_period_start_date = current_period_end_date - relativedelta(
            months=1
        )

        api_calls_counter = ApiAccessLog.objects.filter(
            user=user,
            http_response_code=200,
            date__lte=current_period_end_date,
            date__gt=current_period_start_date
        ).distinct('user_input').count()

        spare_requests = plan_monthly_requests + spare_requests - api_calls_counter  # noqa

        customer.spare_requests = spare_requests
        customer.current_period_end_date = timezone.now() + relativedelta(
            months=1
        )
        customer.plan = subscription_plan
        customer.save()

        # For context:
        plan = subscription_plan
        current_period_end_date = customer.current_period_end_date
        remaining_requests = spare_requests + plan.monthly_requests
        success_message = _(u"""Your new subscription is now set.
        Thank you !""")
        return render(request, 'billing/subscription.html', locals())

    return render(request, 'billing/payment.html', locals())


@require_POST
@csrf_exempt
def get_stripe_token(request):
    """
    Process Stripe token sent by frontend.

    TODO: differentiate error messages and add error codes to
    error messages and copy us by email.
    """
    try:
        stripe_token = request.POST['stripeToken']
        plan = request.POST['plan']
    except KeyError:
        error_message = customer_billing_errors['2']
        return render(request, 'billing/subscription.html', locals())

    # Check if plan really exists and is active and is not a free plan
    # (in case of request forgery).
    try:
        new_plan = Plan.objects.get(name=plan, active=True)
        if not new_plan.euro_price:
            error_message = customer_billing_errors['2']
            return render(request, 'billing/subscription.html', locals())
    except exceptions.ObjectDoesNotExist:
        error_message = customer_billing_errors['2']
        return render(request, 'billing/subscription.html', locals())

    # Retrieve stripe customer or create it.
    user = request.user
    customer = Customer.objects.get(user=user)
    if customer.stripe_id:
        stripe_id = customer.stripe_id
        try:
            stripe_customer = stripe.Customer.retrieve(stripe_id)
        except:
            error_message = customer_billing_errors['2']
            return render(request, 'billing/subscription.html', locals())
    else:
        email = user.email
        try:
            # By providing an email during customer creation, Stripe
            # will then be able to send receipts by email to
            # customer.
            stripe_customer = stripe.Customer.create(email=email)
            customer.stripe_id = stripe_customer.id
            customer.save()
        except exceptions.ObjectDoesNotExist:
            error_message = customer_billing_errors['2']
            return render(request, 'billing/subscription.html', locals())

    # Attach credit card to customer.
    # Could be done directly in Customer.create(source=...).
    try:
        stripe_customer.sources.create(source=stripe_token)
    except:
        error_message = customer_billing_errors['2']
        return render(request, 'billing/subscription.html', locals())

    # Subscribe customer to the plan.
    try:
        stripe.Subscription.create(
            customer=stripe_customer.id,
            plan=plan,
        )
    except:
        error_message = customer_billing_errors['2']
        return render(request, 'billing/subscription.html', locals())

    # If payment successful:
    plan = customer.plan
    plan_monthly_requests = customer.plan.monthly_requests
    current_period_end_date = customer.current_period_end_date
    spare_requests = customer.spare_requests
    current_period_start_date = current_period_end_date - relativedelta(
        months=1
    )

    api_calls_counter = ApiAccessLog.objects.filter(
        user=user,
        http_response_code=200,
        date__lte=current_period_end_date,
        date__gt=current_period_start_date
    ).distinct('user_input').count()

    spare_requests = plan_monthly_requests + spare_requests - api_calls_counter

    customer.spare_requests = spare_requests
    customer.current_period_end_date = timezone.now() + relativedelta(months=1)
    customer.plan = new_plan
    customer.save()

    # For context:
    plan = new_plan
    current_period_end_date = customer.current_period_end_date
    remaining_requests = spare_requests + plan.monthly_requests
    success_message = _(u"""Your payment was successfull.
    You will receive a receipt by email soon.
    Thank you and enjoy your new subscription !""")

    return render(request, 'billing/subscription.html', locals())
