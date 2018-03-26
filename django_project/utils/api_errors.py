# -*- coding: utf-8 -*-

"""All API errors centralized here."""

errors_for_dev = {
    "1": "no email supplied",
    "2": "no password supplied",
    "3": "email format is incorrect",
    "4": "password format is incorrect",
    "5": "user already exists",
    "6": "problem during token creation",
    "7": "problem during user rights creation",
    "8": "wrong HTTP method",
    "9": "private link expired",
    "10": "no user found",
    "11": "no secret supplied",
    "12": "no password_confirmation supplied",
    "13": "password and password_confirmation are not equal",
}

errors_for_customers = {
    "1": (
        "Please send API version in the HTTP Accept headers. "
        "Example: application/vnd.api+json; version=v1"
    ),
    "2": "No result matching your request",
    "3": "Please send parameters through GET method",
    "4": "API version is invalid",
    "5": "API quota exceeded. Please upgrade your account !"
}
