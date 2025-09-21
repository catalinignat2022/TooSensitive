#!/bin/bash

# Railway Auto-Deploy Script pentru TooSensitive WordPress
# Acest script automatizează complet deployment-ul pe Railway

set -e  # Exit on any error

echo "🚀 Railway Auto-Deploy pentru TooSensitive WordPress"
echo "=================================================="
echo ""

# Verifică dacă Railway CLI este instalat
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI nu este instalat!"
    echo ""
    echo "Pentru a instala Railway CLI:"
    echo "npm install -g @railway/cli"
    echo "sau"
    echo "brew install railway"
    echo ""
    echo "După instalare, rulează: railway login"
    echo ""
    echo "Alternativ, folosește: ./generate-railway-env.sh"
    echo "și copiază manual variabilele în Railway Dashboard"
    exit 1
fi

# Verifică dacă utilizatorul este conectat la Railway
if ! railway whoami &> /dev/null; then
    echo "❌ Nu ești conectat la Railway!"
    echo "Rulează: railway login"
    exit 1
fi

echo "✅ Railway CLI detectat și conectat"
echo ""

# Funcție pentru generarea de chei sigure
generate_key() {
    openssl rand -base64 48 | tr -d "=+/" | cut -c1-64
}

echo "🔐 Generez chei de securitate WordPress..."

# Generează toate cheile WordPress
AUTH_KEY=$(generate_key)
SECURE_AUTH_KEY=$(generate_key)
LOGGED_IN_KEY=$(generate_key)
NONCE_KEY=$(generate_key)
AUTH_SALT=$(generate_key)
SECURE_AUTH_SALT=$(generate_key)
LOGGED_IN_SALT=$(generate_key)
NONCE_SALT=$(generate_key)

echo "✅ Chei generate cu succes"
echo ""

# Întreabă pentru numele proiectului
read -p "📝 Introdu numele proiectului Railway (sau apasă Enter pentru 'toosensitive'): " PROJECT_NAME
PROJECT_NAME=${PROJECT_NAME:-toosensitive}

# Întreabă pentru domeniul custom
read -p "🌐 Introdu domeniul custom (ex: rejectionsensitive.com) sau apasă Enter pentru skip: " CUSTOM_DOMAIN

# Calculează URL-urile
if [ ! -z "$CUSTOM_DOMAIN" ]; then
    WP_HOME="https://$CUSTOM_DOMAIN"
    WP_SITEURL="https://$CUSTOM_DOMAIN/wordpress"
else
    WP_HOME="https://$PROJECT_NAME.up.railway.app"
    WP_SITEURL="https://$PROJECT_NAME.up.railway.app/wordpress"
fi

echo ""
echo "🚀 Configurez proiectul Railway..."

# Creează sau conectează la proiectul Railway
railway project new $PROJECT_NAME 2>/dev/null || railway link $PROJECT_NAME 2>/dev/null || {
    echo "⚠️  Nu am putut crea/conecta proiectul automat"
    echo "Rulează manual: railway link"
    echo "Apoi rulează din nou acest script"
    exit 1
}

echo "✅ Proiect Railway conectat: $PROJECT_NAME"
echo ""

echo "🔧 Setez variabilele de mediu..."

# Setează toate variabilele de mediu
railway variables set AUTH_KEY="$AUTH_KEY"
railway variables set SECURE_AUTH_KEY="$SECURE_AUTH_KEY"
railway variables set LOGGED_IN_KEY="$LOGGED_IN_KEY"
railway variables set NONCE_KEY="$NONCE_KEY"
railway variables set AUTH_SALT="$AUTH_SALT"
railway variables set SECURE_AUTH_SALT="$SECURE_AUTH_SALT"
railway variables set LOGGED_IN_SALT="$LOGGED_IN_SALT"
railway variables set NONCE_SALT="$NONCE_SALT"
railway variables set WP_HOME="$WP_HOME"
railway variables set WP_SITEURL="$WP_SITEURL"
railway variables set WP_DEBUG="false"
railway variables set WP_DEBUG_LOG="false"

echo "✅ Variabile de mediu setate"
echo ""

echo "🗄️  Adaugă serviciul MySQL..."
railway add mysql || echo "⚠️  MySQL service poate fi deja adăugat"

echo ""
echo "🚀 Lansez deployment..."
railway up

echo ""
echo "🎉 DEPLOYMENT COMPLET!"
echo "================================"
echo ""
echo "🌐 Site-ul tău WordPress va fi disponibil la:"
echo "   $WP_HOME"
echo ""
echo "🔧 Admin WordPress:"
echo "   $WP_HOME/wordpress/wp-admin"
echo ""

if [ ! -z "$CUSTOM_DOMAIN" ]; then
    echo "🌍 Pentru domeniul custom ($CUSTOM_DOMAIN):"
    echo "   1. Mergi în Railway Dashboard → Settings → Domains"
    echo "   2. Adaugă custom domain: $CUSTOM_DOMAIN"
    echo "   3. Configurează CNAME în GoDaddy:"
    echo "      $CUSTOM_DOMAIN → <railway-generated-domain>"
    echo ""
fi

echo "📊 Pentru a vedea status-ul deployment-ului:"
echo "   railway logs"
echo ""
echo "📋 Pentru a vedea toate variabilele setate:"
echo "   railway variables"
echo ""
echo "📖 Pentru troubleshooting: vezi RAILWAY-DEPLOYMENT-GUIDE.md"