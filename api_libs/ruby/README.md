# api-client

## Installation

Add to your Gemfile:
```json
gem 'api-client'
```

And do:
```sh
bundle install
```

## Usage

### Get company

```ruby
require 'api-client'

client = MyApp::Client.new('your_token')

begin
  company = client.get_company('example.com')
  puts company
rescue Exception => e
  puts e
end
```

### Get contact

```ruby
require 'api-client'

client = MyApp::Client.new('your_token')

begin
  company = client.get_contact('example@example.com')
  puts company
rescue Exception => e
  puts e
end
```

### Error handling

```ruby
require 'api-client'

client = MyApp::Client.new('your_token')

begin
  response = client.get_company('example.com')
  puts response
rescue MyApp::UnauthorizedException
  puts 'UnauthorizedException'
end
```


### Available exceptions

- BadParametersException: send parameters through GET method
- BadRequestException: request is malformed
- InternalServerException
- InvalidVersionException: API version is invalid
- MethodNotAllowedException: you tried to access an endpoint with an invalid method
- NoResultException: no result matching your request
- NotAcceptableException: you requested a format that is not json
- NotFoundException: specified endpoint could not be found
- TooManyRequestsException: you made too many requests on the API in a short period of time
- UnauthorizedException: API key is wrong
- VersionRequiredException: send API version in the HTTP Accept headers
