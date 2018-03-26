<?php

namespace Api\Test;

require(dirname(dirname(dirname(__FILE__))) . '/src/Api/utils.php');

use PHPUnit\Framework\TestCase;
use Api\utils;
use Api\Exceptions;

const DETAIL = 'detail';

class StackTest extends TestCase {
  public function testErrorForStatus400() {
    $this->expectException(\Api\Exceptions\BadRequestException::class);
    $result = \Api\utils\errorForStatus(400, DETAIL);
  }

  public function testErrorForStatus401() {
    $this->expectException(\Api\Exceptions\UnauthorizedException::class);
    $result = \Api\utils\errorForStatus(401, DETAIL);
  }

  public function testErrorForStatus404() {
    $this->expectException(\Api\Exceptions\NotFoundException::class);
    $result = \Api\utils\errorForStatus(404, DETAIL);
  }

  public function testErrorForStatus405() {
    $this->expectException(\Api\Exceptions\MethodNotAllowedException::class);
    $result = \Api\utils\errorForStatus(405, DETAIL);
  }

  public function testErrorForStatus406() {
    $this->expectException(\Api\Exceptions\NotAcceptableException::class);
    $result = \Api\utils\errorForStatus(406, DETAIL);
  }

  public function testErrorForStatus429() {
    $this->expectException(\Api\Exceptions\TooManyRequestsException::class);
    $result = \Api\utils\errorForStatus(429, DETAIL);
  }

  public function testErrorForErrorCode1() {
    $this->expectException(\Api\Exceptions\VersionRequiredException::class);
    $result = \Api\utils\errorForErrorCode(1, DETAIL);
  }

  public function testErrorForErrorCode2() {
    $this->expectException(\Api\Exceptions\NoResultException::class);
    $result = \Api\utils\errorForErrorCode(2, DETAIL);
  }

  public function testErrorForErrorCode3() {
    $this->expectException(\Api\Exceptions\BadParametersException::class);
    $result = \Api\utils\errorForErrorCode(3, DETAIL);
  }

  public function testErrorForErrorCode4() {
    $this->expectException(\Api\Exceptions\InvalidVersionException::class);
    $result = \Api\utils\errorForErrorCode(4, DETAIL);
  }

  public function testThrowExceptionForResponseWhenStatus() {
    $this->expectException(\Api\Exceptions\BadRequestException::class);
    $result = \Api\utils\throwExceptionForResponse(400, null, DETAIL);
  }

  public function testThrowExceptionForResponseWhenErrorCode() {
    $this->expectException(\Api\Exceptions\VersionRequiredException::class);
    $result = \Api\utils\throwExceptionForResponse(430, 1, DETAIL);
  }

  public function testThrowExceptionForResponseWhenBadStatus() {
    $this->expectException(\Api\Exceptions\InternalServerException::class);
    $result = \Api\utils\throwExceptionForResponse(550, null, DETAIL);
  }
}
?>
