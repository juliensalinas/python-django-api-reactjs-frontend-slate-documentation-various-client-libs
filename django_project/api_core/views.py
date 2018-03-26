# -*- coding: utf-8 -*-

"""
Core of the API.

User starts with a free plan by default when he subscribes.
He has a pool of available requests per month.
The pool decreases only when requests are successful (code 200)
and when the same request has not already been done during the
month.
"""

# import logging
# logging.basicConfig(
#     level=logging.DEBUG,
#     filename='/debug.log',
#     format='%(asctime)s %(levelname)s: %(message)s',
#     datefmt='%Y-%m-%d %H:%M:%S'
# )
# logging.basicConfig(
#     level=logging.DEBUG,
#     format='%(asctime)s %(levelname)s: %(message)s',
#     datefmt='%Y-%m-%d %H:%M:%S'
# )
from urlparse import urlparse
from dateutil.relativedelta import *  # noqa

from django.utils import timezone
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from django.db import IntegrityError
from django.core.validators import validate_email
from django.core import signing
from django.core.signing import TimestampSigner
from django.core.urlresolvers import reverse
from django.conf import settings

from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
    throttle_classes,
    renderer_classes
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from rest_framework.throttling import UserRateThrottle
from rest_framework.renderers import JSONRenderer
from rest_framework.authtoken.models import Token

from api_core.models import (
    CompanyFromdb2,
    CompanySocialProfileFromdb2,
    CompanyFromdb1,
    ContactFromdb2,
    EmailDomainPatternFromdb2,
    ContactFromdb1,
    ApiAccessLog,
    Customer,
    CustomerAction,
    CustomerActivity
)

from billing.models import Plan

from external_data_providers.models import (
    ClearbitPerson,
    ClearbitCompany,
    ClearbitCompanySiteEmailAddress
)

from utils.send_emails import send_password_reset_email
from utils import api_errors
from utils import api_string_mappings

from external_data_providers import clearbit_api

# -------------------------------------------------------------------

errors_for_dev = api_errors.errors_for_dev
errors_for_customers = api_errors.errors_for_customers
company_size_mapping_dict = api_string_mappings.company_size_mapping_dict
french_to_english_country_mapping_dict = api_string_mappings.french_to_english_country_mapping_dict  # noqa

# --------------------------------------------------------------------


class CustomAPIRenderer(JSONRenderer):
    """Set the media type of the request."""

    media_type = 'application/vnd.api+json'


class PerMinuteUserThrottle(UserRateThrottle):
    """1st throttling level."""

    rate = '650/minute'


class PerDayUserThrottle(UserRateThrottle):
    """2nd throttling level."""

    rate = '1000/day'  # second, minute, hour, or day. Only.


def customer_throttling_checked(request, user_input):
    """
    Check that user plan is respected.

    Could not do it extending DRF BaseThrottle because we
    need to check wether the parameter is found in our
    DB and whether already requested in the past before
    allowing the request or not. DRF throttling happens
    before all this.
    """
    user = request.user
    plan_monthly_requests = user.customer.plan.monthly_requests
    current_period_end_date = user.customer.current_period_end_date
    spare_requests = user.customer.spare_requests
    current_period_start_date = current_period_end_date - relativedelta(
        months=1
    )

    # Count all requests during the month with a 200 code
    # except requests already done by customer (eg same
    # domain name).
    api_calls_counter = ApiAccessLog.objects.filter(
        user=user,
        http_response_code=200,
        date__lte=current_period_end_date,
        date__gt=current_period_start_date
    ).exclude(
        user_input=user_input
    ).distinct('user_input').count()

    if api_calls_counter <= plan_monthly_requests + spare_requests:
        return True
    else:
        return False


def api_access_logging(
    request,
    endpoint,
    user_input,
    http_response_code,
    custom_error_code,
    api_version
):
    """Logging every access to API in DB."""
    aal = ApiAccessLog()

    aal.date = timezone.now()
    aal.url = request.get_full_path()
    aal.user = request.user
    aal.endpoint = endpoint
    aal.user_input = user_input
    aal.http_response_code = http_response_code
    aal.custom_error_code = custom_error_code
    aal.api_version = api_version

    try:
        ip = request.META['REMOTE_ADDR']
        aal.ip = ip
    except KeyError:
        pass

    try:
        referer = request.META['HTTP_REFERER']
        aal.referer = referer
    except KeyError:
        pass

    try:
        user_agent = request.META['HTTP_USER_AGENT']
        aal.user_agent = user_agent
    except KeyError:
        pass

    try:
        remote_host = request.META['REMOTE_HOST']
        aal.remote_host = remote_host
    except KeyError:
        pass

    try:
        remote_user = request.META['REMOTE_USER']
        aal.remote_user = remote_user
    except KeyError:
        pass

    aal.save()


def get_version_or_leave(request, endpoint, parameter):
    """Retrieve API version from the client request."""
    version = request.version

    if version:

        return version

    else:

        api_access_logging(request, endpoint, parameter, "400", "1", None)
        return Response(
            {
                "error_code": "1",
                "detail": (
                    "Please send API version in the HTTP Accept headers. "
                    "Example: application/vnd.api+json; version=v1"
                )
            },
            status=status.HTTP_400_BAD_REQUEST
        )


def company_v1(request):
    """
    Rules.

    1) look for fields in db1, except company name and company description
    which should be coming from db2 if exist.
    2) if some fields are not found in db1, see if exist in db2 and add them
    3) if no field is found in db1 (no row found), see if exist in db2 and
    add them

    If multiple rows are matching, only retrieve the first row.
    """
    domain = request.GET.get("domain")
    output_data = {}
    feed_company_from_db1_is_ok = 0

    if domain:

        domain = domain.lower()
        if domain.startswith("www."):
            domain = domain.replace("www.", "")

        try:

            output_data = feed_company_from_db1(output_data, domain)
            feed_company_from_db1_is_ok = 1

            try:

                output_data = company_addition_from_db2(output_data, domain)

            except IndexError:

                if not feed_company_from_db1_is_ok:

                    try:

                        output_data = feed_company_from_clearbit(
                            output_data=output_data,
                            domain=domain
                        )

                    except IndexError:

                        try:

                            clearbit_company = clearbit_api.get_company(domain)

                        except:
                            # Not sure which exceptions I could get from
                            # Clearbit's Python lib.
                            # I know I could get a KeyError if I'm trying
                            # to access a json field that Clearbit put in
                            # his docs but forgets to put in the response
                            # (actually not anymore because I'm retrieving
                            # the dict values with .get() now).
                            # But I don't know which error it would give me
                            # if api call gives me an error like a http 500
                            # error.
                            # Sometimes if Clearbit does not find a company
                            # it raises a 422 http error (validation error
                            # which should only happend for malformed domain
                            # names) instead of just returning none...

                            api_access_logging(
                                request,
                                "company",
                                domain,
                                "404",
                                "2",
                                "1"
                            )
                            return Response(
                                {
                                    "error_code": "2",
                                    "detail": errors_for_customers["2"]
                                },
                                status=status.HTTP_404_NOT_FOUND
                            )

                        if clearbit_company:

                            output_data = feed_company_from_clearbit(
                                output_data=output_data,
                                cbcompany=clearbit_company
                            )

                        else:

                            api_access_logging(
                                request,
                                "company",
                                domain,
                                "404",
                                "2",
                                "1"
                            )
                            return Response(
                                {
                                    "error_code": "2",
                                    "detail": errors_for_customers["2"]
                                },
                                status=status.HTTP_404_NOT_FOUND
                            )

        except IndexError:

            try:

                output_data = feed_company_from_clearbit(
                    output_data=output_data,
                    domain=domain
                )

            except IndexError:

                try:

                    clearbit_company = clearbit_api.get_company(domain)

                except:

                    api_access_logging(
                        request,
                        "company",
                        domain,
                        "404",
                        "2",
                        "1"
                    )
                    return Response(
                        {
                            "error_code": "2",
                            "detail": errors_for_customers["2"]
                        },
                        status=status.HTTP_404_NOT_FOUND
                    )

                if clearbit_company:

                    output_data = feed_company_from_clearbit(
                        output_data=output_data,
                        cbcompany=clearbit_company
                    )

                else:

                    api_access_logging(
                        request,
                        "company",
                        domain,
                        "404",
                        "2",
                        "1"
                    )
                    return Response(
                        {
                            "error_code": "2",
                            "detail": errors_for_customers["2"]
                        },
                        status=status.HTTP_404_NOT_FOUND
                    )

    else:

        api_access_logging(
            request,
            "company",
            domain,
            "400",
            "3",
            "1"
        )
        return Response(
            {
                "error_code": "3",
                "detail": errors_for_customers["3"]
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # Check that user plan allows this request.
    if not customer_throttling_checked(request, domain):

        api_access_logging(
            request,
            "company",
            domain,
            "402",
            "5",
            "1"
        )
        return Response(
            {
                "error_code": "5",
                "detail": errors_for_customers["5"]
            },
            status=status.HTTP_402_PAYMENT_REQUIRED
        )

    api_access_logging(
        request,
        "company",
        domain,
        "200",
        None,
        "1"
    )
    return Response(output_data)


def contact_v1(request):
    """
    Rules.

    1) look for fields in db1 first
    2) if some fields are not found in db1, see if exist in db2 and add them
    3) if no field is found in db1 (no row found), see if exists in db2 and
    add them
    using the 1st method (email in explorer_prospectemail)
    4) if no field is found in db2, see if exists in db2 and add them
    using the 2nd method (email in explorer_companyemail)

    If multiple rows are matching, only retrieve the first row.
    """
    email = request.GET.get("email")
    output_data = {}
    feed_contact_from_db1_is_ok = 0

    if email:

        email = email.lower()

        try:

            output_data = feed_contact_from_db1(output_data, email)
            feed_contact_from_db1_is_ok = 1

            try:

                output_data = contact_addition_from_db2(output_data, email)

            except IndexError:

                try:

                    output_data = contact_addition_from_db2_2(output_data, email)  # noqa

                except IndexError:

                    if not feed_contact_from_db1_is_ok:

                        try:

                            output_data = feed_contact_from_clearbit(
                                output_data=output_data,
                                email=email
                            )

                        except IndexError:

                            try:

                                clearbit_contact = clearbit_api.get_person_and_company(email)  # noqa

                            except:

                                api_access_logging(
                                    request,
                                    "contact",
                                    email,
                                    "404",
                                    "2",
                                    "1"
                                )
                                return Response(
                                    {
                                        "error_code": "2",
                                        "detail": errors_for_customers["2"]
                                    },
                                    status=status.HTTP_404_NOT_FOUND
                                )

                            if clearbit_contact:

                                output_data = feed_contact_from_clearbit(
                                    output_data=output_data,
                                    cbcontact=clearbit_contact
                                )

                            else:

                                api_access_logging(
                                    request,
                                    "contact",
                                    email,
                                    "404",
                                    "2",
                                    "1"
                                )
                                return Response(
                                    {
                                        "error_code": "2",
                                        "detail": errors_for_customers["2"]
                                    },
                                    status=status.HTTP_404_NOT_FOUND
                                )

        except IndexError:

            try:

                output_data = feed_contact_from_db2(output_data, email)

            except IndexError:

                try:

                    output_data = feed_contact_from_db2_2(output_data, email)

                except IndexError:

                    try:

                        output_data = feed_contact_from_clearbit(
                            output_data=output_data,
                            email=email
                        )

                    except IndexError:

                        try:

                            clearbit_contact = clearbit_api.get_person_and_company(email)  # noqa

                        except:

                            api_access_logging(
                                request,
                                "contact",
                                email,
                                "404",
                                "2",
                                "1"
                            )
                            return Response(
                                {
                                    "error_code": "2",
                                    "detail": errors_for_customers["2"]
                                },
                                status=status.HTTP_404_NOT_FOUND
                            )

                        if clearbit_contact:

                            output_data = feed_contact_from_clearbit(
                                output_data=output_data,
                                cbcontact=clearbit_contact
                            )

                        else:

                            api_access_logging(
                                request,
                                "contact",
                                email,
                                "404",
                                "2",
                                "1"
                            )
                            return Response(
                                {
                                    "error_code": "2",
                                    "detail": errors_for_customers["2"]
                                },
                                status=status.HTTP_404_NOT_FOUND
                            )

    else:

        api_access_logging(
            request,
            "contact",
            email,
            "400",
            "3",
            "1")
        return Response(
            {
                "error_code": "3",
                "detail": errors_for_customers["3"]
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # Checked that user plan allows this request.
    if not customer_throttling_checked(request, email):

        api_access_logging(
            request,
            "company",
            email,
            "402",
            "5",
            "1"
        )
        return Response(
            {
                "error_code": "5",
                "detail": errors_for_customers["5"]
            },
            status=status.HTTP_402_PAYMENT_REQUIRED
        )

    api_access_logging(
        request,
        "contact",
        email,
        "200",
        None,
        "1"
    )
    return Response(output_data)


@api_view(['GET'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
@throttle_classes([PerMinuteUserThrottle, PerDayUserThrottle])
@renderer_classes((CustomAPIRenderer,))
def company(request):
    """Dispatch to the proper company API version."""
    domain = request.GET.get("domain")
    version = get_version_or_leave(request, "company", domain)

    if version == '1':

        return company_v1(request)

    else:

        api_access_logging(
            request,
            "company",
            domain,
            "400",
            "4",
            None
        )
        return Response(
            {
                "error_code": "4",
                "detail": errors_for_customers["4"]
            },
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['GET'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
@throttle_classes([PerMinuteUserThrottle, PerDayUserThrottle])
@renderer_classes((CustomAPIRenderer,))
def contact(request):
    """Dispatch to the proper contact API version."""
    email = request.GET.get("email")
    version = get_version_or_leave(request, "contact", email)

    if version == '1':

        return contact_v1(request)

    else:

        api_access_logging(
            request,
            "contact",
            email,
            "400",
            "4",
            None
        )
        return Response(
            {
                "error_code": "4",
                "detail": errors_for_customers["4"]
            },
            status=status.HTTP_400_BAD_REQUEST
        )


def feed_company_from_db1(output_data, domain):
    """Look for a matching company in db1 DB."""
    companyfl = CompanyFromdb1.objects.using('db1').filter(
        company_domain__iexact=domain,
        active=1
    )[0]

    if companyfl.company_name:
        output_data['name'] = companyfl.company_name

    if companyfl.company_phone:
        output_data['phone'] = companyfl.company_phone

    if companyfl.company_website:
        analyzed_url = urlparse(companyfl.company_website)
        if analyzed_url.netloc and analyzed_url.scheme:
            website_url = "%s://%s" % (
                analyzed_url.scheme,
                analyzed_url.netloc
            )
        elif analyzed_url.netloc and not analyzed_url.scheme:
            website_url = analyzed_url.netloc
        else:
            website_url = analyzed_url.path
        output_data['website_url'] = website_url

    if (companyfl.company_size and
            company_size_mapping_dict.get(companyfl.company_size)):
        output_data['size'] = company_size_mapping_dict.get(
            companyfl.company_size
        )

    if companyfl.company_remarks:
        output_data['description'] = (
            companyfl.
            company_remarks.
            replace('\n', ' ').
            replace('\r', '')
        )

    if companyfl.company_social:
        output_data['linkedin_url'] = companyfl.company_social

    if companyfl.sectors:
        output_data['industries'] = companyfl.sectors.split(u'§')

    if companyfl.profiles:
        output_data['types'] = companyfl.profiles.split(u'§')

    if companyfl.updated_on:
        output_data['last_updated'] = companyfl.updated_on

    # only retrieving email if email_status=VAL and row was updated less than
    # 365days ago
    if companyfl.company_email_status == "VAL" and companyfl.updated_on:
        duration_in_days = (timezone.now() - companyfl.updated_on).days
        if duration_in_days <= 365:
            output_data['email'] = companyfl.company_email

    if companyfl.street_name and companyfl.city and companyfl.country:
        # TODO: if street_number or postcode are None, we do not add it but it
        # leaves 2 spaces...find a way to solve it intelligently
        output_data['formatted_address'] = "%s %s, %s %s, %s" % (
            companyfl.street_number if companyfl.street_number else '',
            companyfl.street_name,
            companyfl.postcode if companyfl.postcode else '',
            companyfl.city,
            companyfl.country.country_name
        )

    return output_data


def feed_contact_from_db1(output_data, email):
    """Look for a matching contact in db1 DB."""
    contactfl = ContactFromdb1.objects.using('db1').filter(
        contact_email__iexact=email,
        active=1
    )[0]

    if contactfl.firstname:
        output_data['first_name'] = contactfl.firstname

    if contactfl.lastname:
        output_data['last_name'] = contactfl.lastname

    # if contactfl.contact_phone:
    #   output_data['phone'] = contactfl.contact_phone

    if contactfl.contact_social:
        output_data['linkedin_url'] = contactfl.contact_social

    if contactfl.position:
        output_data['title'] = contactfl.position

    if contactfl.company.company_name:
        output_data['company'] = contactfl.company.company_name

    return output_data


def company_addition_from_db2(output_data, domain):
    """Look for new company info from db2 in addition to db1."""
    companyfc = CompanyFromdb2.objects.using('db2').filter(
        domain__iexact=domain
    )[0]

    if companyfc.founded:
        output_data['founded'] = companyfc.founded

    # maybe those 2 were already found in db1 but we want company name
    # and description from db2 as a priority
    # it's not the cleanest way since data are overwritten, but the easiest
    if companyfc.name:
        output_data['name'] = companyfc.name

    if companyfc.description:
        output_data['description'] = (
            companyfc.
            description.
            replace('\n', ' ').
            replace('\r', '')
        )

    try:
        output_data['formatted_address']
    except KeyError:
        if companyfc.address:
            # mapping french country names to english names
            # in case the french name is not found we put the english name
            # by default
            output_data['formatted_address'] = "%s, %s" % (
                companyfc.address,
                french_to_english_country_mapping_dict.get(
                    companyfc.country,
                    companyfc.country
                )
            )

    try:
        output_data['phone']
    except KeyError:
        if companyfc.telephone:
            output_data['phone'] = companyfc.telephone

    try:
        output_data['website_url']
    except KeyError:
        if companyfc.website:
            analyzed_url = urlparse(companyfc.website)
            if analyzed_url.netloc and analyzed_url.scheme:
                website_url = "%s://%s" % (
                    analyzed_url.scheme,
                    analyzed_url.netloc
                )
            elif analyzed_url.netloc and not analyzed_url.scheme:
                website_url = analyzed_url.netloc
            else:
                website_url = analyzed_url.path
            output_data['website_url'] = website_url

    try:
        output_data['size']
    except KeyError:
        if companyfc.size and company_size_mapping_dict.get(companyfc.size):
            output_data['size'] = company_size_mapping_dict.get(companyfc.size)

    try:
        output_data['last_updated']
    except KeyError:
        if companyfc.updated_on:
            output_data['last_updated'] = companyfc.updated_on

    # try to add linkedin profile from db2 (not present in db1).
    # Needs to use a JOIN
    try:
        companysocialprofilefc = CompanySocialProfileFromdb2.objects.using(
            'db2'
        ).filter(
            company__domain=domain
        )[0]
        output_data['linkedin_url'] = companysocialprofilefc.url
    except IndexError:
        pass

    return output_data


def contact_addition_from_db2(output_data, email):
    """Look for contact in db2 contactemail table in addition to db1."""
    contactfc = ContactFromdb2.objects.using('db2').filter(
        email__email__iexact=email
    )[0]

    if contactfc.address:
        output_data['location'] = contactfc.address

    try:
        output_data['first_name']
    except KeyError:
        if contactfc.first_name:
            output_data['first_name'] = contactfc.first_name

    try:
        output_data['last_name']
    except KeyError:
        if contactfc.last_name:
            output_data['last_name'] = contactfc.last_name

    try:
        output_data['linkedin_url']
    except KeyError:
        if contactfc.social_profile.url:
            output_data['linkedin_url'] = contactfc.social_profile.url

    try:
        output_data['title']
    except KeyError:
        if contactfc.job_title:
            output_data['title'] = contactfc.job_title

    try:
        output_data['company']
    except KeyError:
        if contactfc.company.name:
            output_data['company'] = contactfc.company.name

    return output_data


def contact_addition_from_db2_2(output_data, email):
    """Look for contact in db2 in emaildomain table in addition to db1."""
    contactfc2 = EmailDomainPatternFromdb2.objects.using('db2').filter(
        email__email=email
    )[0].person

    if contactfc2.address:
        output_data['location'] = contactfc2.address

    try:
        output_data['first_name']
    except KeyError:
        if contactfc2.first_name:
            output_data['first_name'] = contactfc2.first_name

    try:
        output_data['last_name']
    except KeyError:
        if contactfc2.last_name:
            output_data['last_name'] = contactfc2.last_name

    try:
        output_data['linkedin_url']
    except KeyError:
        if contactfc2.social_profile.url:
            output_data['linkedin_url'] = contactfc2.social_profile.url

    try:
        output_data['title']
    except KeyError:
        if contactfc2.job_title:
            output_data['title'] = contactfc2.job_title

    try:
        output_data['company']
    except KeyError:
        if contactfc2.company.name:
            output_data['company'] = contactfc2.company.name

    return output_data


def feed_company_from_db2(output_data, domain):
    """Look for company in db2 DB."""
    companyfc = CompanyFromdb2.objects.using('db2').filter(
        domain__iexact=domain
    )[0]

    if companyfc.founded:
        output_data['founded'] = companyfc.founded

    if companyfc.name:
        output_data['name'] = companyfc.name

    if companyfc.address:
        output_data['formatted_address'] = "%s, %s" % (
            companyfc.address,
            french_to_english_country_mapping_dict.get(
                companyfc.country,
                companyfc.country
            )
        )

    if companyfc.telephone:
        output_data['phone'] = companyfc.telephone

    if companyfc.website:
        analyzed_url = urlparse(companyfc.website)
        if analyzed_url.netloc and analyzed_url.scheme:
            website_url = "%s://%s" % (
                analyzed_url.scheme,
                analyzed_url.netloc
            )
        elif analyzed_url.netloc and not analyzed_url.scheme:
            website_url = analyzed_url.netloc
        else:
            website_url = analyzed_url.path
        output_data['website_url'] = website_url

    if companyfc.size and company_size_mapping_dict.get(companyfc.size):
        output_data['size'] = company_size_mapping_dict.get(companyfc.size)

    if companyfc.description:
        output_data['description'] = companyfc.description.replace(
            '\n',
            ' '
        ).replace(
            '\r',
            ''
        )

    if companyfc.updated_on:
        output_data['last_updated'] = companyfc.updated_on

    try:
        companysocialprofilefc = CompanySocialProfileFromdb2.objects.using(
            'db2'
        ).filter(
            company__domain=domain
        )[0]
        output_data['linkedin_url'] = companysocialprofilefc.url
    except IndexError:
        pass

    return output_data


def feed_contact_from_db2(output_data, email):
    """Look for contact in db2 DB."""
    contactfc = ContactFromdb2.objects.using('db2').filter(
        email__email__iexact=email
    )[0]

    if contactfc.address:
        output_data['location'] = contactfc.address

    if contactfc.first_name:
        output_data['first_name'] = contactfc.first_name

    if contactfc.last_name:
        output_data['last_name'] = contactfc.last_name

    if contactfc.social_profile.url:
        output_data['linkedin_url'] = contactfc.social_profile.url

    if contactfc.job_title:
        output_data['title'] = contactfc.job_title

    if contactfc.company.name:
        output_data['company'] = contactfc.company.name

    return output_data


def feed_contact_from_db2_2(output_data, email):
    """
    Look for contact in db2 in emaildomain.

    Here is the equivalent SQL request:
    SELECT explorer_prospect.first_name,
    explorer_prospect.last_name,
    explorer_companyemail.email
    FROM explorer_companyemail
    JOIN explorer_emaildomainpattern
    ON explorer_emaildomainpattern.email_id=explorer_companyemail.id
    JOIN explorer_prospect
    ON explorer_prospect.id=explorer_emaildomainpattern.person_id
    WHERE explorer_companyemail.email = 'andre.pearson@pharmalex.com'
    """
    contactfc2 = EmailDomainPatternFromdb2.objects.using('db2').filter(
        email__email=email
    )[0].person

    if contactfc2.address:
        output_data['location'] = contactfc2.address

    if contactfc2.first_name:
        output_data['first_name'] = contactfc2.first_name

    if contactfc2.last_name:
        output_data['last_name'] = contactfc2.last_name

    if contactfc2.social_profile.url:
        output_data['linkedin_url'] = contactfc2.social_profile.url

    if contactfc2.job_title:
        output_data['title'] = contactfc2.job_title

    if contactfc2.company.name:
        output_data['company'] = contactfc2.company.name

    return output_data


def feed_company_from_clearbit(
    output_data,
    domain=None,
    cbcompany=None
):
    """Get company data from the Clearbit table."""
    if not cbcompany:
        cbcompany = ClearbitCompany.objects.filter(domain__iexact=domain)[0]

    if cbcompany.founded_year:
        # Need to cast to str because Clearbit formats it as
        # an integer.
        output_data['founded'] = str(cbcompany.founded_year)

    if cbcompany.name:
        output_data['name'] = cbcompany.name

    if cbcompany.location:
        output_data['formatted_address'] = cbcompany.location

    if cbcompany.phone:
        output_data['phone'] = cbcompany.phone

    # Always have a domain.
    output_data['website_url'] = "http://%s" % cbcompany.domain

    if cbcompany.metrics_employees_range:
        output_data['size'] = cbcompany.metrics_employees_range

    if cbcompany.description:
        output_data['description'] = cbcompany.description

    if cbcompany.indexed_at:
        output_data['last_updated'] = cbcompany.indexed_at

    if cbcompany.linkedin_handle:
        output_data['linkedin_url'] = "https://www.linkedin.com/%s" % (
            cbcompany.linkedin_handle
        )

    if cbcompany.category_sub_industry:
        # cbcompany.category_sub_industry always contains 1 item
        # but our output_data['industries'] should return a list
        # so we put it in a list.
        output_data['industries'] = [cbcompany.category_sub_industry]

    try:
        # We have a list of emails in db but output_data['email']
        # should only return 1 email so we take the first email in
        # the list.
        csea = ClearbitCompanySiteEmailAddress.objects.filter(
            clearbit_company=cbcompany
        )[0]
        output_data['email'] = csea.email
    except IndexError:
        pass

    return output_data


def feed_contact_from_clearbit(
    output_data,
    email=None,
    cbcontact=None
):
    """Get contact data from the Clearbit table."""
    if not cbcontact:
        cbcontact = ClearbitPerson.objects.filter(email__iexact=email)[0]

    if cbcontact.location:
        output_data['location'] = cbcontact.location

    if cbcontact.name_given_name:
        output_data['first_name'] = cbcontact.name_given_name

    if cbcontact.name_family_name:
        output_data['last_name'] = cbcontact.name_family_name

    if cbcontact.linkedin_handle:
        output_data['linkedin_url'] = "https://www.linkedin.com/%s" % (
            cbcontact.linkedin_handle
        )

    if cbcontact.employment_title:
        output_data['title'] = cbcontact.employment_title

    if cbcontact.employment_name:
        output_data['company'] = cbcontact.employment_name

    return output_data


@csrf_exempt
def register(request):
    """Register a user."""
    output_data = {}

    if request.method == 'POST':

        email = request.POST.get('username')
        password = request.POST.get('password')

        if not email:
            output_data['error_code'] = '1'
            output_data['error_details'] = errors_for_dev['1']
            return JsonResponse(
                output_data,
                status=status.HTTP_400_BAD_REQUEST
            )

        if not password:
            output_data['error_code'] = '2'
            output_data['error_details'] = errors_for_dev['2']
            return JsonResponse(
                output_data,
                status=status.HTTP_400_BAD_REQUEST
            )

        email = email.lower()

        try:
            validate_email(email)
        except exceptions.ValidationError as e:
            output_data['error_code'] = '3'
            output_data['email_validation_errors'] = list(e.messages)
            output_data['error_details'] = errors_for_dev['3']
            return JsonResponse(
                output_data,
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            validate_password(password)
        except exceptions.ValidationError as e:
            output_data['error_code'] = '4'
            output_data['password_validation_errors'] = list(e.messages)
            output_data['error_details'] = errors_for_dev['4']
            return JsonResponse(
                output_data,
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            new_user = User.objects.create_user(email, email, password)
        except IntegrityError:
            output_data['error_code'] = '5'
            output_data['error_details'] = errors_for_dev['5']
            return JsonResponse(
                output_data,
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            token = Token.objects.create(user=new_user)
        except:
            output_data['error_code'] = '6'
            output_data['error_details'] = errors_for_dev['6']
            return JsonResponse(
                output_data,
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        try:
            customer_default_plan_name = "plan0"
            plan = Plan.objects.get(name=customer_default_plan_name)
            current_period_end_date = timezone.now() + relativedelta(months=1)
            new_customer = Customer(
                user=new_user,
                plan=plan,
                current_period_end_date=current_period_end_date,
                spare_requests=0
            )
            new_customer.save()
            new_user.customer = new_customer
            new_user.save()
            customer_action = CustomerAction.objects.get(
                name="account_creation"
            )
            new_customer_activity = CustomerActivity(
                customer=new_customer,
                customer_action=customer_action,
                date=timezone.now()
            )
            new_customer_activity.save()
        except:
            output_data['error_code'] = '7'
            output_data['error_details'] = errors_for_dev['7']
            return JsonResponse(
                output_data,
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        output_data['password'] = '*******'
        output_data['username'] = email
        output_data['token'] = token.key
        return JsonResponse(output_data)

    else:

        output_data['error_code'] = '8'
        output_data['error_details'] = errors_for_dev['8']
        return JsonResponse(output_data, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def ask_password_reset(request):
    """Retrieve user password reset request."""
    output_data = {}

    # Here we do not send a JSON answer based on success or failure
    # in order to prevent attackers from knowing if email exists in db or not.

    if request.method == 'POST':

        email = request.POST.get('email')

        if not email:
            output_data['error_code'] = '1'
            output_data['error_details'] = errors_for_dev['1']
            return JsonResponse(
                output_data,
                status=status.HTTP_400_BAD_REQUEST
            )

        email = email.lower()

        try:
            user = User.objects.get(email=email)
        except exceptions.ObjectDoesNotExist:
            return JsonResponse(output_data)

        signer = TimestampSigner()
        timestamped_id = signer.sign(user.id)

        password_reset_url = "%s%s" % (
            settings.SITE_BASE_URL,
            reverse(set_new_password, args=(timestamped_id,))
        )

        send_password_reset_email(email, password_reset_url)

        return JsonResponse(output_data)

    else:

        output_data['error_code'] = '8'
        output_data['error_details'] = errors_for_dev['8']
        return JsonResponse(
            output_data,
            status=status.HTTP_400_BAD_REQUEST
        )


@csrf_exempt
def set_new_password(request, timestamped_id):
    """Retrieve new user password."""
    output_data = {}

    try:
        signer = TimestampSigner()
        user_id = signer.unsign(timestamped_id, max_age=60 * 60 * 24 * 2)
    except signing.BadSignature:
        output_data['error_code'] = '9'
        output_data['error_details'] = errors_for_dev['9']
        return JsonResponse(
            output_data,
            status=status.HTTP_404_NOT_FOUND
        )

    try:
        User.objects.get(id=user_id)
    except exceptions.ObjectDoesNotExist:
        output_data['error_code'] = '10'
        output_data['error_details'] = errors_for_dev['10']
        return JsonResponse(
            output_data,
            status=status.HTTP_404_NOT_FOUND
        )

    output_data['secret'] = timestamped_id
    return JsonResponse(output_data)


@csrf_exempt
def process_new_password(request):
    """Process new user password."""
    output_data = {}

    if request.method == 'POST':

        password = request.POST.get('password')
        password_confirmation = request.POST.get('password_confirmation')
        timestamped_id = request.POST.get('secret')

        if not timestamped_id:
            output_data['error_code'] = '11'
            output_data['error_details'] = errors_for_dev['11']
            return JsonResponse(
                output_data,
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            signer = TimestampSigner()
            user_id = signer.unsign(timestamped_id, max_age=60 * 60 * 24 * 2)
        except signing.BadSignature:
            output_data['error_code'] = '9'
            output_data['error_details'] = errors_for_dev['9']
            return JsonResponse(
                output_data,
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            user = User.objects.get(id=user_id)
        except exceptions.ObjectDoesNotExist:
            output_data['error_code'] = '10'
            output_data['error_details'] = errors_for_dev['10']
            return JsonResponse(output_data)

        if not password:
            output_data['error_code'] = '2'
            output_data['error_details'] = errors_for_dev['2']
            return JsonResponse(
                output_data,
                status=status.HTTP_400_BAD_REQUEST
            )

        if not password_confirmation:
            output_data['error_code'] = '12'
            output_data['error_details'] = errors_for_dev['12']
            return JsonResponse(
                output_data,
                status=status.HTTP_400_BAD_REQUEST
            )

        if password != password_confirmation:
            output_data['error_code'] = '13'
            output_data['error_details'] = errors_for_dev['13']
            return JsonResponse(
                output_data,
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            validate_password(password)
        except exceptions.ValidationError as e:
            output_data['error_code'] = '4'
            output_data['password_validation_errors'] = list(e.messages)
            output_data['error_details'] = errors_for_dev['4']
            return JsonResponse(
                output_data,
                status=status.HTTP_400_BAD_REQUEST
            )

        user.set_password(password)
        user.save()

        output_data['password'] = '*******'
        return JsonResponse(output_data)

    else:

        output_data['error_code'] = '8'
        output_data['error_details'] = errors_for_dev['8']
        return JsonResponse(
            output_data,
            status=status.HTTP_400_BAD_REQUEST
        )
