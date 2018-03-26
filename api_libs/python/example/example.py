from api_client import Client, UnauthorizedException

client = Client('your_token')

try:
  response = client.get_company('example.com')
  print(response)
except UnauthorizedException as e:
  print('UnauthorizedException')
  print(e)
