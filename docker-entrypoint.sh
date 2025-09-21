#!/bin/bash

# Railway WordPress Startup Script
# Sets proper environment variables before starting Apache

echo "🚀 Starting TooSensitive WordPress on Railway..."

# Set default ServerName if not provided
if [ -z "$APACHE_SERVER_NAME" ]; then
    if [ -n "$RAILWAY_PUBLIC_DOMAIN" ]; then
        export APACHE_SERVER_NAME="$RAILWAY_PUBLIC_DOMAIN"
    elif [ -n "$RAILWAY_STATIC_URL" ]; then
        export APACHE_SERVER_NAME="$RAILWAY_STATIC_URL"
    else
        export APACHE_SERVER_NAME="localhost"
    fi
fi

echo "🌐 Apache ServerName: $APACHE_SERVER_NAME"

# Set default WordPress environment if not provided
if [ -z "$RAILWAY_ENVIRONMENT" ]; then
    export RAILWAY_ENVIRONMENT="production"
fi

echo "🔧 Environment: $RAILWAY_ENVIRONMENT"

# Create uploads directory if it doesn't exist
mkdir -p /var/www/html/wp-content/uploads
chown -R www-data:www-data /var/www/html/wp-content/uploads
chmod -R 775 /var/www/html/wp-content/uploads

echo "📁 WordPress uploads directory ready"

echo "🚀 Starting Apache..."

# Start Apache in foreground
exec apache2-foreground