FROM php:8.1-apache
RUN a2enmod rewrite
COPY apache-env.conf /etc/apache2/conf-enabled/env.conf
COPY ./ /var/www/html/

