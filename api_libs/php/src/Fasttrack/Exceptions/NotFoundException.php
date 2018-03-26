<?php

namespace Api\Exceptions;

class NotFoundException extends \Exception {
  public function __construct($message = 'Specified endpoint could not be found', $code = 0, Exception $previous = null) {
    parent::__construct($message, $code, $previous);
  }
}
