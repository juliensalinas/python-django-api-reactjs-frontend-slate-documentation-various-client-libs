
# Bad parameters
class BadParametersException(Exception):
  def __init__(self):
    super(BadParametersException, self).__init__('Send parameters through GET method')

# Bad request
class BadRequestException(Exception):
  def __init__(self):
    super(BadRequestException, self).__init__('Request is malformed')

# Internal server error
class InternalServerException(Exception):
  pass

# Invalid version
class InvalidVersionException(Exception):
  def __init__(self):
    super(InvalidVersionException, self).__init__('API version is invalid')

# Method not allowed
class MethodNotAllowedException(Exception):
  def __init__(self):
    super(MethodNotAllowedException, self).__init__('You tried to access an endpoint with an invalid method')

# No result
class NoResultException(Exception):
  def __init__(self):
    super(NoResultException, self).__init__('No result matching your request')

# Not acceptable
class NotAcceptableException(Exception):
  def __init__(self):
    super(NotAcceptableException, self).__init__('You requested a format that is not json')

# Not found
class NotFoundException(Exception):
  def __init__(self):
    super(NotFoundException, self).__init__('Specified endpoint could not be found')

# Too many requests
class TooManyRequestsException(Exception):
  def __init__(self):
    super(TooManyRequestsException, self).__init__('You made too many requests on the API in a short period of time')

# Unauthorized
class UnauthorizedException(Exception):
  def __init__(self):
    super(UnauthorizedException, self).__init__('API key is wrong')

# Version required
class VersionRequiredException(Exception):
  def __init__(self):
    super(VersionRequiredException, self).__init__('Send API version in the HTTP Accept headers')
