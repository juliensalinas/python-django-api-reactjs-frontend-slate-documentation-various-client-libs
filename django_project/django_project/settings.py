# -*- coding: utf-8 -*-

"""Settings."""

import os

# -----------------------------------------------------------------

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = ""

DEBUG = False
SITE_BASE_URL = 'https://api.myapp.com'

ALLOWED_HOSTS = []

# -----------------------------------------------------------------

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.humanize',
    'api_core',
    'react_api_connection',
    'api_docs',
    'external_data_providers',
    'billing',
    'rest_framework',
    'rest_framework.authtoken',
    # 'corsheaders', #temporary
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # 'corsheaders.middleware.CorsMiddleware', #temporary

    # for localization.
    'django.middleware.locale.LocaleMiddleware',

    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'django_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ["/home/django_project/templates/"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# -----------------------------------------------------------------

WSGI_APPLICATION = 'django_project.wsgi.application'

# -----------------------------------------------------------------

# Database
# https://docs.djangoproject.com/en/1.10/ref/settings/#databases

DATABASES = {
    'default': {},
    'db2': {},
    'db1': {},
}

# -----------------------------------------------------------------

# Password validation
# https://docs.djangoproject.com/en/1.10/ref/settings/#auth-password-validators

# Your password can't be too similar to your other personal information.
# Your password must contain at least 8 characters.
# Your password can't be a commonly used password.
# Your password can't be entirely numeric.

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',  # noqa
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',  # noqa
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',  # noqa
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',  # noqa
    },
]

# -----------------------------------------------------------------

# Internationalization
# https://docs.djangoproject.com/en/1.10/topics/i18n/

LANGUAGE_CODE = 'en-us'
USE_I18N = True
USE_L10N = True
LOCALE_PATHS = (os.path.join(BASE_DIR, 'locale'), )
TIME_ZONE = 'UTC'
USE_TZ = True

# -----------------------------------------------------------------

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.10/howto/static-files/

STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'

# -----------------------------------------------------------------

# Avoid sending cookies over http accidentally

CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True

# -----------------------------------------------------------------

# DRF

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAdminUser',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.AcceptHeaderVersioning',  # noqa
    'PAGE_SIZE': 10
}

# -----------------------------------------------------------------

# Email
# May be necessary: https://accounts.google.com/DisplayUnlockCaptcha
# or look for a google email in the mailbox and follow the link to
# unlock 'less secure app'

ADMINS = ()
MANAGERS = ADMINS

EMAIL_HOST = "smtp.gmail.com"
EMAIL_HOST_USER = ""
EMAIL_HOST_PASSWORD = ""
EMAIL_PORT = 587
EMAIL_USE_TLS = True

DEFAULT_FROM_EMAIL = '<service@myapp.com>'

# --------------------------------------------------------------

# temporary

# CORS_ORIGIN_ALLOW_ALL = True
# CSRF_TRUSTED_ORIGINS = (
#   'change.allowed.com',
# )

# --------------------------------------------------------------
