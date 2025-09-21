# Ultra-Simple Dockerfile for Railway
FROM php:8.4-apache

# Install minimal dependencies
RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libzip-dev \
    libicu-dev \
    libonig-dev \
    libxml2-dev \
    curl \
    default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

# Install essential PHP extensions only
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        gd \
        mysqli \
        pdo_mysql \
        zip \
        intl \
        mbstring \
        xml

# Enable Apache modules
RUN a2enmod rewrite

# Basic PHP configuration
RUN { \
    echo 'memory_limit = 512M'; \
    echo 'upload_max_filesize = 64M'; \
    echo 'post_max_size = 64M'; \
    echo 'max_execution_time = 300'; \
} > /usr/local/etc/php/conf.d/wordpress.ini

# Basic Apache configuration
RUN { \
    echo '<Directory /var/www/html>'; \
    echo '    AllowOverride All'; \
    echo '    Require all granted'; \
    echo '</Directory>'; \
} > /etc/apache2/conf-available/wordpress.conf \
    && a2enconf wordpress

# Fix Apache ServerName for Railway
RUN echo "ServerName r2y974z6.up.railway.app" >> /etc/apache2/apache2.conf

# Copy Railway-optimized Apache config
COPY apache-railway-minimal.conf /etc/apache2/conf-available/railway-minimal.conf
RUN a2enconf railway-minimal

# Enable required Apache modules
RUN a2enmod headers deflate

# Copy WordPress files
COPY wordpress/ /var/www/html/

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Create uploads directory
RUN mkdir -p /var/www/html/wp-content/uploads \
    && chown -R www-data:www-data /var/www/html/wp-content/uploads \
    && chmod -R 775 /var/www/html/wp-content/uploads

# Copy simplified wp-config
COPY railway-wp-config-simple.php /var/www/html/wp-config.php

# Add health check page
COPY health-check.html /var/www/html/
COPY health-check.php /var/www/html/

EXPOSE 80

# Direct Apache start - minimal configuration
CMD ["apache2-foreground"]