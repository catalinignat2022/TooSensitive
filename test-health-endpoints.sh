#!/bin/bash

echo "🔍 Test Health Check Endpoints"
echo "============================="

# URL-ul Railway (trebuie actualizat cu URL-ul real)
RAILWAY_URL="https://toosensitive-production.up.railway.app"

echo "🌐 Testez endpoint-urile de health check..."

echo ""
echo "1. Test health-check.html (static):"
if curl -f -s "${RAILWAY_URL}/health-check.html" > /dev/null; then
    echo "✅ health-check.html - SUCCES"
else
    echo "❌ health-check.html - EȘUAT"
fi

echo ""
echo "2. Test health-check.php (PHP):"
if curl -f -s "${RAILWAY_URL}/health-check.php" > /dev/null; then
    echo "✅ health-check.php - SUCCES"
    echo "Răspuns:"
    curl -s "${RAILWAY_URL}/health-check.php" | head -20
else
    echo "❌ health-check.php - EȘUAT"
fi

echo ""
echo "3. Test homepage WordPress (/):"
if curl -f -s "${RAILWAY_URL}/" > /dev/null; then
    echo "✅ WordPress homepage - SUCCES"
else
    echo "❌ WordPress homepage - EȘUAT"
fi

echo ""
echo "📊 Informații response headers:"
echo "health-check.php headers:"
curl -I -s "${RAILWAY_URL}/health-check.php" 2>/dev/null | head -10

echo ""
echo "🔧 Pentru debugging Railway:"
echo "railway logs --follow"
echo "railway status"