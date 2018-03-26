# api-client

## Installation

```sh
npm install --save api-client
```

## Usage

### Get company (ES6)

```javascript
import Api from 'api-client';

var client = new Api('your_token');

client.getCompany('example.com')
.then((company) => {
  console.log(company);
})
.catch((err) => {
  console.error(err);
});
```

### Get company (ES5)

```javascript
var Api = require('api-client').default;

var client = new Api('your_token');

client.getCompany('example.com')
.then(function(company) {
  console.log(company);
})
.catch(function(err) {
  console.error(err);
});
```

### Get contact (ES6)

```javascript
import Api from 'api-client';

var client = new Api('your_token');

client.getContact('example@example.com')
.then((contact) => {
  console.log(contact);
})
.catch((err) => {
  console.error(err);
});
```

### Get contact (ES5)

```javascript
var Api = require('api-client').default;

var client = new Api('your_token');

client.getContact('example@example.com')
.then(function(contact) {
  console.log(contact);
})
.catch(function(err) {
  console.error(err);
});
```

### Error handling (ES6)

```javascript
import Api from 'api-client';

var client = new Api('your_token');

client.getCompany('example.com')
.then((company) => {
  console.log(company);
})
.catch((err) => {
  switch (err.name) {
    case 'NoResultError':
      console.log('NoResultError');
      break;
    default:
      console.log('Error : ', err);
  }
});
```

### Error handling (ES5)

```javascript
var Api = require('api-client').default

var client = new Api('your_token');

client.getCompany('example.com')
.then(function(company) {
  console.log(company);
})
.catch(function(err) {
  switch (err.name) {
    case 'NoResultError':
      console.log('NoResultError');
      break;
    default:
      console.log('Error : ', err);
  }
});
```

### Available errors

- BadParametersError: send parameters through GET method
- BadRequestError: request is malformed
- InternalServerError
- InvalidVersionError: API version is invalid
- MethodNotAllowedError: you tried to access an endpoint with an invalid method
- NoResultError: no result matching your request
- NotAcceptableError: you requested a format that is not json
- NotFoundError: specified endpoint could not be found
- TooManyRequestsError: you made too many requests on the API in a short period of time
- UnauthorizedError: API key is wrong
- VersionRequiredError: send API version in the HTTP Accept headers
