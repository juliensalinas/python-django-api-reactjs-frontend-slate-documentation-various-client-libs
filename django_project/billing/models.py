# -*- coding: utf-8 -*-

"""Models for billing."""

from __future__ import unicode_literals

from django.db import models

# ---------------------------------------------


class Plan(models.Model):
    """Plan model."""

    name = models.CharField(max_length=30)
    euro_price = models.IntegerField()
    monthly_requests = models.IntegerField()
    active = models.BooleanField()

    def __unicode__(self):
        """String representation of model."""
        return "%s: %s€ for %s requests" % (
            self.name,
            self.euro_price,
            self.monthly_requests
        )
