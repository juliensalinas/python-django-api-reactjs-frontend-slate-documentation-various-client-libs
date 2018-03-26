require_relative '../../lib/common'

RSpec.describe 'exception_for_response' do
  it 'should return generic exception for invalid arguments' do
    result = exception_for_response(nil, nil)
    expect(result).to be(Exception)
  end

  it 'should return generic exception for unknown status' do
    result = exception_for_response(700, nil)
    expect(result).to be(Exception)
  end

  it 'should return generic exception for unknown error code' do
    result = exception_for_response(404, '150')
    expect(result).to be(MyApp::NotFoundException)
  end

  it 'should return BadRequestException' do
    result = exception_for_response(400, nil)
    expect(result).to be(MyApp::BadRequestException)
  end

  it 'should return UnauthorizedException' do
    result = exception_for_response(401, nil)
    expect(result).to be(MyApp::UnauthorizedException)
  end

  it 'should return NotFoundException' do
    result = exception_for_response(404, nil)
    expect(result).to be(MyApp::NotFoundException)
  end

  it 'should return MethodNotAllowedException' do
    result = exception_for_response(405, nil)
    expect(result).to be(MyApp::MethodNotAllowedException)
  end

  it 'should return NotAcceptableException' do
    result = exception_for_response(406, nil)
    expect(result).to be(MyApp::NotAcceptableException)
  end

  it 'should return TooManyRequestsException' do
    result = exception_for_response(429, nil)
    expect(result).to be(MyApp::TooManyRequestsException)
  end

  it 'should return VersionRequiredException' do
    result = exception_for_response(404, '1')
    expect(result).to be(MyApp::VersionRequiredException)
  end

  it 'should return NoResultException' do
    result = exception_for_response(404, '2')
    expect(result).to be(MyApp::NoResultException)
  end

  it 'should return BadParametersException' do
    result = exception_for_response(404, '3')
    expect(result).to be(MyApp::BadParametersException)
  end

  it 'should return InvalidVersionException' do
    result = exception_for_response(404, '4')
    expect(result).to be(MyApp::InvalidVersionException)
  end

  it 'should return InternalServerException' do
    result = exception_for_response(500, nil)
    expect(result).to be(MyApp::InternalServerException)
  end

  it 'should return InternalServerException' do
    result = exception_for_response(550, nil)
    expect(result).to be(MyApp::InternalServerException)
  end
end
