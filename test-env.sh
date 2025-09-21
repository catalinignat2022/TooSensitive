#!/bin/bash

# Test Local Environment Variables
# Acest script testează dacă toate variabilele necesare sunt setate corect

echo "🧪 Test Environment Variables pentru WordPress"
echo "============================================="
echo ""

# Lista variabilelor necesare
REQUIRED_VARS=(
    "AUTH_KEY"
    "SECURE_AUTH_KEY" 
    "LOGGED_IN_KEY"
    "NONCE_KEY"
    "AUTH_SALT"
    "SECURE_AUTH_SALT"
    "LOGGED_IN_SALT" 
    "NONCE_SALT"
    "WP_HOME"
    "WP_SITEURL"
    "DATABASE_URL"
)

missing_vars=()
present_vars=()

# Verifică fiecare variabilă
for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        missing_vars+=("$var")
    else
        present_vars+=("$var")
    fi
done

# Afișează rezultatele
echo "✅ Variabile setate (${#present_vars[@]}):"
for var in "${present_vars[@]}"; do
    value="${!var}"
    # Ascunde valorile sensibile, arată doar primele 10 caractere
    if [[ "$var" == *"KEY"* ]] || [[ "$var" == *"SALT"* ]]; then
        echo "   $var = ${value:0:10}..."
    else
        echo "   $var = $value"
    fi
done

echo ""
echo "❌ Variabile lipsă (${#missing_vars[@]}):"
for var in "${missing_vars[@]}"; do
    echo "   $var"
done

echo ""

if [ ${#missing_vars[@]} -eq 0 ]; then
    echo "🎉 Toate variabilele sunt setate corect!"
    echo "   Poți proceda cu deployment-ul pe Railway"
else
    echo "⚠️  ${#missing_vars[@]} variabile lipsesc"
    echo "   Rulează: ./generate-railway-env.sh"
    echo "   sau: ./railway-auto-deploy.sh"
fi

echo ""
echo "💡 Pentru a testa conexiunea la baza de date:"
echo "   php -r \"echo 'DB Connection: ' . (getenv('DATABASE_URL') ? 'OK' : 'MISSING') . PHP_EOL;\""