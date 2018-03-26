
from .exceptions import *

ERRORS_BY_STATUS = {
  '400' : BadRequestException,
  '401' : UnauthorizedException,
  '404' : NotFoundException,
  '405' : MethodNotAllowedException,
  '406' : NotAcceptableException,
  '429' : TooManyRequestsException
}

ERRORS_BY_ERROR_CODE = {
  '1' : VersionRequiredException,
  '2' : NoResultException,
  '3' : BadParametersException,
  '4' : InvalidVersionException
}

def exception_for_response(status, error_code):
  fast_track_error = None

  if error_code != None:
    fast_track_error = ERRORS_BY_ERROR_CODE.get(error_code, None)

  if fast_track_error == None and status != None:
    fast_track_error = ERRORS_BY_STATUS.get(str(status), None)

    if status >= 500 and status < 600:
      fast_track_error = InternalServerException

  if fast_track_error == None:
    fast_track_error = Exception

  return fast_track_error
