# -*- coding: utf-8 -*-

"""Models."""

# -------------------------------------------

from django.db import models

# --------------------------------------------


class ClearbitCompany(models.Model):
    """Company gathered from Clearbit."""

    id = models.UUIDField(primary_key=True)
    domain = models.URLField(blank=True, null=True)
    name = models.CharField(max_length=50, blank=True, null=True)
    legal_name = models.CharField(max_length=100, blank=True, null=True)
    site_title = models.CharField(max_length=500, blank=True, null=True)
    category_sector = models.CharField(max_length=100, blank=True, null=True)
    category_industry_group = models.CharField(max_length=100, blank=True, null=True)  # noqa
    category_industry = models.CharField(max_length=100, blank=True, null=True)  # noqa
    category_sub_industry = models.CharField(max_length=100, blank=True, null=True)  # noqa
    description = models.TextField(blank=True, null=True)
    founded_year = models.IntegerField(blank=True, null=True)
    location = models.CharField(max_length=500, blank=True, null=True)
    time_zone = models.CharField(max_length=50, blank=True, null=True)
    utc_offset = models.IntegerField(blank=True, null=True)
    geo_street_number = models.CharField(max_length=6, blank=True, null=True)
    geo_street_name = models.CharField(max_length=20, blank=True, null=True)
    geo_sub_premise = models.CharField(max_length=6, blank=True, null=True)
    geo_city = models.CharField(max_length=50, blank=True, null=True)
    geo_state = models.CharField(max_length=50, blank=True, null=True)
    geo_state_code = models.CharField(max_length=50, blank=True, null=True)
    geo_postal_code = models.CharField(max_length=10, blank=True, null=True)
    geo_country = models.CharField(max_length=50, blank=True, null=True)
    geo_country_code = models.CharField(max_length=2, blank=True, null=True)
    geo_lat = models.FloatField(blank=True, null=True)
    geo_lng = models.FloatField(blank=True, null=True)
    metrics_raised = models.BigIntegerField(blank=True, null=True)
    metrics_alexa_us_rank = models.BigIntegerField(blank=True, null=True)
    metrics_alexa_global_rank = models.BigIntegerField(blank=True, null=True)
    metrics_employees = models.BigIntegerField(blank=True, null=True)
    metrics_employees_range = models.CharField(max_length=10, blank=True, null=True)  # noqa
    metrics_market_cap = models.BigIntegerField(blank=True, null=True)
    metrics_annual_revenue = models.BigIntegerField(blank=True, null=True)
    facebook_handle = models.CharField(max_length=100, blank=True, null=True)
    linkedin_handle = models.CharField(max_length=100, blank=True, null=True)
    twitter_handle = models.CharField(max_length=100, blank=True, null=True)
    twitter_id = models.BigIntegerField(blank=True, null=True)
    twitter_bio = models.TextField(blank=True, null=True)
    twitter_followers = models.BigIntegerField(blank=True, null=True)
    twitter_following = models.BigIntegerField(blank=True, null=True)
    twitter_location = models.CharField(max_length=100, blank=True, null=True)
    twitter_site = models.URLField(blank=True, null=True)
    twitter_avatar = models.URLField(blank=True, null=True)
    crunchbase_handle = models.CharField(max_length=100, blank=True, null=True)  # noqa
    logo = models.URLField(blank=True, null=True)
    email_provider = models.NullBooleanField()
    type = models.CharField(max_length=30, blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    indexed_at = models.DateTimeField(blank=True, null=True)

    clearbit_dl_datetime = models.DateTimeField()


class ClearbitPerson(models.Model):
    """Person (contact) gathered from Clearbit."""

    clearbit_company = models.ForeignKey(
        ClearbitCompany,
        blank=True,
        null=True
    )

    id = models.UUIDField(primary_key=True)
    email = models.EmailField()
    name_given_name = models.CharField(max_length=50, blank=True, null=True)
    name_family_name = models.CharField(max_length=50, blank=True, null=True)
    name_full_name = models.CharField(max_length=100, blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    time_zone = models.CharField(max_length=50, blank=True, null=True)
    utc_offset = models.IntegerField(blank=True, null=True)
    geo_city = models.CharField(max_length=50, blank=True, null=True)
    geo_state = models.CharField(max_length=50, blank=True, null=True)
    geo_state_code = models.CharField(max_length=50, blank=True, null=True)
    geo_country = models.CharField(max_length=50, blank=True, null=True)
    geo_country_code = models.CharField(max_length=50, blank=True, null=True)
    geo_lat = models.FloatField(blank=True, null=True)
    geo_lng = models.FloatField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    site = models.URLField(blank=True, null=True)
    avatar = models.URLField(blank=True, null=True)
    employment_name = models.CharField(max_length=50, blank=True, null=True)
    employment_title = models.CharField(max_length=50, blank=True, null=True)
    employment_role = models.CharField(max_length=50, blank=True, null=True)
    employment_seniority = models.CharField(max_length=20, blank=True, null=True)  # noqa
    employment_domain = models.URLField(blank=True, null=True)
    facebook_handle = models.CharField(max_length=100, blank=True, null=True)
    github_handle = models.CharField(max_length=100, blank=True, null=True)
    github_id = models.BigIntegerField(blank=True, null=True)
    github_avatar = models.URLField(blank=True, null=True)
    github_company = models.CharField(max_length=50, blank=True, null=True)
    github_blog = models.URLField(blank=True, null=True)
    github_followers = models.BigIntegerField(blank=True, null=True)
    github_following = models.BigIntegerField(blank=True, null=True)
    twitter_handle = models.CharField(max_length=100, blank=True, null=True)
    twitter_id = models.BigIntegerField(blank=True, null=True)
    twitter_followers = models.BigIntegerField(blank=True, null=True)
    twitter_following = models.BigIntegerField(blank=True, null=True)
    twitter_location = models.CharField(max_length=100, blank=True, null=True)
    twitter_site = models.URLField(blank=True, null=True)
    twitter_statuses = models.BigIntegerField(blank=True, null=True)
    twitter_favorites = models.BigIntegerField(blank=True, null=True)
    twitter_avatar = models.URLField(blank=True, null=True)
    linkedin_handle = models.CharField(max_length=100, blank=True, null=True)
    googleplus_handle = models.CharField(max_length=100, blank=True, null=True)  # noqa
    aboutme_handle = models.CharField(max_length=100, blank=True, null=True)
    aboutme_bio = models.TextField(blank=True, null=True)
    aboutme_avatar = models.URLField(blank=True, null=True)
    gravatar_handle = models.CharField(max_length=100, blank=True, null=True)
    gravatar_avatar = models.URLField(blank=True, null=True)
    fuzzy = models.NullBooleanField()
    email_provider = models.NullBooleanField()
    indexed_at = models.DateTimeField(blank=True, null=True)

    clearbit_dl_datetime = models.DateTimeField()


class ClearbitCompanyDomainAlias(models.Model):
    """Company domain aliases."""

    clearbit_company = models.ForeignKey(ClearbitCompany)
    domain = models.URLField()

    clearbit_dl_datetime = models.DateTimeField()


class ClearbitCompanySitePhoneNumber(models.Model):
    """Company site phone numbers."""

    clearbit_company = models.ForeignKey(ClearbitCompany)
    phone = models.CharField(max_length=20)

    clearbit_dl_datetime = models.DateTimeField()


class ClearbitCompanySiteEmailAddress(models.Model):
    """Company site phone numbers."""

    clearbit_company = models.ForeignKey(ClearbitCompany)
    email = models.EmailField()

    clearbit_dl_datetime = models.DateTimeField()


class ClearbitCompanyTag(models.Model):
    """Company tags."""

    clearbit_company = models.ForeignKey(ClearbitCompany)
    tag = models.CharField(max_length=50)

    clearbit_dl_datetime = models.DateTimeField()


class ClearbitCompanyTech(models.Model):
    """Company techs."""

    clearbit_company = models.ForeignKey(ClearbitCompany)
    tech = models.CharField(max_length=50)

    clearbit_dl_datetime = models.DateTimeField()


class ClearbitPersonGravatarUrl(models.Model):
    """Person Gravatar urls."""

    clearbit_person = models.ForeignKey(ClearbitPerson)
    value = models.URLField()
    title = models.CharField(max_length=100)

    clearbit_dl_datetime = models.DateTimeField()


class ClearbitPersonGravatarAvatar(models.Model):
    """Person Gravatar avatars."""

    clearbit_person = models.ForeignKey(ClearbitPerson)
    url = models.URLField()
    type = models.CharField(max_length=20)

    clearbit_dl_datetime = models.DateTimeField()
