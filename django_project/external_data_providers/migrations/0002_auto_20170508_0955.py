# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-05-08 09:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('external_data_providers', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clearbitcompany',
            name='indexed_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='clearbitperson',
            name='indexed_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
