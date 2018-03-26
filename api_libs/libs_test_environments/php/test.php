<?php
require 'vendor/autoload.php';

use Api\Api;

$client = new \Api\Api('');

try {
  $company = $client->getCompany('example.com');
  print_r($company);
} catch (Exception $err) {
  print_r($err);
}

?>