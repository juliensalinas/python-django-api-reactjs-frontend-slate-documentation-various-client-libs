# -*- coding: utf-8 -*-

"""
Models of api_core.

When adding a new table from db2 or db1, do the following :
1) set new pg_dump/table rename in siamois script
2) launch siamois script on both local and server db
3) launch api container in order to launch a manage.py inspectdb
4) copy paste new tables from inspectdb here and don't rely on foreign
keys coming from inspect db, because some FK were not copied during pg_dump
(depending on whether the referenced tabled already exists or not)
5) replace textual foreign key (e.g. 'User') with the matching class (User)
6) order classes properly so the fk call his always above
7) create the fk not already created by and do not forget to remove the '_id'
at the end of the field name because Django will add it automately
"""

from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from billing.models import Plan

# ---------------------------------------------


class CustomerAction(models.Model):
    """
    Store all possible actions.

    - account_creation
    - plan_subscription (better to add a FK to the plan)
    - account_deletion
    """

    name = models.CharField(max_length=30)
    description = models.TextField()

    def __unicode__(self):
        """String representation of model."""
        return "%s" % self.name


class Customer(models.Model):
    """Customer model."""

    user = models.OneToOneField(User)
    plan = models.ForeignKey(Plan)
    stripe_id = models.CharField(max_length=30, blank=True, null=True)
    current_period_end_date = models.DateTimeField()
    # Requests reporting in case of plan change, or if we want to
    # treat a customer differently. Can be positive but negative also !
    spare_requests = models.IntegerField()

    def __unicode__(self):
        """String representation of model."""
        return "%s" % self.user


class CustomerActivity(models.Model):
    """Track customer account history."""

    customer = models.ForeignKey(Customer)
    customer_action = models.ForeignKey(CustomerAction)
    date = models.DateTimeField()


class ApiAccessLog(models.Model):
    """ApiAccessLog model."""

    user = models.ForeignKey(User)
    endpoint = models.CharField(max_length=30)
    api_version = models.CharField(max_length=3, blank=True, null=True)
    user_input = models.CharField(max_length=100, blank=True, null=True)
    http_response_code = models.CharField(max_length=3)
    custom_error_code = models.CharField(max_length=3, blank=True, null=True)
    date = models.DateTimeField()
    url = models.URLField()
    ip = models.GenericIPAddressField(blank=True, null=True)
    referer = models.CharField(max_length=1000, blank=True, null=True)
    user_agent = models.CharField(max_length=1000, blank=True, null=True)
    remote_host = models.CharField(max_length=1000, blank=True, null=True)
    remote_user = models.CharField(max_length=1000, blank=True, null=True)


class CompanyFromdb2(models.Model):
    """CompanyFromCL model."""

    name = models.CharField(max_length=200, blank=True, null=True)
    domain = models.CharField(
        unique=True,
        max_length=200,
        blank=True,
        null=True
    )
    website = models.CharField(max_length=500, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    logo = models.CharField(max_length=500, blank=True, null=True)
    telephone = models.CharField(max_length=100, blank=True, null=True)
    faxnumber = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    founded = models.CharField(max_length=200, blank=True, null=True)
    size = models.CharField(max_length=200, blank=True, null=True)
    mmatch_id = models.IntegerField(blank=True, null=True)
    created_on = models.DateTimeField()
    updated_on = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField()
    checker_report_id = models.IntegerField(unique=True, blank=True, null=True)
    google_place_id = models.CharField(max_length=100, blank=True, null=True)
    google_places_details = models.TextField(blank=True, null=True)
    google_places_textsearch = models.TextField(blank=True, null=True)
    full_contact_company_api_details = models.TextField(blank=True, null=True)
    geo_lat = models.CharField(max_length=100, blank=True, null=True)
    geo_lng = models.CharField(max_length=100, blank=True, null=True)
    google_maps_geocoding = models.TextField(blank=True, null=True)

    class Meta:
        """Model meta information."""

        db_table = 'explorer_company'
        managed = False


class CompanyFromdb1(models.Model):
    """CompanyFromdb1 model."""

    company_id = models.BigAutoField(primary_key=True)
    company_name = models.CharField(max_length=100)
    country = models.ForeignKey(
        'ListCountry',
        on_delete=models.DO_NOTHING,
        db_column='country',
        blank=True,
        null=True
    )
    company_logo = models.CharField(max_length=255, blank=True, null=True)
    company_logo_ok = models.SmallIntegerField()
    street_number = models.CharField(max_length=128, blank=True, null=True)
    street_name = models.CharField(max_length=255, blank=True, null=True)
    address_additional = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    postcode = models.CharField(max_length=16, blank=True, null=True)
    city = models.CharField(max_length=128, blank=True, null=True)
    state = models.CharField(max_length=128, blank=True, null=True)
    company_phone = models.CharField(max_length=64, blank=True, null=True)
    company_fax = models.CharField(max_length=64, blank=True, null=True)
    company_email = models.CharField(max_length=255, blank=True, null=True)
    company_email_status = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    company_social = models.CharField(max_length=255, blank=True, null=True)
    company_website = models.CharField(max_length=255, blank=True, null=True)
    company_website_previous = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    company_origin = models.CharField(max_length=128, blank=True, null=True)
    company_origin_date = models.CharField(
        max_length=32,
        blank=True,
        null=True
    )
    tradeshows = models.TextField(blank=True, null=True)
    sectors = models.TextField(blank=True, null=True)
    profiles = models.TextField(blank=True, null=True)
    categories = models.TextField(blank=True, null=True)
    categories_services = models.TextField(blank=True, null=True)
    spider_follow_links_policy = models.SmallIntegerField()
    spider_status = models.CharField(max_length=128, blank=True, null=True)
    spider_sectors = models.TextField(blank=True, null=True)
    spider_profiles = models.TextField(blank=True, null=True)
    spider_categories = models.TextField(blank=True, null=True)
    spider_categories_services = models.TextField(blank=True, null=True)
    spider_categories_keywords = models.TextField(blank=True, null=True)
    spider_categories_services_keywords = models.TextField(
        blank=True,
        null=True
    )
    company_remarks = models.TextField(blank=True, null=True)
    company_specific1 = models.CharField(max_length=128, blank=True, null=True)
    company_specific2 = models.CharField(max_length=128, blank=True, null=True)
    mission = models.CharField(max_length=64, blank=True, null=True)
    active = models.SmallIntegerField()
    is_primary = models.SmallIntegerField()
    db2_id = models.BigIntegerField()
    created_by = models.CharField(max_length=32, blank=True, null=True)
    updated_by = models.CharField(max_length=32, blank=True, null=True)
    created_on = models.DateTimeField(blank=True, null=True)
    updated_on = models.DateTimeField()
    updated_ip = models.TextField(blank=True, null=True)
    unique_key = models.TextField(blank=True, null=True)
    unique_key_exp = models.TextField(blank=True, null=True)
    mmatch_id = models.BigIntegerField()
    mmatch_verified = models.SmallIntegerField()
    last_import = models.TextField(blank=True, null=True)
    last_export = models.TextField(blank=True, null=True)
    bin = models.CharField(max_length=128, blank=True, null=True)
    company_size = models.CharField(max_length=32, blank=True, null=True)
    interested_in = models.TextField(blank=True, null=True)
    company_domain = models.CharField(max_length=128, blank=True, null=True)
    latitude_y = models.FloatField(blank=True, null=True)
    longitude_x = models.FloatField(blank=True, null=True)
    place_id = models.CharField(max_length=32, blank=True, null=True)
    formatted_address = models.CharField(max_length=255, blank=True, null=True)
    google_maps_url = models.TextField(blank=True, null=True)

    class Meta:
        """Model meta information."""

        db_table = 'company'
        managed = False


class ListCountry(models.Model):
    """ListCountry model."""

    country_code = models.TextField(primary_key=True)
    country_name = models.TextField()
    call_prefix = models.TextField()
    sort_order = models.SmallIntegerField()
    mmatch_id = models.BigIntegerField()
    region = models.CharField(max_length=32, blank=True, null=True)

    class Meta:
        """Model meta information."""

        db_table = 'list_country'
        managed = False


class CompanySocialProfileFromdb2(models.Model):
    """CompanySocialProfileFromdb2 model."""

    url = models.CharField(max_length=200, blank=True, null=True)
    social_id = models.CharField(
        unique=True,
        max_length=64,
        blank=True,
        null=True
    )
    search_result = models.TextField(blank=True, null=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    website = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    email = models.CharField(max_length=254, blank=True, null=True)
    logo = models.CharField(max_length=200, blank=True, null=True)
    industry = models.CharField(max_length=200, blank=True, null=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    country = models.CharField(max_length=200, blank=True, null=True)
    telephone = models.CharField(max_length=200, blank=True, null=True)
    type = models.CharField(max_length=200, blank=True, null=True)
    founded = models.CharField(max_length=200, blank=True, null=True)
    size = models.CharField(max_length=200, blank=True, null=True)
    specialties = models.TextField(blank=True, null=True)
    company = models.ForeignKey(
        CompanyFromdb2,
        models.DO_NOTHING,
        blank=True,
        null=True
    )
    extension_data = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=254, blank=True, null=True)
    created_date = models.DateTimeField()
    modified_date = models.DateTimeField()

    class Meta:
        """Model meta information."""

        db_table = 'explorer_companysocialprofile'
        managed = False


class ContactEmailFromdb2(models.Model):
    """ContactEmailFromdb2 model."""

    email = models.CharField(max_length=254)
    status = models.IntegerField(blank=True, null=True)
    status_reason = models.CharField(max_length=50, blank=True, null=True)
    created_on = models.DateTimeField()
    validated_by = models.IntegerField(blank=True, null=True)
    pattern_id = models.IntegerField(blank=True, null=True)
    validated_by_admin_id = models.IntegerField(blank=True, null=True)

    class Meta:
        """Model meta information."""

        db_table = 'explorer_prospectemail'
        managed = False


class ContactSocialProfileFromdb2(models.Model):
    """ContactSocialProfileFromdb2 model."""

    url = models.CharField(max_length=200, blank=True, null=True)
    social_id = models.CharField(
        unique=True,
        max_length=64,
        blank=True,
        null=True
    )
    search_result = models.TextField(blank=True, null=True)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    headline = models.CharField(max_length=254, blank=True, null=True)
    location = models.CharField(max_length=200, blank=True, null=True)
    industry = models.CharField(max_length=200, blank=True, null=True)
    picture = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        """Model meta information."""

        db_table = 'explorer_prospectsocialprofile'
        managed = False


class ContactFromdb2(models.Model):
    """ContactFromdb2 model."""

    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    position_id = models.CharField(max_length=32, blank=True, null=True)
    job_title = models.CharField(max_length=200, blank=True, null=True)
    telephone = models.CharField(max_length=200, blank=True, null=True)
    faxnumber = models.CharField(max_length=200, blank=True, null=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    created_on = models.DateTimeField()
    updated_on = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField()
    company = models.ForeignKey(
        CompanyFromdb2,
        models.DO_NOTHING,
        blank=True,
        null=True
    )
    email = models.ForeignKey(
        ContactEmailFromdb2,
        models.DO_NOTHING,
        blank=True,
        null=True
    )
    social_profile = models.ForeignKey(
        ContactSocialProfileFromdb2,
        models.DO_NOTHING,
        blank=True,
        null=True
    )
    email_domain_override_id = models.IntegerField(blank=True, null=True)
    pattern_override_id = models.IntegerField(blank=True, null=True)
    has_new_email = models.BooleanField()
    email_domain_override_created_by_admin_id = models.IntegerField(
        blank=True,
        null=True
    )
    pattern_override_created_by_admin_id = models.IntegerField(
        blank=True,
        null=True
    )

    class Meta:
        """Model meta information."""

        db_table = 'explorer_prospect'
        unique_together = (('first_name', 'last_name', 'company'),)
        managed = False


class CompanyEmailFromdb2(models.Model):
    """CompanyEmailFromdb2 model."""

    email = models.CharField(max_length=254)
    status = models.IntegerField(blank=True, null=True)
    status_reason = models.CharField(max_length=50, blank=True, null=True)
    created_on = models.DateTimeField()
    company = models.ForeignKey(CompanyFromdb2, models.DO_NOTHING)
    pattern_id = models.IntegerField(blank=True, null=True)

    class Meta:
        """Model meta information."""

        managed = False
        db_table = 'explorer_companyemail'


class EmailDomainPatternFromdb2(models.Model):
    """EmailDomainPatternFromdb2 model."""

    source_url = models.CharField(max_length=500, blank=True, null=True)
    created_on = models.DateTimeField()
    email = models.ForeignKey(CompanyEmailFromdb2, models.DO_NOTHING)
    email_domain_id = models.IntegerField()
    email_pattern_id = models.IntegerField()
    source = models.IntegerField()
    created_by_admin_id = models.IntegerField(blank=True, null=True)
    person = models.ForeignKey(
        ContactFromdb2,
        models.DO_NOTHING,
        blank=True,
        null=True
    )

    class Meta:
        """Model meta information."""

        managed = False
        db_table = 'explorer_emaildomainpattern'


class ContactFromdb1(models.Model):
    """ContactFromdb1 model."""

    contact_id = models.BigAutoField(primary_key=True)
    company = models.ForeignKey(CompanyFromdb1, models.DO_NOTHING)
    gender = models.TextField(blank=True, null=True)
    firstname = models.TextField(blank=True, null=True)
    lastname = models.TextField(blank=True, null=True)
    contact_email = models.TextField(blank=True, null=True)
    contact_email_status = models.TextField(blank=True, null=True)
    contact_social = models.TextField(blank=True, null=True)
    contact_phone = models.TextField(blank=True, null=True)
    contact_mobile = models.TextField(blank=True, null=True)
    department = models.TextField(blank=True, null=True)
    position = models.TextField(blank=True, null=True)
    contact_origin = models.TextField(blank=True, null=True)
    contact_origin_date = models.TextField(blank=True, null=True)
    contact_remarks = models.TextField(blank=True, null=True)
    contact_specific3 = models.TextField(blank=True, null=True)
    contact_specific4 = models.TextField(blank=True, null=True)
    contact_specific5 = models.TextField(blank=True, null=True)
    active = models.SmallIntegerField()
    is_primary = models.SmallIntegerField()
    db2_id = models.BigIntegerField()
    created_by = models.TextField(blank=True, null=True)
    updated_by = models.TextField(blank=True, null=True)
    created_on = models.DateTimeField()
    updated_on = models.DateTimeField()
    updated_ip = models.TextField(blank=True, null=True)
    unique_key = models.TextField(blank=True, null=True)
    mmatch_id = models.BigIntegerField()
    last_import = models.TextField(blank=True, null=True)

    class Meta:
        """Model meta information."""

        db_table = 'contact'
        managed = False

# -------------------------------------------------------------------------

# for mechanical_turk only but compelled to put it
# here because of migration constraints


class EmailDomainFromdb2(models.Model):
    """EmailDomainFromdb2 model."""

    domain = models.CharField(max_length=200)
    is_catchall = models.NullBooleanField()
    status = models.CharField(max_length=100, blank=True, null=True)
    status_code = models.CharField(max_length=100, blank=True, null=True)
    active = models.NullBooleanField()
    company = models.ForeignKey(CompanyFromdb2, models.DO_NOTHING)

    class Meta:
        """Model meta information."""

        managed = False
        db_table = 'explorer_emaildomain'


class SenderEmail(models.Model):
    """sender_email table."""

    email = models.CharField(max_length=254)

    class Meta:
        """Meta."""

        db_table = 'sender_email'


class EmailCheckedByUs(models.Model):
    """
    email_checked_by_us table.

    set db_constraint=False in order to prevent Django from creating
    a fk seq table. Thus I can remove ContactFromdb2 easily without
    integrity warning.
    """

    contact_from_db2 = models.ForeignKey(
        ContactFromdb2,
        db_constraint=False
    )
    email = models.CharField(max_length=254)
    updated_on = models.DateTimeField()
    is_rejected = models.BooleanField()
    sender_email = models.ForeignKey(SenderEmail)

    class Meta:
        """Meta."""

        db_table = 'email_checked_by_us'


class EmailCheckedByUsHistory(models.Model):
    """email_checked_by_us_history table."""

    email_checked_by_us = models.ForeignKey(EmailCheckedByUs)
    updated_on = models.DateTimeField()
    is_rejected = models.BooleanField()
    sender_email = models.ForeignKey(SenderEmail)

    class Meta:
        """Meta."""

        db_table = 'email_checked_by_us_history'
