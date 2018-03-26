---
title: Api API Reference

language_tabs:
  - shell : cURL
  - http : Raw HTTP
  - python : Python
  - ruby : Ruby
  - php : PHP
  - javascript--ES5 : JS ES5
  - javascript--ES6 : JS ES6

toc_footers:
  - <a href='mailto:info@myapp.com?Subject=API%20Key%20Request'>Contact us to get an API key</a>
  - <a href='https://api.myapp.com/client'>Use our graphical interface</a>

includes:
  - errors

search: false
---

# Introduction

Welcome to the Api's API! You can use this API to access our leads database. 2 endpoints are accessible: 

* **Company** in order to retrieve company informations based on an domain
* **Contact** in order to retrieve contact informations based on an email

For ease of use, you can consume our API through the [api-client](#installing-api-client) library available in Python, Ruby, PHP, and Javascript. Please see the library's [Github page](https://github.com/api)

You can also use our API through our [graphical interface](https://api.myapp.com/client)

If you want to know more about us and what we are doing, feel free to visit our [Api](http://myapp.com) website.

# Requests Headers 

```shell
curl -X GET "{api_endpoint}"
  -H "Authorization: {your_token}"
  -H "Accept: application/vnd.api+json; version=1"
```

```http
GET {api_endpoint} HTTP/1.1
Host: https://api.myapp.com
Authorization: Token {your_token}
Accept: application/vnd.api+json; version=1
```

```python
# No header to set up with the Python library.
```

```ruby
# No header to set up with the Ruby library.
```

```php
<?php
# No header to set up with the PHP library.
?>
```

```javascript--ES5
// No header to set up with the JS library.
```

```javascript--ES6
// No header to set up with the JS library.
```
> Make sure to replace `{your_token}` with your API key and `{api_endpoint}` with the right endpoint (see the Retrieving Data section below).

Please see on the right the headers you should put in all your API requests.

Headers include 3 important information:

* Your API key
* The vendor name (api)
* The API version (currently version 1)

Please see below for more details.

<aside class="notice">
If you are using the api-client library, you can skip this part.
</aside>

## Authentication

Api uses API keys to allow access to the API. You can ask for a new Api API key by contacting us at <a href='mailto:info@myapp.com?Subject=API%20Key%20Request'>info@myapp.com</a>.

Api expects the API key to be included in all the API requests to the server in a header that looks like the following:

`Authorization: Token {your_token}`

<aside class="notice">
You must replace <code>{your_token}</code> with your personal API key.
</aside>

## Vendor

Make sure you include the Api vendor media type in the `Accept` header.

Api expects the vendor media type to be included in all the API requests to the server along with the API version in the following header:

`Accept: application/vnd.api+json; version=1`

## Versioning

Api API uses a versioning system. Current version is version **1**.

Specify the version as part of the media type in the `Accept` header. The version is included as a media type parameter, that supplements the main media type.

Api expects the API version to be included in all the API requests to the server along with the vendor media type in the following header:

`Accept: application/vnd.api+json; version=1`

# Installing api-client

api-client helps you consume the API using your favorite programming language.

The api-client library is available in 4 languages: Python, Ruby, PHP, and Javascript. Please see the library's [Github page](https://github.com/api).

Install instructions:

**Python**

Add the following to your requirements.txt:

`api-client`

and then run:

`pip install -r requirements.txt`

**Ruby**

Add the following to your Gemfile:

`gem 'api-client'`

And then run:

`bundle install`

**PHP**

Add the following to your composer.json:

`{"require": {"api/api-client": "*"} }`

and then run:

`composer install`

**Javascript**

Run:

`npm install --save api-client`

# Retrieving Data 

2 endpoints are accessible: 

* **Company** in order to retrieve company informations based on an domain
* **Contact** in order to retrieve contact informations based on an email

## Company API

### Request

```shell
curl -X GET "https://api.myapp.com/company?domain={your_parameter}"
  -H "Authorization: {your_token}"
  -H "Accept: application/vnd.api+json; version=1"
```

```http
GET /company?domain={your_parameter} HTTP/1.1
Host: https://api.myapp.com
Authorization: Token {your_token}
Accept: application/vnd.api+json; version=1
```

```python
from api_client import Client

client = Client('{your_token}')

try:
  response = client.get_company('{your_parameter}')
  print(response)
except Exception as e:
  print(e)
```

```ruby
require 'api-client'

client = Api::Client.new('{your_token}')

begin
  company = client.get_company('{your_parameter}')
  puts company
rescue Exception => e
  puts e
end

```

```php
<?php
require 'vendor/autoload.php';

use Api\Api;

$client = new \Api\Api('{your_token}');

try {
  $company = $client->getCompany('{your_parameter}');
  print_r($company);
} catch (Exception $err) {
  print_r($err);
}
?>
```

```javascript--ES5
var Api = require('api-client').default;

var client = new Api('{your_token}');

client.getCompany('{your_parameter}')
.then(function(company) {
  console.log(company);
})
.catch(function(err) {
  console.error(err);
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
  console.error(err);
});
```

The endpoint for the Company API is `https://api.myapp.com/company`

You can retrieve company details from this endpoint by providing the endpoint with a **domain** parameter through GET http method (e.g. `chartreuse-medical.com`).

### Response

> The JSON encoded response looks like this:

```json
{
  "email": "contact@chartreuse-medical.com",
  "name": "Chartreuse high-tech medical device",  
  "formatted_address": "2 Oxford Street, London, United-Kingdom",
  "types": [
    "Supplier",
    "Service Provider"
  ],
  "description": "Diagnostic Apparatus, Medical",
  "founded": "1847",
  "website_url": "http://www.chartreuse-medical.com/index.html",
  "size": "+ 10 000 employees",
  "phone": "+49 89 63600",
  "industries": [
    "Hospital, Health Care",
    "Medical Device"
  ],
  "linkedin_url": "https://www.linkedin.com/company/chartreuse-medical",
  "last_updated": "2017-03-26T23:33:39Z"
}
```

The JSON response contains the following attributes if available:

Attribute | Description
------- | -----------
`email` | **string** <br> Company email
`name` | **string** <br> Company name
`formatted_address` | **string** <br> Company address
`types` | **array** <br> Type of company. Several types are possible. 
`description` | **string** <br> Description of the company's activity
`founded` | **string** <br> Year of creation
`website_url` | **string** <br> Company website
`size` | **string** <br> Company size range
`phone` | **string** <br> Company phone
`industries` | **array** <br> Industries the company belongs to. Several industries are possible.
`linkedin_url` | **string** <br> Linkedin page of the company
`last_updated` | **date** <br> Date of the last data update

## Contact API

### Request

```shell
curl -X GET "https://api.myapp.com/contact?email={your_parameter}"
  -H "Authorization: {your_token}"
  -H "Accept: application/vnd.api+json; version=1"
```

```http
GET /contact?email={your_parameter} HTTP/1.1
Host: https://api.myapp.com
Authorization: Token {your_token}
Accept: application/vnd.api+json; version=1
```

```python
from api_client import Client

client = Client('{your_token}')

try:
  response = client.get_contact('{your_parameter}')
  print(response)
except Exception as e:
  print(e)
```

```ruby
require 'api-client'

client = Api::Client.new('{your_token}')

begin
  company = client.get_contact('{your_parameter}')
  puts company
rescue Exception => e
  puts e
end
```

```php
<?php
require 'vendor/autoload.php';

use Api\Api;

$client = new \Api\Api('your_token');

try {
  $company = $client->getContact('{your_parameter}');
  print_r($company);
} catch (Exception $err) {
  print_r($err);
}
?>
```

```javascript--ES5
var Api = require('api-client').default;

var client = new Api('{your_token}');

client.getContact('{your_parameter}')
.then(function(contact) {
  console.log(contact);
})
.catch(function(err) {
  console.error(err);
});
```

```javascript--ES6
import Api from 'api-client';

var client = new Api('{your_token}');

client.getContact('{your_parameter}')
.then((contact) => {
  console.log(contact);
})
.catch((err) => {
  console.error(err);
});
```

The endpoint for the Contact API is `https://api.myapp.com/contact`

You can retrieve contact details from this endpoint by providing the endpoint with an **email** parameter through GET http method (e.g. franck.dupuis@gmail.com).

### Response

> The JSON encoded response looks like this:

```json
{
  "title": "Executive Director, GMP Quality Assurance",
  "first_name": "Franck",
  "last_name": "Dupuis",
  "location": "2 Rue de Belledonne, 73000 Chambéry, France",
  "company": "ST Microelectronics",
  "linkedin_url": "https://www.linkedin.com/in/franck-dupuis-64b2359"
}
```

The JSON response contains the following attributes if available:

Attribute | Description
------- | -----------
`title` | **string** <br> Position of the contact in his company
`first_name` | **string** <br> First name of the contact
`last_name` | **string** <br> Last name of the contact
`location` | **string** <br> Contact address
`company` | **string** <br> Company the contact is working for
`linkedin_url` | **string** <br> Linkedin page of the contact

# Rate Limiting

In order to prevent from abnormal use of the API, we implement a rate limitation. You can make until 650 requests per minute. If you go above this point you will get a HTTP 429 error (see Generic Errors) and the number of seconds you have to wait until your next request will be mentioned in the JSON response like this:

`Request was throttled. Expected available in 32.5 seconds`

If you’re running into this error while you think you should not, or if you need a custom higher rate, feel free to send us an email at support@myapp.com 