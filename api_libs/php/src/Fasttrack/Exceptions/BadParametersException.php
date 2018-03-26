<?php

namespace Api\Exceptions;

class BadParametersException extends \Exception {
  public function __construct($message = 'Send parameters through GET method', $code = 0, Exception $previous = null) {
    parent::__construct($message, $code, $previous);
  }
}
