FROM ubuntu:xenial

RUN apt-get update && apt-get install -y \
    ruby \
    ruby-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*
RUN gem install bundler

COPY Gemfile /
RUN bundle install

COPY test.rb /
RUN chmod 777 /test.rb

CMD ["ruby","/test.rb"]