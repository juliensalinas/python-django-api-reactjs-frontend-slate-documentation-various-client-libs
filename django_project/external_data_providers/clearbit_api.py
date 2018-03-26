# -*- coding: utf-8 -*-

"""
Look for contact or company in the Clearbit API.

todo: handle data history
"""

# import logging
import clearbit
import datetime

from django.db import IntegrityError

from .models import (
    ClearbitPerson,
    ClearbitCompany,
    ClearbitCompanyDomainAlias,
    ClearbitCompanySitePhoneNumber,
    ClearbitCompanySiteEmailAddress,
    ClearbitCompanyTag,
    ClearbitCompanyTech,
    ClearbitPersonGravatarUrl,
    ClearbitPersonGravatarAvatar
)

# ---------------------------------------------------

# logging.basicConfig(
#     level=logging.DEBUG,
#     filename='/debug.log',
#     format='%(asctime)s %(levelname)s: %(message)s',
#     datefmt='%Y-%m-%d %H:%M:%S'
# )
clearbit.key = ''

# ---------------------------------------------------


def save_person(p, clearbit_company=None):
    """Save person in db."""
    p = dict(p.items())

    clearbit_person = ClearbitPerson(
        clearbit_company=clearbit_company,

        id=p.get('id'),
        name_given_name=p.get('name', {}).get('givenName'),
        name_family_name=p.get('name', {}).get('familyName'),
        name_full_name=p.get('name', {}).get('fullName'),
        gender=p.get('gender'),
        location=p.get('location'),
        time_zone=p.get('timeZone'),
        utc_offset=p.get('utcOffset'),
        geo_city=p.get('geo', {}).get('city'),
        geo_state=p.get('geo', {}).get('state'),
        geo_state_code=p.get('geo', {}).get('stateCode'),
        geo_country=p.get('geo', {}).get('country'),
        geo_country_code=p.get('geo', {}).get('countryCode'),
        geo_lat=p.get('geo', {}).get('lat'),
        geo_lng=p.get('geo', {}).get('lng'),
        bio=p.get('bio'),
        site=p.get('site'),
        avatar=p.get('avatar'),
        employment_name=p.get('employment', {}).get('name'),
        employment_title=p.get('employment', {}).get('title'),
        employment_role=p.get('employment', {}).get('role'),
        employment_seniority=p.get('employment', {}).get('seniority'),
        employment_domain=p.get('employment', {}).get('domain'),
        facebook_handle=p.get('facebook', {}).get('handle'),
        github_handle=p.get('github', {}).get('handle'),
        github_id=p.get('github', {}).get('id'),
        github_avatar=p.get('github', {}).get('avatar'),
        github_company=p.get('github', {}).get('company'),
        github_blog=p.get('github', {}).get('blog'),
        github_followers=p.get('github', {}).get('followers'),
        github_following=p.get('github', {}).get('following'),
        twitter_handle=p.get('twitter', {}).get('handle'),
        twitter_id=p.get('twitter', {}).get('id'),
        twitter_followers=p.get('twitter', {}).get('followers'),
        twitter_following=p.get('twitter', {}).get('following'),
        twitter_location=p.get('twitter', {}).get('location'),
        twitter_site=p.get('twitter', {}).get('site'),
        twitter_statuses=p.get('twitter', {}).get('statuses'),
        twitter_favorites=p.get('twitter', {}).get('favorites'),
        twitter_avatar=p.get('twitter', {}).get('avatar'),
        linkedin_handle=p.get('linkedin', {}).get('handle'),
        googleplus_handle=p.get('googleplus', {}).get('handle'),
        aboutme_handle=p.get('aboutme', {}).get('handle'),
        aboutme_bio=p.get('aboutme', {}).get('bio'),
        aboutme_avatar=p.get('aboutme', {}).get('avatar'),
        gravatar_handle=p.get('gravatar', {}).get('handle'),
        gravatar_avatar=p.get('gravatar', {}).get('avatar'),
        fuzzy=p.get('fuzzy'),
        email_provider=p.get('emailProvider'),
        indexed_at=p.get('indexedAt'),

        clearbit_dl_datetime=datetime.datetime.now(),
    )

    try:
        clearbit_person.save()
        person_is_new = True
    except IntegrityError:
        # should not be the case since we already checked in api_core
        # if person exists
        clearbit_person = ClearbitPerson.objects.get(id=p.get('id'))
        person_is_new = False

    if person_is_new:
        if p.get('gravatar', {}).get('urls'):
            for url in p.get('gravatar', {}).get('urls'):
                ClearbitPersonGravatarUrl(
                    clearbit_person=clearbit_person,
                    value=url.get('value'),
                    title=url.get('title'),
                    clearbit_dl_datetime=datetime.datetime.now()
                ).save()
        if p.get('gravatar', {}).get('avatars'):
            for avatar in p.get('gravatar', {}).get('avatars'):
                ClearbitPersonGravatarAvatar(
                    clearbit_person=clearbit_person,
                    url=avatar.get('url'),
                    type=avatar.get('type'),
                    clearbit_dl_datetime=datetime.datetime.now()
                ).save()
    return clearbit_person


def save_company(c):
    """Save company in db."""
    # c is a clearbit object. We first turn it into a dict
    # otherwise the .get method does not work.
    c = dict(c.items())

    clearbit_company = ClearbitCompany(
        id=c.get('id'),
        name=c.get('name'),
        legal_name=c.get('legalName'),
        domain=c.get('domain'),
        site_title=c.get('site', {}).get('title'),
        category_sector=c.get('category', {}).get('sector'),
        category_industry_group=c.get('category', {}).get('industryGroup'),
        category_industry=c.get('category', {}).get('industry'),
        category_sub_industry=c.get('category', {}).get('subIndustry'),
        description=c.get('description'),
        founded_year=c.get('foundedYear'),
        location=c.get('location'),
        time_zone=c.get('timeZone'),
        utc_offset=c.get('utcOffset'),
        geo_street_number=c.get('geo', {}).get('streetNumber'),
        geo_street_name=c.get('geo', {}).get('streetName'),
        geo_sub_premise=c.get('geo', {}).get('subPremise'),
        geo_city=c.get('geo', {}).get('city'),
        geo_state=c.get('geo', {}).get('state'),
        geo_state_code=c.get('geo', {}).get('stateCode'),
        geo_postal_code=c.get('geo', {}).get('postalCode'),
        geo_country=c.get('geo', {}).get('country'),
        geo_country_code=c.get('geo', {}).get('countryCode'),
        geo_lat=c.get('geo', {}).get('lat'),
        geo_lng=c.get('geo', {}).get('lng'),
        metrics_raised=c.get('metrics', {}).get('raised'),
        metrics_alexa_us_rank=c.get('metrics', {}).get('alexaUsRank'),
        metrics_alexa_global_rank=c.get('metrics', {}).get('alexaGlobalRank'),
        metrics_employees=c.get('metrics', {}).get('employees'),
        metrics_employees_range=c.get('metrics', {}).get('employeesRange'),
        metrics_annual_revenue=c.get('metrics', {}).get('annualRevenue'),
        facebook_handle=c.get('facebook', {}).get('handle'),
        linkedin_handle=c.get('linkedin', {}).get('handle'),
        twitter_handle=c.get('twitter', {}).get('handle'),
        twitter_id=c.get('twitter', {}).get('id'),
        twitter_bio=c.get('twitter', {}).get('bio'),
        twitter_followers=c.get('twitter', {}).get('followers'),
        twitter_following=c.get('twitter', {}).get('following'),
        twitter_location=c.get('twitter', {}).get('location'),
        twitter_site=c.get('twitter', {}).get('site'),
        twitter_avatar=c.get('twitter', {}).get('avatar'),
        crunchbase_handle=c.get('crunchbase', {}).get('handle'),
        logo=c.get('logo'),
        email_provider=c.get('emailProvider'),
        type=c.get('type'),
        phone=c.get('phone'),
        indexed_at=c.get('indexedAt'),

        clearbit_dl_datetime=datetime.datetime.now(),
    )

    try:
        clearbit_company.save()
        company_is_new = True
    except IntegrityError:
        # we will need the clearbit_company in order to connect
        # the person to the company
        clearbit_company = ClearbitCompany.objects.get(id=c.get('id'))
        company_is_new = False

    if company_is_new:
        if c.get('domainAliases'):
            for domain in c.get('domainAliases'):
                ClearbitCompanyDomainAlias(
                    clearbit_company=clearbit_company,
                    domain=domain,
                    clearbit_dl_datetime=datetime.datetime.now()
                ).save()
        if c.get('site', {}).get('phoneNumbers'):
            for phone in c.get('site', {}).get('phoneNumbers'):
                ClearbitCompanySitePhoneNumber(
                    clearbit_company=clearbit_company,
                    phone=phone,
                    clearbit_dl_datetime=datetime.datetime.now()
                ).save()
        if c.get('site', {}).get('emailAddresses'):
            for email in c.get('site', {}).get('emailAddresses'):
                ClearbitCompanySiteEmailAddress(
                    clearbit_company=clearbit_company,
                    email=email,
                    clearbit_dl_datetime=datetime.datetime.now()
                ).save()
        if c.get('tags'):
            for tag in c.get('tags'):
                ClearbitCompanyTag(
                    clearbit_company=clearbit_company,
                    tag=tag,
                    clearbit_dl_datetime=datetime.datetime.now()
                ).save()
        if c.get('tech'):
            for tech in c.get('tech'):
                ClearbitCompanyTech(
                    clearbit_company=clearbit_company,
                    tech=tech,
                    clearbit_dl_datetime=datetime.datetime.now()
                ).save()
    return clearbit_company


def get_person_and_company(email):
    """
    Retrieve person + company from Clearbit API based on en email.

    Using the 'combined' API:
    https://clearbit.com/docs#enrichment-api-combined-api

    response may:
    1) be equal to None. In this case response['company'] would raise TypeError
    2) have a person and company is None
    3) have a company and person is None (according to the docs but I don't
    know how it could happen since we're looking for a person here)
    """
    response = clearbit.Enrichment.find(email=email, stream=True)
    if response:
        # response['company'] and response['person'] should always exist
        # according to Clearbit docs but they can be None
        c = response['company']
        p = response['person']
        if c and not p:
            clearbit_company = save_company(c)
            return False
        if p and c:
            clearbit_company = save_company(c)
            clearbit_person = save_person(p, clearbit_company)
            return clearbit_person
        if p and not c:
            clearbit_person = save_person(p)
            return clearbit_person
    else:
        return False


def get_company(domain):
    """Retrieve company from Clearbit API based on a domain.

    Using the 'company' API:
    https://clearbit.com/docs#enrichment-api-company-api
    """
    c = clearbit.Company.find(domain=domain)

    if c is not None and 'pending' not in c:
        clearbit_company = save_company(c)
        return clearbit_company
    else:
        return False
