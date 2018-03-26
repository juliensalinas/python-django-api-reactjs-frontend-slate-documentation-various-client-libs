# -*- coding: utf-8 -*-

"""Admin for api_core."""

from django.contrib import admin

from api_core.models import ApiAccessLog
from api_core.models import (
    Customer,
    CustomerAction,
    CustomerActivity
)

from billing.models import Plan

# ---------------------------------------


class ApiAccessLogAdmin(admin.ModelAdmin):
    """Admin for ApiAccessLog model."""

    list_display = (
        'endpoint',
        'user_input',
        'http_response_code',
        'custom_error_code',
        'date',
    )
    list_filter = (
        'endpoint',
        'http_response_code',
        'custom_error_code',
        'date',
    )
    search_fields = (
        'endpoint',
        'http_response_code',
        'custom_error_code',
        'date',
        'user__email',
        'user__username',
        'user__first_name',
        'user__last_name',
    )
    ordering = ('date',)
    filter_horizontal = ()


class CustomerAdmin(admin.ModelAdmin):
    """Admin for Customer model."""

    list_display = (
        'user',
        'plan',
        'stripe_id',
        'current_period_end_date',
        'spare_requests',
    )
    list_filter = (
        'user',
        'plan',
        'stripe_id',
        'current_period_end_date',
        'spare_requests',
    )
    search_fields = (
        'user',
        'plan',
        'stripe_id',
        'current_period_end_date',
        'spare_requests',
    )
    filter_horizontal = ()


class CustomerActionAdmin(admin.ModelAdmin):
    """Admin for CustomerAction model."""

    list_display = (
        'name',
        'description',
    )
    list_filter = (
        'name',
        'description',
    )
    search_fields = (
        'name',
        'description',
    )
    filter_horizontal = ()


class CustomerActivityAdmin(admin.ModelAdmin):
    """Admin for CustomerActivity model."""

    list_display = (
        'customer',
        'customer_action',
        'date',
    )
    list_filter = (
        'customer',
        'customer_action',
        'date',
    )
    search_fields = (
        'customer',
        'customer_action',
        'date',
    )
    filter_horizontal = ()


class PlanAdmin(admin.ModelAdmin):
    """Admin for Plan model."""

    list_display = (
        'name',
        'euro_price',
        'monthly_requests',
        'active',
    )
    list_filter = (
        'name',
        'euro_price',
        'monthly_requests',
        'active',
    )
    search_fields = (
        'name',
        'euro_price',
        'monthly_requests',
        'active',
    )
    ordering = ('euro_price',)
    filter_horizontal = ()


admin.site.register(ApiAccessLog, ApiAccessLogAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Plan, PlanAdmin)
admin.site.register(CustomerAction, CustomerActionAdmin)
admin.site.register(CustomerActivity, CustomerActivityAdmin)
admin.site.site_title = 'API'
admin.site.site_header = 'API'
