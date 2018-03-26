<?php

namespace Api\utils;

include 'Exceptions/BadParametersException.php';
include 'Exceptions/BadRequestException.php';
include 'Exceptions/InternalServerException.php';
include 'Exceptions/InvalidVersionException.php';
include 'Exceptions/MethodNotAllowedException.php';
include 'Exceptions/NoResultException.php';
include 'Exceptions/NotAcceptableException.php';
include 'Exceptions/NotFoundException.php';
include 'Exceptions/TooManyRequestsException.php';
include 'Exceptions/UnauthorizedException.php';
include 'Exceptions/VersionRequiredException.php';

function errorForStatus($status, $detail) {
  switch ($status) {
    case '400':
      throw new \Api\Exceptions\BadRequestException($detail);
      break;

    case '401':
      throw new \Api\Exceptions\UnauthorizedException($detail);
      break;

    case '404':
      throw new \Api\Exceptions\NotFoundException($detail);
      break;

    case '405':
      throw new \Api\Exceptions\MethodNotAllowedException($detail);
      break;

    case '406':
      throw new \Api\Exceptions\NotAcceptableException($detail);
      break;

    case '429':
      throw new \Api\Exceptions\TooManyRequestsException($detail);
      break;
  }
}

function errorForErrorCode($error_code, $detail) {
  switch ($error_code) {
    case '1':
      throw new \Api\Exceptions\VersionRequiredException($detail);
      break;

    case '2':
      throw new \Api\Exceptions\NoResultException($detail);
      break;

    case '3':
      throw new \Api\Exceptions\BadParametersException($detail);
      break;

    case '4':
      throw new \Api\Exceptions\InvalidVersionException($detail);
      break;
  }
}

function throwExceptionForResponse($status, $error_code, $detail) {
  if (isset($error_code)) {
    errorForErrorCode($error_code, $detail);
  }

  if (isset($status)) {
    errorForStatus($status, $detail);
  }

  if ($status >= 500 && $status <= 600) {
    throw new \Api\Exceptions\InternalServerException($detail);
  }
}
