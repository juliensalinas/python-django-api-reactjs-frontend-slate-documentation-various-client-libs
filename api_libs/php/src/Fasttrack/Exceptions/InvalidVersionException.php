<?php

namespace Api\Exceptions;

class InvalidVersionException extends \Exception {
  public function __construct($message = 'API version is invalid', $code = 0, Exception $previous = null) {
    parent::__construct($message, $code, $previous);
  }
}
