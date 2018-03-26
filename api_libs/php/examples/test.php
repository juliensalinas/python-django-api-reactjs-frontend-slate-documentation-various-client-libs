<?php

require __DIR__ . '/../src/Api/Api.php';

use Api\Api;
use Api\Exceptions;

$client = new \Api\Api('your_token');

print_r($client);

try {
  $result = $client->getCompany('example.com');
  print_r($result);
} catch (\Api\Exceptions\UnauthorizedException $e) {
  print_r('UnauthorizedException');
  print_r($e);
}

?>
