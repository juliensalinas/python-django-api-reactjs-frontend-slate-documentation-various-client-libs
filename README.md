# Purpose

Expose commercial leads stored in database to customers through a paid RESTful API.

## API

The API is built with Python/Django and Django Rest Framework. Here are the key features:
* API can be consumed for free until a certain number of requests
* Various paid plans are available. Payment is done though Stripe
* A basic rate limiting is implemented for everyone in order to prevent abuse
* If data are not found in database, try to fetch it from an external data provider (Clearbit)

## Frontend

In addition to the raw API, a user-friendly SPA frontend is developed with React.js (for 90% of the frontend) and Vue.js (for payment only). Main features:
* register, login, and get your API token
* see your API consumption
* pay for more requests
* request the API and get results

## API documentation

Nice API documentation is made with Slate.

## Client libraries

The API can be consumed through client libraries implemented in several languages in order to make developers' life easier. Libs exist in the following languages:
* javascript
* php
* python
* ruby




