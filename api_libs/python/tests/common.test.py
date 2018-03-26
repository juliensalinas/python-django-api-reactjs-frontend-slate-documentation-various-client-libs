import unittest
from api_client.common import exception_for_response
from api_client.exceptions import *

class TestCommon(unittest.TestCase):

  def test_exception_for_response_exist(self):
    self.assertIsNotNone(exception_for_response)

  def test_exception_for_response_invalid_arguments(self):
    result = exception_for_response(None, None)
    self.assertEqual(result, Exception)

  def test_exception_for_response_unknown_status(self):
    result = exception_for_response(700, None)
    self.assertEqual(result, Exception)

  def test_exception_for_response_unknown_error_code(self):
    result = exception_for_response(404, '150')
    self.assertEqual(result, NotFoundException)

  def test_exception_for_response_errors(self):
    result = exception_for_response(400, None)
    self.assertEqual(result, BadRequestException)

    result = exception_for_response(401, None)
    self.assertEqual(result, UnauthorizedException)

    result = exception_for_response(404, None)
    self.assertEqual(result, NotFoundException)

    result = exception_for_response(405, None)
    self.assertEqual(result, MethodNotAllowedException)

    result = exception_for_response(406, None)
    self.assertEqual(result, NotAcceptableException)

    result = exception_for_response(429, None)
    self.assertEqual(result, TooManyRequestsException)

    result = exception_for_response(404, '1')
    self.assertEqual(result, VersionRequiredException)

    result = exception_for_response(404, '2')
    self.assertEqual(result, NoResultException)

    result = exception_for_response(404, '3')
    self.assertEqual(result, BadParametersException)

    result = exception_for_response(404, '4')
    self.assertEqual(result, InvalidVersionException)

    result = exception_for_response(500, None)
    self.assertEqual(result, InternalServerException)

    result = exception_for_response(550, None)
    self.assertEqual(result, InternalServerException)

if __name__ == '__main__':
  unittest.main()
