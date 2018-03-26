try:
  from httplib import HTTPSConnection
except ImportError:
  from http.client import HTTPSConnection

try:
  from urllib import urlencode
except ImportError:
  from urllib.parse import urlencode

import json

from .constants import ACCEPT, VERSION, PATHNAME_COMPANY, PATHNAME_CONTACT, URL
from .common import exception_for_response

class Client:
  def __init__(self, token):
    self.token = token

  # Request to the API endpoint
  def get(self, path, params):
    headers = {
      'Authorization' : 'Token ' + self.token,
      'Accept'        : ACCEPT + '; version = ' + str(VERSION)
    }

    params = urlencode(params)

    conn = HTTPSConnection(URL)
    conn.request('GET', path + '?' + params, None, headers)

    response = conn.getresponse()

    data = json.loads(response.read())

    if response.status != 200:
        MyAppException = exception_for_response(response.status, getattr(data, 'error_code', None))

        if (MyAppException != None):
          raise MyAppException()

    return data

  # Retrieve company details with a `domain`
  def get_company(self, domain):
    return self.get(PATHNAME_COMPANY, {
      'domain' : domain
    })

  # Retrieve contact details with an `email`
  def get_contact(self, email):
    return self.get(PATHNAME_CONTACT, {
      'email' : email
    })
