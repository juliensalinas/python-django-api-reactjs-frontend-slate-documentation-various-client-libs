# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-02-24 07:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_core', '0002_auto_20170223_1355'),
    ]

    operations = [
        migrations.RenameField(
            model_name='apiaccesslog',
            old_name='response_code',
            new_name='http_response_code',
        ),
        migrations.AddField(
            model_name='apiaccesslog',
            name='custom_error_code',
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
    ]
