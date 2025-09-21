#!/bin/bash

echo "🌐 GoDaddy DNS Configuration Quick Guide"
echo "========================================"

RAILWAY_HOST="r2y974z6.up.railway.app"
DOMAIN="rejectionsensitive.com"
RAILWAY_IP="66.33.22.48"

echo ""
echo "📍 Railway Details:"
echo "   Hostname: ${RAILWAY_HOST}"
echo "   IP Address: ${RAILWAY_IP}"
echo ""

echo "🔧 GoDaddy DNS Records to Add:"
echo ""
echo "1. Pentru domeniul principal (${DOMAIN}):"
echo "   Type: A"
echo "   Name: @"
echo "   Value: ${RAILWAY_IP}"
echo "   TTL: 1 Hour"
echo ""

echo "2. Pentru www.${DOMAIN}:"
echo "   Type: CNAME"
echo "   Name: www"
echo "   Value: ${RAILWAY_HOST}"
echo "   TTL: 1 Hour"
echo ""

echo "🚫 Șterge orice record CNAME existent pentru @ (root domain)"
echo ""

echo "⏱️  Timp estimat propagare DNS: 1-24 ore"
echo ""

echo "🧪 Test DNS după configurare:"
echo "   nslookup ${DOMAIN}"
echo "   nslookup www.${DOMAIN}"
echo ""

echo "🌍 Test online propagare:"
echo "   https://whatsmydns.net/#A/${DOMAIN}"
echo "   https://whatsmydns.net/#CNAME/www.${DOMAIN}"

echo ""
echo "✅ După configurarea DNS, adaugă în Railway:"
echo "   - Custom domain: ${DOMAIN}"
echo "   - Custom domain: www.${DOMAIN}"