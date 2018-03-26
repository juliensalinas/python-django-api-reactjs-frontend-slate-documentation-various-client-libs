# -*- coding: utf-8 -*-

"""
Routing.

React app uses HTML history so no server request
But in case of refresh (F5) there is a server request
and we need to redirect to index
"""

from django.conf.urls import url, include
from django.contrib import admin

from rest_framework.authtoken.views import obtain_auth_token

from react_api_connection import views as react_api_connection_views
from api_docs import views as api_docs_views
from api_core import views as api_core_views
from billing import views as billing_views

# ----------------------------------------------

urlpatterns = [

    url(r'^client/.*', react_api_connection_views.index, name='index'),
    url(
        r'^client/pwd/(.*)/$',
        api_core_views.set_new_password,
        name='set_new_password'
    ),

    # ------------------------------------------------

    url(
        r'^subscription/(.*)/$',
        billing_views.token_login,
        name='token_login'
    ),
    url(r'^subscription$', billing_views.subscription, name='subscription'),
    url(r'^plans$', billing_views.plans, name='plans'),
    url(r'^payment$', billing_views.payment, name='payment'),
    url(
        r'^get-stripe-token',
        billing_views.get_stripe_token,
        name='get_stripe_token'
    ),
    url(
        r'^stripe-webhooks$',
        billing_views.stripe_webhooks,
        name='stripe_webhooks'
    ),

    # ------------------------------------------------

    url(r'^company', api_core_views.company, name='company'),
    url(r'^contact', api_core_views.contact, name='contact'),
    url(r'^register$', api_core_views.register, name='register'),
    url(
        r'^ask-password-reset$',
        api_core_views.ask_password_reset,
        name='ask_password_reset'
    ),
    url(
        r'^process-new-password$',
        api_core_views.process_new_password,
        name='process_new_password'
    ),

    # ------------------------------------------------

    url(
        r'^api-token-auth/',
        obtain_auth_token,
        name='obtain_auth_token'
    ),

    # ------------------------------------------------

    url(r'^$', api_docs_views.docs, name='docs'),

    # ------------------------------------------------

    url(r'^admin/', include(admin.site.urls)),

]
