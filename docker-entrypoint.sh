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

# Wait for database to be ready if using Railway MySQL
if [ -n "$DATABASE_URL" ] || [ -n "$MYSQL_HOST" ]; then
    echo "🗄️  Waiting for database connection..."
    
    # Extract database host
    if [ -n "$DATABASE_URL" ]; then
        DB_HOST=$(echo $DATABASE_URL | sed -n 's/.*@\([^:]*\):.*/\1/p')
    else
        DB_HOST="$MYSQL_HOST"
    fi
    
    # Wait for database
    timeout=30
    counter=0
    while ! mysqladmin ping -h"$DB_HOST" --silent && [ $counter -lt $timeout ]; do
        echo "⏳ Waiting for database... ($counter/$timeout)"
        sleep 2
        counter=$((counter + 1))
    done
    
    if [ $counter -lt $timeout ]; then
        echo "✅ Database connection successful"
    else
        echo "⚠️  Database connection timeout - continuing anyway"
    fi
fi

# Fix Apache configuration with environment variables
echo "🔧 Configuring Apache..."
envsubst < /etc/apache2/conf-available/railway.conf > /tmp/railway.conf.tmp
mv /tmp/railway.conf.tmp /etc/apache2/conf-available/railway.conf

echo "🚀 Starting Apache..."

# Start Apache in foreground
exec apache2-foreground