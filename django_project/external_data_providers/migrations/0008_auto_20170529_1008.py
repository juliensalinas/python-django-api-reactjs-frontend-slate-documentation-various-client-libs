# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-05-29 10:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('external_data_providers', '0007_auto_20170529_0910'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clearbitcompany',
            name='location',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
