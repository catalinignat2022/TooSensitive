#!/bin/bash

# Railway Environment Variables Generator pentru WordPress
# Acest script generează toate variabilele de securitate necesare pentru deployment

echo "🚀 Railway WordPress Environment Variables Generator"
echo "=================================================="
echo ""

# Funcție pentru generarea de chei sigure de 64 caractere
generate_key() {
    openssl rand -base64 48 | tr -d "=+/" | cut -c1-64
}

# Generează toate cheile WordPress
AUTH_KEY=$(generate_key)
SECURE_AUTH_KEY=$(generate_key)
LOGGED_IN_KEY=$(generate_key)
NONCE_KEY=$(generate_key)
AUTH_SALT=$(generate_key)
SECURE_AUTH_SALT=$(generate_key)
LOGGED_IN_SALT=$(generate_key)
NONCE_SALT=$(generate_key)

echo "📋 Copiază aceste variabile în Railway Dashboard → Settings → Environment:"
echo ""
echo "# WordPress Security Keys"
echo "AUTH_KEY=$AUTH_KEY"
echo "SECURE_AUTH_KEY=$SECURE_AUTH_KEY"
echo "LOGGED_IN_KEY=$LOGGED_IN_KEY"
echo "NONCE_KEY=$NONCE_KEY"
echo "AUTH_SALT=$AUTH_SALT"
echo "SECURE_AUTH_SALT=$SECURE_AUTH_SALT"
echo "LOGGED_IN_SALT=$LOGGED_IN_SALT"
echo "NONCE_SALT=$NONCE_SALT"
echo ""
echo "# WordPress Configuration"
echo "WP_HOME=https://YOUR-APP-NAME.up.railway.app"
echo "WP_SITEURL=https://YOUR-APP-NAME.up.railway.app/wordpress"
echo "WP_DEBUG=false"
echo "WP_DEBUG_LOG=false"
echo ""
echo "# Database (va fi setat automat de Railway MySQL service)"
echo "DATABASE_URL=mysql://user:pass@host:port/database"
echo ""
echo "⚠️  IMPORTANT:"
echo "1. Înlocuiește 'YOUR-APP-NAME' cu numele real al aplicației Railway"
echo "2. DATABASE_URL va fi generat automat când adaugi MySQL service"
echo "3. Păstrează aceste chei în siguranță - nu le împărtăși niciodată!"
echo ""
echo "📖 Pentru instrucțiuni complete: vezi RAILWAY-DEPLOYMENT-GUIDE.md"