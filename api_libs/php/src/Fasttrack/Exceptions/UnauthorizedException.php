<?php

namespace Api\Exceptions;

class UnauthorizedException extends \Exception {
  public function __construct($message = 'API key is wrong', $code = 0, Exception $previous = null) {
    parent::__construct($message, $code, $previous);
  }
}
