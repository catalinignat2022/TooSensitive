#!/bin/bash

# TooSensitive WordPress Setup Script
# Production-ready WordPress installation

echo "🚀 Setting up TooSensitive WordPress Installation..."

# Check if MySQL is running
if ! pgrep -x "mysqld" > /dev/null; then
    echo "📦 Starting MySQL service..."
    brew services start mysql
    sleep 3
fi

# Database configuration
DB_NAME="toosensitive_wp"
DB_USER="wp_user"
DB_PASS="secure_password_2024!"

# WordPress configuration
WP_TITLE="TooSensitive: RSD & Emotional Support"
WP_URL="http://localhost:8000"
ADMIN_USER="admin"
ADMIN_PASSWORD="TooSensitive2024!"
ADMIN_EMAIL="admin@toosensitive.org"

# Check and create database if needed
echo "🗃️ Setting up database..."
mysql -u root -e "CREATE DATABASE IF NOT EXISTS $DB_NAME; 
CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS'; 
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost'; 
FLUSH PRIVILEGES;" 2>/dev/null || {
    echo "❌ Database setup failed. Please check MySQL connection."
    exit 1
}

# Download WP-CLI if not present
if ! command -v wp &> /dev/null; then
    echo "📥 Downloading WP-CLI..."
    curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
    php wp-cli.phar --info
    chmod +x wp-cli.phar
    sudo mv wp-cli.phar /usr/local/bin/wp
    echo "✅ WP-CLI installed successfully"
fi

# Navigate to WordPress directory
cd wordpress

# Check if WordPress is already installed
if wp core is-installed 2>/dev/null; then
    echo "⚠️ WordPress is already installed. Skipping core installation."
else
    echo "⚙️ Installing WordPress..."
    
    # Install WordPress
    wp core install \
        --url="$WP_URL" \
        --title="$WP_TITLE" \
        --admin_user="$ADMIN_USER" \
        --admin_password="$ADMIN_PASSWORD" \
        --admin_email="$ADMIN_EMAIL" \
        --skip-email || {
        echo "❌ WordPress installation failed."
        exit 1
    }
    echo "✅ WordPress installed successfully"
fi

echo "🎨 Activating TooSensitive theme..."

# Activate our theme
wp theme activate toosensitive-theme

echo "📄 Creating pages..."

# Create main pages
wp post create --post_type=page --post_title="Home" --post_status=publish --page_template=homepage.php
wp post create --post_type=page --post_title="RSD Assessment" --post_status=publish --page_template=page-assessment.php
wp post create --post_type=page --post_title="Education" --post_status=publish --page_template=page-education.php
wp post create --post_type=page --post_title="Coping Strategies" --post_status=publish --page_template=page-coping-strategies.php
wp post create --post_type=page --post_title="Community" --post_status=publish --page_template=page-community.php
wp post create --post_type=page --post_title="App Preview" --post_status=publish --page_template=page-app-preview.php
wp post create --post_type=page --post_title="About" --post_status=publish --page_template=page-about.php

# Set homepage
HOMEPAGE_ID=$(wp post list --post_type=page --name=home --format=ids)
wp option update show_on_front page
wp option update page_on_front $HOMEPAGE_ID

echo "🔧 Installing essential plugins..."

# Define plugins array
plugins=("contact-form-7" "yoast-seo" "wp-security-audit-log" "w3-total-cache")

for plugin in "${plugins[@]}"; do
    if wp plugin is-installed "$plugin" 2>/dev/null; then
        if ! wp plugin is-active "$plugin" 2>/dev/null; then
            wp plugin activate "$plugin"
            echo "✅ Activated $plugin"
        else
            echo "ℹ️ $plugin already active"
        fi
    else
        wp plugin install "$plugin" --activate
        echo "✅ Installed and activated $plugin"
    fi
done

echo "⚡ Optimizing settings..."

# Set permalinks to pretty URLs
wp rewrite structure '/%postname%/'
wp rewrite flush

# Update site settings
wp option update blogdescription "Support and resources for Rejection Sensitive Dysphoria"
wp option update timezone_string "America/New_York"
wp option update date_format "F j, Y"
wp option update time_format "g:i a"

# Security settings
wp option update users_can_register 0

echo "📧 Setting up email configuration..."

# Email settings (you'll need to configure these for production)
wp option update admin_email "$ADMIN_EMAIL"

echo "✅ WordPress setup complete!"
echo ""
echo "🌐 Site URL: $WP_URL"
echo "👤 Admin User: $ADMIN_USER"
echo "🔑 Admin Password: $ADMIN_PASSWORD"
echo "📧 Admin Email: $ADMIN_EMAIL"
echo ""
echo "� Starting development server..."

# Check if server is already running
if ! curl -s http://localhost:8000 > /dev/null 2>&1; then
    echo "Starting PHP development server on localhost:8000..."
    php -S localhost:8000 &
    SERVER_PID=$!
    echo "Server started with PID: $SERVER_PID"
    sleep 2
    
    if curl -s http://localhost:8000 > /dev/null 2>&1; then
        echo "✅ Server is running successfully!"
        echo "🎉 Visit your site: http://localhost:8000"
        echo "🔧 Admin panel: http://localhost:8000/wp-admin"
    else
        echo "❌ Server failed to start"
        exit 1
    fi
else
    echo "✅ Server is already running!"
    echo "🎉 Visit your site: http://localhost:8000"
    echo "🔧 Admin panel: http://localhost:8000/wp-admin"
fi

echo ""
echo "�📝 Next steps for production:"
echo "1. Update wp-config.php with production database credentials"
echo "2. Set up SSL certificate"
echo "3. Configure email delivery (SMTP)"
echo "4. Set up backups"
echo "5. Configure caching"
echo "6. Test all forms and functionality"