FROM ubuntu:xenial

RUN apt-get update && apt-get install -y \
    php-cli \
    php-curl \
    curl \
    git \
    zip \
    unzip \
    && rm -rf /var/lib/apt/lists/*
RUN curl -s https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

COPY composer.json /
RUN composer install

COPY test.php /
RUN chmod 777 /test.php

CMD ["php","/test.php"]