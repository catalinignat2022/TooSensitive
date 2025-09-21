#!/bin/bash

# Check Railway CLI Installation și Setup
echo "🔍 Railway CLI Status Check"
echo "=========================="
echo ""

# Check if Railway CLI is installed
if command -v railway &> /dev/null; then
    echo "✅ Railway CLI este instalat"
    
    # Check version
    RAILWAY_VERSION=$(railway --version 2>/dev/null || echo "latest")
    echo "📦 Versiune: $RAILWAY_VERSION"
    echo ""
    
    # Check if logged in
    if railway whoami &> /dev/null; then
        echo "✅ Conectat la Railway ca: $(railway whoami 2>/dev/null)"
        echo ""
        echo "🚀 Gata pentru deployment automat!"
        echo "   Rulează: ./railway-auto-deploy.sh"
    else
        echo "❌ Nu ești conectat la Railway"
        echo "   Rulează: railway login"
    fi
else
    echo "❌ Railway CLI nu este instalat"
    echo ""
    echo "📥 Pentru a instala Railway CLI:"
    echo ""
    echo "npm:"
    echo "   npm install -g @railway/cli"
    echo ""
    echo "Homebrew (macOS):"
    echo "   brew install railway"
    echo ""
    echo "Manual download:"
    echo "   https://docs.railway.app/quick-start"
    echo ""
    echo "După instalare:"
    echo "   railway login"
    echo "   ./railway-auto-deploy.sh"
fi

echo ""
echo "📖 Alternative:"
echo "   ./generate-railway-env.sh  (manual setup)"
echo "   ./test-env.sh              (test configuration)"