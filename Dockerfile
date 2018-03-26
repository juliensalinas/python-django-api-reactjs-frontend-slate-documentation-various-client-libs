FROM ubuntu:xenial

RUN apt-get update && apt-get install -y \
	python-pip \
	apache2 \
	libapache2-mod-wsgi \
	python-psycopg2 \
	&& rm -rf /var/lib/apt/lists/*
RUN pip install django==1.10
RUN pip install djangorestframework==3.5.3
RUN pip install mandrill==1.0.57
RUN pip install clearbit==0.1.5
RUN pip install stripe==1.59.0
RUN pip install python-dateutil==2.6.0

# Only necessary for a website using localization.
RUN apt-get update && apt-get install -y \
    gettext libgettextpo-dev \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 80
EXPOSE 443

VOLUME /var/log/apache2
VOLUME /var/log/django

ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_PID_FILE /var/run/apache2.pid
ENV APACHE_RUN_DIR /var/run/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2

COPY startup.sh /home/
RUN chmod 777 /home/startup.sh
CMD ["bash","/home/startup.sh"]

COPY apache2.conf /etc/apache2
COPY 000-api.myapp.com.tld-ssl.conf /etc/apache2/sites-available
COPY api.myapp.com.tld.key /etc/ssl/private
COPY api.myapp.com.tld.crt /etc/ssl/certs

RUN a2enmod ssl \
	&& a2enmod headers \
	&& a2enmod expires \
	&& service apache2 restart \
	&& a2ensite 000-api.myapp.com.tld-ssl \
	&& service apache2 reload

# Temporary
# RUN pip install django-cors-headers

# Had to do this in order for the last layer not to be to heavy
# otherwise the last layer contains the static folder which is pretty heavy
RUN mkdir /home/django_project
COPY django_project/static /home/django_project/static
COPY django_project/api_docs /home/django_project/api_docs
COPY django_project/locale /home/django_project/locale
COPY django_project/django_project /home/django_project/django_project
COPY django_project/react_api_connection /home/django_project/react_api_connection
COPY django_project/billing /home/django_project/billing
COPY django_project/templates /home/django_project/templates
COPY django_project/utils /home/django_project/utils
COPY django_project/manage.py /home/django_project/manage.py
COPY django_project/api_core /home/django_project/api_core
COPY django_project/external_data_providers /home/django_project/external_data_providers