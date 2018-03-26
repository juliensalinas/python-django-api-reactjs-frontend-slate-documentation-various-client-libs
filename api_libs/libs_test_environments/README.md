Ready to use Docker images for Api api libraries testing.
Dedicated images for:
- ruby
- php

---------------------------------------------------

Usage:

1) cd to language folder
2) put your code in test file
3) if api-client lib has changed, add a line to Dockerfile in order to remove cache and download new lib
3) docker build -t my_account/my_repo:lib_test_environment .
4) docker run -it my_account/my_repo:lib_test_environment

