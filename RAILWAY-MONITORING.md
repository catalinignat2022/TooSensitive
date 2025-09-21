# Quick Railway Monitoring Commands

## 🚀 Deployment Status
```bash
# Verifică status proiect
railway status

# Monitorizează logs în timp real
railway logs --follow

# Verifică deployment-ul curent
railway ps
```

## 🔍 Health Check Testing

### După deployment, testează:
1. **Health check endpoint**: https://your-app.railway.app/health-check.php
2. **Static fallback**: https://your-app.railway.app/health-check.html  
3. **WordPress homepage**: https://your-app.railway.app/

### Comenzi test rapide:
```bash
# Test health check PHP
curl -f https://your-app.railway.app/health-check.php

# Test cu headers
curl -I https://your-app.railway.app/health-check.php

# Test WordPress
curl -f https://your-app.railway.app/
```

## 📊 Diagnostics

### Dacă health check încă eșuează:
```bash
# Verifică logs pentru erori Apache
railway logs --filter="apache"

# Verifică logs pentru erori PHP
railway logs --filter="php"

# Verifică startup process
railway logs --filter="start"
```

### Următorii pași de debugging:
1. **Health check reușește** → WordPress e problema
2. **Health check eșuează** → Apache/PHP e problema
3. **Container nu pornește** → Dockerfile e problema

## 🔧 Fallback Options

Dacă `/health-check.php` eșuează, schimbă în `railway.json`:
```json
"healthcheckPath": "/health-check.html"
```

Dacă ambele eșuează, problema e în Apache startup.

## ⚡ Quick Deploy
```bash
# Push direct la Railway (fără GitHub)
railway up --detach

# Sau rebuild forțat
railway redeploy
```