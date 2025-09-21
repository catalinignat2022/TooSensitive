# Railway Health Check Troubleshooting pentru TooSensitive

## Problema
Railway build-urile trec cu succes, dar health check-urile eșuează cu "service unavailable".

## Cause Posibile
1. **Apache nu pornește suficient de rapid** - Railway are timeout scurt pentru health checks
2. **WordPress încearcă să se conecteze la DB** - întârzie startup-ul
3. **Configurații Apache complexe** - module suplimentare întârzie pornirea
4. **Custom entrypoint scripts** - procesare suplimentară la startup

## Soluții Implementate

### 1. Dockerfile Ultra-Simplificat
```dockerfile
# Doar extensiile PHP esențiale
# Fără opcache, fără module Apache avansate
# Direct apache2-foreground (fără custom entrypoint)
```

### 2. WordPress Config Minimal
- `railway-wp-config-simple.php` - configurație minimă
- Fără verificări complexe de URL
- Fără environment variable processing avansat
- Debug complet oprit

### 3. Health Check Static
- `health-check.html` - pagină statică rapidă
- Nu necesită WordPress pentru a răspunde
- Test rapid pentru Apache

### 4. .dockerignore Optimizat
- Reduce mărimea context-ului de build
- Exclude fișiere nenecesare

## Testare Pas cu Pas

### Opțiunea 1: Test Health Check Static
```bash
# Testează dacă Apache răspunde rapid
curl -f https://your-railway-domain.railway.app/health-check.html
```

### Opțiunea 2: Test WordPress Minimal
```bash
# Testează dacă WordPress se încarcă
curl -f https://your-railway-domain.railway.app/
```

### Opțiunea 3: Railway Logs
```bash
# Monitorizează logs în timp real
railway logs --follow
```

## Debugging Local (Dacă Docker este instalat)

```bash
# Build local
docker build -t toosensitive-test .

# Run cu environment variables de test
docker run -d --name test-container -p 8080:80 \
  -e MYSQL_HOST="test" \
  -e MYSQL_DATABASE="wordpress" \
  -e MYSQL_USER="test" \
  -e MYSQL_PASSWORD="test" \
  toosensitive-test

# Test health check
curl -f http://localhost:8080/health-check.html

# Test WordPress
curl -f http://localhost:8080/

# Verifică logs
docker logs test-container

# Cleanup
docker stop test-container && docker rm test-container
```

## Railway CLI Debugging

```bash
# Verifică status proiect
railway status

# Verifică variabile de mediu
railway variables

# Deploy manual cu logging
railway up --detach

# Monitorizează deployment
railway logs --follow
```

## Următorii Pași

1. **Dacă health check static funcționează** - problema e în WordPress
2. **Dacă health check static nu funcționează** - problema e în Apache
3. **Dacă Apache pornește dar WordPress nu** - problema e în configurația DB

## Fallback Solutions

### Dacă totul eșuează:
1. **Railway health check pe `/health-check.html`** în loc de `/`
2. **Crește timeout-ul** în railway.json
3. **Folosește nginx** în loc de Apache
4. **Separă frontend static** de backend WordPress

## Monitoring și Logs

```bash
# Railway logs cu filtrare
railway logs --filter="error"
railway logs --filter="apache"
railway logs --filter="health"

# Check deployment status
railway status --json
```