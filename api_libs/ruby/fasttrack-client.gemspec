Gem::Specification.new do |s|
  s.name        = 'api-client'
  s.version     = '1.0.2'
  s.date        = '2017-07-07'
  s.summary     = "My App client"
  s.description = "This Api library enables you to request the Api API in a convenient way. For more information about the Api API please see https://api.myapp.com"
  s.authors     = ["My App"]
  s.email       = 'info@myapp.com'
  s.files       = [
    "lib/api-client.rb",
    "lib/common.rb",
    "lib/exceptions.rb",
    "lib/constants.rb",
  ]
  s.homepage    = 'https://github.com/api/api-ruby'
  s.license     = 'MIT'

  s.add_development_dependency('webmock', '~> 3.0')
  s.add_dependency('rest-client', '~> 2.0')
end
