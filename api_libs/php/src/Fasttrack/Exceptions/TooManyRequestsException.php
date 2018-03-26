<?php

namespace Api\Exceptions;

class TooManyRequestsException extends \Exception {
  public function __construct($message = 'You made too many requests on the API in a short period of time', $code = 0, Exception $previous = null) {
    parent::__construct($message, $code, $previous);
  }
}
