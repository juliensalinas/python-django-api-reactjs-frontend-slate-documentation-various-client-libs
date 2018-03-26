<?php

namespace Api;
include 'utils.php';

// require __DIR__ . '/../../vendor/autoload.php';

class Api {
    const VERSION = '0.1';
    const API_VERSION = 1;

    const ACCEPT  = 'application/vnd.api+json';
    const URL     = 'https://api.myapp.com/';

    const PATHNAME_COMPANY = '/company';
    const PATHNAME_CONTACT = '/contact';

    const TIMEOUT = 5000;

    public $token;
    public $opts;

    public function __construct($token, $opts = array()) {
      $this->token = $token;
      $this->opts = $opts;
    }

    private function __generate_url($url, $opts) {
      return self::URL . $url . '?' . http_build_query($opts);
    }

    // Request to the API endpoint
    private function __getUrl($url, $opts) {
      $response = \Httpful\Request::get($this->__generate_url($url, $opts))
        ->expectsJson()
        ->sendsJson()
        ->addHeaders(array(
          'Authorization' => 'Token ' . $this->token,
          'Accept'        => self::ACCEPT . '; version = ' . self::API_VERSION,
        ))
        ->send();

      $body = $response->body;
      $error_code = null;
      $detail = null;

      if (isset($body->error_code)) {
        $error_code = $body->error_code;
      }

      if (isset($body->detail)) {
        $detail = $body->detail;
      }

      utils\throwExceptionForResponse($response->code, $error_code, $detail);

      return $body;
    }

    // Retrieve company details with a `domain`
    public function getCompany($domain) {
      return $this->__getUrl(self::PATHNAME_COMPANY, array(
        'domain' => $domain
      ));
    }

    // Retrieve contact details with an `email`
    public function getContact($email) {
      return $this->__getUrl(self::PATHNAME_COMPANY, array(
        'email' => $email
      ));
    }
}
