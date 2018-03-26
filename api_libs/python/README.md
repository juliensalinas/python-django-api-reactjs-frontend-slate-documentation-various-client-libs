# api-client

## Installation

Add to your requirements.txt:
```json
api-client
```

And do:
```sh
pip install -r requirements.txt
```

## Usage

### Get company

```python
from api_client import Client

client = Client('your_token')

try:
  response = client.get_company('example.com')
  print(response)
except Exception as e:
  print(e)
```

### Get contact

```python
from api_client import Client

client = Client('your_token')

try:
  response = client.get_contact('example@example.com')
  print(response)
except Exception as e:
  print(e)
```

### Error handling

```python
from api_client import Client, UnauthorizedException

client = Client('your_token')

try:
  response = client.get_company('example.com')
  print(response)
except UnauthorizedException:
  print('UnauthorizedException')
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
