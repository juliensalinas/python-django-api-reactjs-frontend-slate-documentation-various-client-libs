# Errors

The API implements 2 kinds of error codes:

* Generic HTTP response/error codes in every server response
* Custom JSON error codes giving more details about the HTTP error code. Those custom error codes depend on the endpoint.

Errors can be handled easily thanks to the api-client library in Python, Ruby, PHP, and Javascript.

## Generic Errors

Here are the HTTP response/error codes implemented by the API:

Code | Description
---------- | -------
200 | Ok -- The request was successful
400 | Bad Request -- The request is malformed
401 | Unauthorized -- Your API key is wrong
402 | Payment Required -- You should upgrade your account
404 | Not Found -- The specified endpoint could not be found
405 | Method Not Allowed -- You tried to access an endpoint with an invalid method
406 | Not Acceptable -- You requested a format that isn't json
429 | Too Many Requests -- You made too many requests on the API in a short period of time (see Rate Limiting)
50X | Internal Server Error -- We had a problem with our server, this is not your fault. An administrator is informed.

## Detailed Errors

> The JSON encoded error response looks like this for example:

```json
{
  "error_code": "3",
  "detail": "Please send parameters through GET method"
}
```

Code | Description
---------- | -------
1 | Please send API version in the HTTP Accept headers. Please make sure you pass the API version in the `Accept` HTTP headers (see Versioning). Example: application/vnd.api+json; version=v1
2 | No result matching your request. We could not find any result.
3 | Please send parameters through GET method. Make sure you did not mistype the parameter, and make sure you are using a the GET HTTP method.
4 | The API version is invalid. Please make sure you pass a correct API version. Current version is **1**.
5 | API quota exceeded. You should upgrade your account in order to get more requests.

## api-client Errors

```shell
# No api-client library used
```

```http
# No api-client library used
```

```python
from api_client import Client
from api_client import exceptions

client = Client('{your_token}')

try:
  response = client.get_company('{your_parameter}')
except exceptions.UnauthorizedException:
  # handle exception here
```

```ruby
require 'api-client'

client = Api::Client.new('{your_token}')

begin
  response = client.get_company('{your_parameter}')
rescue Api::UnauthorizedException
  # handle exception here
end
```

```php
<?php
require 'vendor/autoload.php';

use Api\Api;
use Api\Exceptions;

$client = new \Api\Api('{your_token}');

try {
  $company = $client->getContact('{your_parameter}');
} catch (\Api\Exceptions\UnauthorizedException $e) {
  # handle exception here
}
?>
```

```javascript--ES5
var Api = require('api-client').default

var client = new Api('{your_token}');

client.getCompany('{your_parameter}')
.then(function(company) {
  console.log(company);
})
.catch(function(err) {
  switch (err.name) {
    case 'UnauthorizedError':
      // handle exception here
    default:
      console.log('Error : ', err);
  }
});
```

```javascript--ES6
import Api from 'api-client';

var client = new Api('{your_token}');

client.getCompany('{your_parameter}')
.then((company) => {
  console.log(company);
})
.catch((err) => {
  switch (err.name) {
    case 'UnauthorizedError':
      // handle exception here
    default:
      console.log('Error : ', err);
  }
});
```

See the example on the right showing how to handle the UnauthorizedException exception.

Code | Description
---------- | -------
BadParametersException | send parameters through GET method
BadRequestException | request is malformed
InternalServerException |
InvalidVersionException | API version is invalid
MethodNotAllowedException | you tried to access an endpoint with an invalid method
NoResultException | no result matching your request
NotAcceptableException | you requested a format that is not json
NotFoundException | specified endpoint could not be found
TooManyRequestsException | you made too many requests on the API in a short period of time
UnauthorizedException | API key is wrong
VersionRequiredException | send API version in the HTTP Accept headers