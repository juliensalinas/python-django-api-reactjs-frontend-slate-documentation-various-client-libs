require_relative './exceptions'

ERRORS_BY_STATUS = {
  '400' => MyApp::BadRequestException,
  '401' => MyApp::UnauthorizedException,
  '404' => MyApp::NotFoundException,
  '405' => MyApp::MethodNotAllowedException,
  '406' => MyApp::NotAcceptableException,
  '429' => MyApp::TooManyRequestsException
}

ERRORS_BY_ERROR_CODE = {
  '1' => MyApp::VersionRequiredException,
  '2' => MyApp::NoResultException,
  '3' => MyApp::BadParametersException,
  '4' => MyApp::InvalidVersionException
}

def exception_for_response(status, errorCode)
  fast_track_error = nil

  if errorCode != nil
    fast_track_error = ERRORS_BY_ERROR_CODE[errorCode]
  end

  if fast_track_error == nil && status != nil
    fast_track_error = ERRORS_BY_STATUS[status.to_s]

    if status >= 500 && status < 600
      fast_track_error = MyApp::InternalServerException
    end
  end

  if fast_track_error == nil
    fast_track_error = Exception
  end

  return fast_track_error
end
