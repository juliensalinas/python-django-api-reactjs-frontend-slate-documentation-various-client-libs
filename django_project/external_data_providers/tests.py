# -*- coding: utf-8 -*-

"""
Test external service providers APIs.

Gave up fixtures because had a lot of troubles:
- need to create fixtures by hand which is very long and boring
- some fixtures raise an error 'schema does not exist' impossible to solve

So use a db replication instead.
Ideally it should be done before each testo r at least after each data
structure modification (way to automate it ?).
I did this in psql:
- CREATE DATABASE test_django_project_db TEMPLATE django_project_db;

Now I have to launch tests with:
- python manage.py test --keepdb
"""

import clearbit

from django.test import TestCase

# -----------------------------------------------


class TestClearbitAPI(TestCase):
    """
    Test the Clearbit combined API.

    Does not cost money since Cleabit only bills once
    for a data.
    """

    clearbit.key = ''

    def test_combined_api(self):
        """Test the combined API."""
        email = ''
        response = clearbit.Enrichment.find(email=email, stream=True)
        self.assertIsNotNone(response)

    def test_company_api(self):
        """
        Test the company API.

        Not perfect because Clearbit can either return
        None or "pending" when nothing is found. Actually
        it can also return a 422 http error (it's a bug,
        it should return None instead).
        """
        domain = 'myapp.com'
        response = clearbit.Company.find(domain=domain)
        self.assertIsNotNone(response)
