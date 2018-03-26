# -*- coding: utf-8 -*-

"""All billing errors centralized here."""

from django.utils.translation import ugettext_lazy as _

# ------------------------------------------

errors_for_customers = {
    "1": _(u"An error occured. Please try again."),
    "2": _(u"""An error occured during payment.
            Please try again or contact us.
            You have not been charged.""")
}
