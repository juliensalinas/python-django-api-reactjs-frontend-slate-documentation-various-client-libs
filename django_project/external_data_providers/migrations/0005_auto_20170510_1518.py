# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-05-10 15:18
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('external_data_providers', '0004_auto_20170510_1429'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clearbitcompany',
            name='metrics_alexa_global_rank',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='clearbitcompany',
            name='metrics_alexa_us_rank',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='clearbitcompany',
            name='metrics_annual_revenue',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='clearbitcompany',
            name='metrics_employees',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='clearbitcompany',
            name='metrics_market_cap',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='clearbitcompany',
            name='metrics_raised',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='clearbitcompany',
            name='twitter_followers',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='clearbitcompany',
            name='twitter_following',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='clearbitcompany',
            name='twitter_id',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='clearbitperson',
            name='github_followers',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='clearbitperson',
            name='github_following',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='clearbitperson',
            name='github_id',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='clearbitperson',
            name='twitter_favorites',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='clearbitperson',
            name='twitter_followers',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='clearbitperson',
            name='twitter_following',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='clearbitperson',
            name='twitter_id',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='clearbitperson',
            name='twitter_statuses',
            field=models.BigIntegerField(blank=True, null=True),
        ),
    ]
