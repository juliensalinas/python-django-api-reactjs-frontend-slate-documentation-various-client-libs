
module MyApp
  # Bad parameters
  class BadParametersException < Exception
    def initialize(message = 'Send parameters through GET method')
      super(message)
    end
  end

  # Bad request
  class  BadRequestException < Exception
    def initialize(message = 'Request is malformed')
      super(message)
    end
  end

  # Internal server error
  class InternalServerException < Exception
    def initialize(message = '')
      super(message)
    end
  end

  # Invalid version
  class InvalidVersionException < Exception
    def initialize(message = 'API version is invalid')
      super(message)
    end
  end

  # Method not allowed
  class MethodNotAllowedException < Exception
    def initialize(message = 'You tried to access an endpoint with an invalid method')
      super(message)
    end
  end

  # No result
  class NoResultException < Exception
    def initialize(message = 'No result matching your request')
      super(message)
    end
  end

  # Not acceptable
  class NotAcceptableException < Exception
    def initialize(message = 'You requested a format that is not json')
      super(message)
    end
  end

  # Not found
  class NotFoundException < Exception
    def initialize(message = 'Specified endpoint could not be found')
      super(message)
    end
  end

  # Too many requests
  class TooManyRequestsException < Exception
    def initialize(message = 'You made too many requests on the API in a short period of time')
      super(message)
    end
  end

  # Unauthorized
  class UnauthorizedException < Exception
    def initialize(message = 'API key is wrong')
      super(message)
    end
  end

  # Version required
  class VersionRequiredException < Exception
    def initialize(message = 'Send API version in the HTTP Accept headers')
      super(message)
    end
  end
end
