# Api (PHP)

## Installation

Add to your composer.json:
```json
{
    "require": {
        "api/api-client": "*"
    }
}
```

And do:
```sh
composer install
```

## Usage

### Get company

```php
<?php
require 'vendor/autoload.php';

use Api\Api;

$client = new \Api\Api('your_token');

try {
  $company = $client->getCompany('example.com');
  print_r($company);
} catch (Exception $err) {
  print_r($err);
}

?>
```

### Get contact

```php
<?php
require 'vendor/autoload.php';

use Api\Api;

$client = new \Api\Api('your_token');

try {
  $company = $client->getContact('example@example.com');
  print_r($company);
} catch (Exception $err) {
  print_r($err);
}

?>
```

### Error handling

```php
<?php
require 'vendor/autoload.php';

use Api\Api;
use Api\Exceptions;

$client = new \Api\Api('your_token');

try {
  $company = $client->getContact('example@example.com');
  print_r($company);
} catch (\Api\Exceptions\UnauthorizedException $e) {
  print_r('UnauthorizedException');
}

?>
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
