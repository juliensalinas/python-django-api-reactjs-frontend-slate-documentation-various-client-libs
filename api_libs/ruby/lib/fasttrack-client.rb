require 'json'
require 'rest-client'

require_relative './common'
require_relative './constants'

module MyApp
  class Client
    def initialize(token, opts = {})
      @token = token
      @opts = opts
    end

    # Request to the API endpoint
    def get(path, params)
      begin
        headers = {
          'Authorization' => 'Token ' + @token,
          'Accept'        => ACCEPT + '; version = ' + VERSION.to_s,
          'params'        => params
        };

        url = 'https://api.myapp.com' + path

        response = RestClient.get(url, headers)

        return JSON.parse(response.body)
      rescue RestClient::ExceptionWithResponse => e
        body = nil;
        response = e.response

        begin
          body = JSON.parse(response.body)
        rescue
          body = {}
        end

        exception = exception_for_response(response.code, body['error_code'])
        raise exception, body['detail']
      end
    end

    # Retrieve company details with a `domain`
    def get_company(domain)
      return self.get PATHNAME_COMPANY, {
        'domain' => domain
      }
    end

    # Retrieve contact details with an `email`
    def get_contact(email)
      return self.get PATHNAME_CONTACT, {
        'email' => email
      }
    end
  end
end
