#!/bin/bash

echo "🔍 Railway Debugging Script pentru TooSensitive"
echo "==============================================="

# Verifică dacă Railway CLI este disponibil
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI nu este instalat"
    echo "Rulează: curl -fsSL https://railway.app/install.sh | sh"
    exit 1
fi

echo "✅ Railway CLI detectat"

# Verifică dacă suntem conectați la un proiect
if ! railway status &> /dev/null; then
    echo "❌ Nu ești conectat la un proiect Railway"
    echo "Rulează: railway link"
    exit 1
fi

echo "✅ Conectat la proiect Railway"

# Afișează variabilele de mediu
echo ""
echo "🔧 Variabile de mediu Railway:"
railway variables

# Testează build-ul local cu Docker
echo ""
echo "🐳 Testez build-ul Docker local..."
if docker build -t toosensitive-debug .; then
    echo "✅ Build Docker reușit"
    
    # Rulează containerul local pentru test
    echo ""
    echo "🚀 Rulează containerul local pe port 8080..."
    echo "Apasă Ctrl+C pentru a opri testul"
    
    # Oprește containerul dacă rulează deja
    docker stop toosensitive-debug-test 2>/dev/null || true
    docker rm toosensitive-debug-test 2>/dev/null || true
    
    # Rulează containerul în background
    if docker run -d --name toosensitive-debug-test -p 8080:80 \
        -e MYSQL_HOST="test" \
        -e MYSQL_DATABASE="wordpress" \
        -e MYSQL_USER="test" \
        -e MYSQL_PASSWORD="test" \
        -e WORDPRESS_DB_HOST="test" \
        -e WORDPRESS_DB_NAME="wordpress" \
        -e WORDPRESS_DB_USER="test" \
        -e WORDPRESS_DB_PASSWORD="test" \
        toosensitive-debug; then
        
        echo "✅ Container pornit cu succes"
        echo ""
        echo "📊 Așteptez 10 secunde pentru pornirea Apache..."
        sleep 10
        
        # Testează dacă serverul răspunde
        echo "🌐 Testez răspunsul HTTP..."
        if curl -f http://localhost:8080/ -o /dev/null -s; then
            echo "✅ Serverul răspunde pe http://localhost:8080/"
            echo "📋 Logs container:"
            docker logs toosensitive-debug-test --tail 20
        else
            echo "❌ Serverul nu răspunde"
            echo "📋 Logs container (ultimele 50 linii):"
            docker logs toosensitive-debug-test --tail 50
        fi
        
        # Cleanup
        echo ""
        echo "🧹 Curăț containerul de test..."
        docker stop toosensitive-debug-test
        docker rm toosensitive-debug-test
        
    else
        echo "❌ Eroare la pornirea containerului"
    fi
    
else
    echo "❌ Build Docker eșuat"
    exit 1
fi

echo ""
echo "🚀 Pentru deploy pe Railway, rulează:"
echo "railway up --detach"
echo ""
echo "📊 Pentru monitorizare logs:"
echo "railway logs --follow"