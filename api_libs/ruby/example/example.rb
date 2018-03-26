require_relative '../lib/api-client'

client = MyApp::Client.new('your_token')

begin
  response = client.get_company('example.com')
  puts response
rescue MyApp::UnauthorizedException => e
  puts 'UnauthorizedException'
  puts e
end
