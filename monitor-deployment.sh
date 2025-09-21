#!/bin/bash

echo "🚀 Railway Deployment Monitor pentru TooSensitive"
echo "================================================"

RAILWAY_URL="https://r2y974z6.up.railway.app"

echo "⏰ $(date): Starting monitoring..."
echo ""

# Function to test endpoint
test_endpoint() {
    local url=$1
    local name=$2
    
    if curl -f -s "$url" > /dev/null; then
        echo "✅ $name - ACCESSIBLE"
        return 0
    else
        echo "❌ $name - NOT ACCESSIBLE"
        return 1
    fi
}

# Function to check HTTP status
check_status() {
    local url=$1
    local name=$2
    
    status=$(curl -o /dev/null -s -w "%{http_code}" "$url")
    echo "📊 $name - HTTP Status: $status"
}

echo "🔍 Testing endpoints every 30 seconds..."
echo "Press Ctrl+C to stop monitoring"
echo ""

while true; do
    echo "⏰ $(date '+%H:%M:%S')"
    echo "────────────────────────────────"
    
    # Test main endpoints
    test_endpoint "$RAILWAY_URL/" "Main Site"
    test_endpoint "$RAILWAY_URL/health-check.php" "Health Check PHP"
    test_endpoint "$RAILWAY_URL/health-check.html" "Health Check HTML"
    
    echo ""
    
    # Get HTTP status codes
    check_status "$RAILWAY_URL/" "Main Site"
    check_status "$RAILWAY_URL/health-check.php" "Health Check PHP"
    
    echo ""
    echo "📡 Next check in 30 seconds..."
    echo "════════════════════════════════════════════════"
    echo ""
    
    sleep 30
done