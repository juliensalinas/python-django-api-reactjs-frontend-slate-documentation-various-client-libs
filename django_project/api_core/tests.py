# -*- coding: utf-8 -*-

r"""
Tests.

Gave up fixtures because had a lot of troubles:
- need to create fixtures by hand which is very long and boring
- some fixtures raise an error 'schema does not exist' impossible to solve

So use a db replication instead.
Ideally it should be done before each test or at least after each data
structure modification (way to automate it ?).

- DROP DATABASE test_django_project_db;
- CREATE DATABASE test_django_project_db TEMPLATE django_project_db;
- \c test_django_project_db;
- DELETE FROM test_django_project_db;
- python manage.py test --keepdb
"""

import json

from django.core.urlresolvers import reverse
from django.test import TestCase

from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.authtoken.views import obtain_auth_token

from api_core.views import contact
from api_core.views import register

from billing.models import Plan

# -----------------------------------------------


class TestSignUpProcess(APITestCase):
    """Test the sign up process."""

    def test_not_registered_user(self):
        """Test that an unregistered user cannot use the API."""
        response = self.client.get(
            reverse('company'),
            {'domain': 'siemens.com'}
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_registering_user(self):
        """Test that user registration is working."""
        response = self.client.post(
            reverse(register),
            {
                'username': 'test@test.com',
                'password': 'toto'
            }
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_token(self):
        """Test that a we can retrieve a token by sending username + pass."""
        response = self.client.post(
            reverse(register),
            {
                'username': 'test@test.com',
                'password': 'toto'
            }
        )
        # need to send json explicitely because obtain_auth_token only accepts
        # json data requets by default
        response = self.client.post(
            reverse(obtain_auth_token),
            {
                'username': 'test@test.com',
                'password': 'toto'
            },
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestAPIAccess(APITestCase):
    """Test access to API for users with API rights."""

    def setUp(self):
        """First register a user (automatically registered to free plan)."""
        username = 'test@test.com'
        password = 'toto'

        # Register a user
        self.client.post(
            reverse(register),
            {
                'username': username,
                'password': password
            }
        )

        # Retrieve user token
        response = self.client.post(
            reverse(obtain_auth_token),
            {
                'username': username,
                'password': password
            },
            format='json'
        )
        self.token = json.loads(response.content)['token']

    def test_api_access_ok(self):
        """Test API access by looking up for siemens.com."""
        self.client.credentials(
            HTTP_AUTHORIZATION='Token %s' % self.token,
            HTTP_ACCEPT='application/vnd.api+json; version=1'
        )

        response = self.client.get(
            reverse('company'),
            {'domain': 'siemens.com'}
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_company_lookup_ok(self):
        """Test company lookup by looking up for siemens.com."""
        self.client.credentials(
            HTTP_AUTHORIZATION='Token %s' % self.token,
            HTTP_ACCEPT='application/vnd.api+json; version=1'
        )

        response = self.client.get(
            reverse('company'),
            {'domain': 'siemens.com'}
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_contact_lookup_ok(self):
        """
        Test contact lookup.

        Looking up for hans-herbert.miehe@grecon.de
        """
        self.client.credentials(
            HTTP_AUTHORIZATION='Token %s' % self.token,
            HTTP_ACCEPT='application/vnd.api+json; version=1'
        )

        response = self.client.get(
            reverse(contact),
            {'email': 'hant.m@grcn.de'}
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestReactToDjangoVueConnection(TestCase):
    """Test the React to Django/Vue token to session connection."""

    def setUp(self):
        """First register a user (automatically registered to free plan)."""
        username = 'test@test.com'
        password = 'toto'

        # Register a user
        self.client.post(
            reverse(register),
            {
                'username': username,
                'password': password
            }
        )

        # Retrieve user token
        response = self.client.post(
            reverse(obtain_auth_token),
            {
                'username': username,
                'password': password
            },
            format='json'
        )
        self.token = json.loads(response.content)['token']

    def test_token_based_login(self):
        """
        Test that django session is created based on token.

        This is for the transition from React to Vue.
        We check that we are properly redirected to the
        "subscription" template when using the token_login
        view.
        """
        response = self.client.get(
            reverse('token_login', args=[self.token]),
            # Needed in order to follow redirections:
            follow=True
        )

        self.assertEqual(
            response.templates[0].name,
            'billing/subscription.html'
        )


class TestDjangoVueInterface(APITestCase):
    """Test the Django/Vue interface."""

    def setUp(self):
        """Register and log user in."""
        username = 'test@test.com'
        password = 'toto'

        # Register a user
        self.client.post(
            reverse(register),
            {
                'username': username,
                'password': password
            }
        )

        # Retrieve user token
        response = self.client.post(
            reverse(obtain_auth_token),
            {
                'username': username,
                'password': password
            },
            format='json'
        )
        self.token = json.loads(response.content)['token']

        # Log him in
        self.client.get(
            reverse('token_login', args=[self.token]),
            # Needed in order to follow redirections:
            follow=True
        )

    def test_default_monthly_requests_amount(self):
        """Test that default amount of monthly requests is correct."""
        monthly_requests = Plan.objects.get(name='plan0').monthly_requests

        response = self.client.get(
            reverse('subscription'),
        )
        self.assertEqual(
            # {{ plan.monthly_requests }} in template becomes
            # 'plan_monthly_requests' here.
            response.context['plan_monthly_requests'],
            monthly_requests
        )

    def test_default_remaining_requests_amount(self):
        """Test that default amount of remaining requests is correct."""
        remaining_requests = Plan.objects.get(name='plan0').monthly_requests

        response = self.client.get(
            reverse('subscription'),
        )
        self.assertEqual(
            # {{ plan.monthly_requests }} in template becomes
            # 'plan_monthly_requests' here.
            response.context['remaining_requests'],
            remaining_requests
        )

    def test_requests_counter_decrease(self):
        """
        Test that requests counter decreases.

        For a code 200 request not already requested during the month.
        """
        self.client.credentials(
            HTTP_AUTHORIZATION='Token %s' % self.token,
            HTTP_ACCEPT='application/vnd.api+json; version=1'
        )
        response = self.client.get(
            reverse('company'),
            {'domain': 'siemens.com'}
        )
        monthly_requests = Plan.objects.get(name='plan0').monthly_requests
        remaining_requests = monthly_requests - 1
        response = self.client.get(
            reverse('subscription'),
        )

        self.assertEqual(
            # {{ plan.monthly_requests }} in template becomes
            # 'plan_monthly_requests' here.
            response.context['remaining_requests'],
            remaining_requests
        )
