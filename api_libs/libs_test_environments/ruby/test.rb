require 'api-client'

client = MyApp::Client.new('')

begin
  company = client.get_company('example.com')
  puts company
rescue Exception => e
  puts e
end
