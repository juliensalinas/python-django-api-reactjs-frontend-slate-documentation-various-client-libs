require 'json'
require 'webmock/rspec'

require_relative '../../lib/api-client'
require_relative '../fixtures/company'
require_relative '../fixtures/contact'

FAKE_DOMAIN = 'test.com'
FAKE_EMAIL  = 'test@test.com'
FAKE_TOKEN  = 'fake_token'

TEST_BAD_STATUS_CODES = [
  400,
  401,
  402,
  403,
  404,
  405,
  406,
  407,
  429,
  500,
  501,
  700,
]

TEST_TIMEOUT = 50000

WebMock.allow_net_connect!

def get_api_instance(opts = {})
  return MyApp::Client.new(FAKE_TOKEN, opts)
end

RSpec.describe 'Client' do
  it 'should return valid instance' do
    expect(get_api_instance()).to be_an_instance_of(MyApp::Client)
  end

  context '#get_company' do
    it 'should return valid company' do
      WebMock.reset!
      stub_request(:any, URL + PATHNAME_COMPANY)
      .with(query: hash_including({
        'domain' => FAKE_DOMAIN
      }))
      .to_return(body: JSON.generate(FIXTURE_COMPANY))
      company = get_api_instance().get_company(FAKE_DOMAIN)

      expect(company).to eq(FIXTURE_COMPANY)
    end

    TEST_BAD_STATUS_CODES.each do|statusCode|
      it 'should reject on error ' + statusCode.to_s do
        WebMock.reset!
        stub_request(:any, URL + PATHNAME_COMPANY)
        .with(query: hash_including({
          'domain' => FAKE_DOMAIN
        }))
        .to_return(status: [statusCode, 'error'])

        expect {
          company = get_api_instance().get_company(FAKE_DOMAIN)
        }.to raise_error(Exception)
      end
    end

    it 'should reject on bad version' do
      WebMock.reset!
      stub_request(:any, URL + PATHNAME_COMPANY)
      .with(query: hash_including({
        'domain' => FAKE_DOMAIN
      }))
      .to_return(status: [404, JSON.generate({
        error_code: '1',
      })])

      expect {
        company = get_api_instance().get_company(FAKE_DOMAIN)
      }.to raise_error(Exception)
    end

    it 'should reject on bad version' do
      WebMock.reset!
      stub_request(:any, URL + PATHNAME_COMPANY)
      .with(query: hash_including({
        'domain' => FAKE_DOMAIN
      }))
      .to_return(status: [404, JSON.generate({
        error_code: '1',
      })])

      expect {
        company = get_api_instance().get_company(FAKE_DOMAIN)
      }.to raise_error(Exception)
    end
  end

  context '#get_contact' do
    it 'should return valid contact' do
      WebMock.reset!
      stub_request(:any, URL + PATHNAME_CONTACT)
      .with(query: hash_including({
        'email' => FAKE_EMAIL
      }))
      .to_return(body: JSON.generate(FIXTURE_CONTACT))
      company = get_api_instance().get_contact(FAKE_EMAIL)

      expect(company).to eq(FIXTURE_CONTACT)
    end

    TEST_BAD_STATUS_CODES.each do|statusCode|
      it 'should reject on error ' + statusCode.to_s do
        WebMock.reset!
        stub_request(:any, URL + PATHNAME_CONTACT)
        .with(query: hash_including({
          'email' => FAKE_EMAIL
        }))
        .to_return(status: [statusCode, 'error'])

        expect {
          company = get_api_instance().get_contact(FAKE_EMAIL)
        }.to raise_error(Exception)
      end
    end

    it 'should reject on bad version' do
      WebMock.reset!
      stub_request(:any, URL + PATHNAME_CONTACT)
      .with(query: hash_including({
        'email' => FAKE_EMAIL
      }))
      .to_return(status: [404, JSON.generate({
        error_code: '1',
      })])

      expect {
        company = get_api_instance().get_contact(FAKE_EMAIL)
      }.to raise_error(Exception)
    end

    it 'should reject on bad version' do
      WebMock.reset!
      stub_request(:any, URL + PATHNAME_CONTACT)
      .with(query: hash_including({
        'email' => FAKE_EMAIL
      }))
      .to_return(status: [404, JSON.generate({
        error_code: '1',
      })])

      expect {
        company = get_api_instance().get_contact(FAKE_EMAIL)
      }.to raise_error(Exception)
    end
  end
end
