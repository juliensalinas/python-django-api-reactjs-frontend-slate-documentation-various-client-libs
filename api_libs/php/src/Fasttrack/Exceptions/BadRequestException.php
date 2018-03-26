<?php

namespace Api\Exceptions;

class BadRequestException extends \Exception {
  public function __construct($message = 'Request is malformed', $code = 0, Exception $previous = null) {
    parent::__construct($message, $code, $previous);
  }
}
