<?php

namespace Api\Exceptions;

class NoResultException extends \Exception {
  public function __construct($message = 'No result matching your request', $code = 0, Exception $previous = null) {
    parent::__construct($message, $code, $previous);
  }
}
