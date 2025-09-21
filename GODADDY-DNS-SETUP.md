# Configurare DNS GoDaddy pentru Railway

## Problema Văzută
- Încerci să adaugi CNAME record cu valoarea `r2y974z6.up.railway.app`
- GoDaddy arată eroarea "Record data is invalid"

## Soluții

### Opțiunea 1: CNAME pentru subdomenii (Recomandat)
Pentru `www.rejectionsensitive.com`:
```
Type: CNAME
Name: www
Value: r2y974z6.up.railway.app
TTL: 1 Hour
```

### Opțiunea 2: A Records pentru domeniul principal
Pentru `rejectionsensitive.com` (root domain):

**Pasul 1:** Găsește IP-ul Railway
```bash
# Rulează în terminal
nslookup r2y974z6.up.railway.app
# sau
dig r2y974z6.up.railway.app
```

**Pasul 2:** Adaugă A Record
```
Type: A
Name: @
Value: [IP-ul găsit]
TTL: 1 Hour
```

**Pasul 3:** Adaugă CNAME pentru www
```
Type: CNAME
Name: www
Value: r2y974z6.up.railway.app
TTL: 1 Hour
```

### Opțiunea 3: ALIAS/ANAME (Dacă GoDaddy suportă)
```
Type: ALIAS (sau ANAME)
Name: @
Value: r2y974z6.up.railway.app
TTL: 1 Hour
```

## Configurare Corectă GoDaddy

### Pentru domeniul principal (rejectionsensitive.com):
1. **Șterge** recordul CNAME current
2. **Adaugă A Record:**
   - Type: `A`
   - Name: `@` (pentru root domain)
   - Value: `[IP Railway]`
   - TTL: `1 Hour`

### Pentru www subdomain:
1. **Adaugă CNAME:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `r2y974z6.up.railway.app`
   - TTL: `1 Hour`

## Debugging Common Issues

### Eroare "Record data is invalid"
**Cauze posibile:**
1. **CNAME pe root domain** - Nu este permis. Folosește A Record.
2. **Format incorect** - Asigură-te că nu adaugi `https://` în Value
3. **Trailing dot** - Unele sisteme DNS necesită punct la final: `r2y974z6.up.railway.app.`

### Soluții:
- **Nu adăuga** `https://` în Value field
- **Folosește doar** hostname-ul: `r2y974z6.up.railway.app`
- **Pentru root domain** folosește A Record cu IP-ul
- **Pentru subdomenii** folosește CNAME

## Verificare După Configurare

```bash
# Test DNS propagation
nslookup rejectionsensitive.com
nslookup www.rejectionsensitive.com

# Test online
# https://whatsmydns.net/#A/rejectionsensitive.com
# https://whatsmydns.net/#CNAME/www.rejectionsensitive.com
```

## Railway Domain Configuration

După configurarea DNS, în Railway:
1. Mergi la Project Settings
2. Adaugă custom domain: `rejectionsensitive.com`
3. Adaugă și: `www.rejectionsensitive.com`
4. Railway va genera SSL certificate automat

## Timpul de Propagare
- **DNS changes:** 1-24 ore
- **SSL certificate:** 1-5 minute după verificarea DNS