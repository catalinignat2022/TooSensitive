# 🚀 Ghid Deployment TooSensitive pe Railway.com

## Domeniu: rejectionsensitive.com
## Name Servers: ns07.domaincontrol.com, ns08.domaincontrol.com

---

## 📋 PASUL 1: Pregătire Proiect

### 1.1 Verifică fișierele create:
- ✅ `Dockerfile` - Container-ul WordPress
- ✅ `railway-wp-config.php` - Configurație Railway
- ✅ `railway.json` - Setări deployment
- ✅ `docker-compose.yml` - Pentru testare locală

### 1.2 Exportă baza de date:
```bash
cd /Users/catalin-2/Programming/TooSensitive/wordpress
wp db export toosensitive-database.sql
```

---

## 📋 PASUL 2: Setup Railway.com

### 2.1 Creează cont și proiect:
1. Du-te pe **railway.app**
2. Sign up cu GitHub
3. Click **"New Project"**
4. Selectează **"Empty Project"**

### 2.2 Conectează GitHub repo:
1. Push codul tău pe GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - TooSensitive WordPress"
   git branch -M main
   git remote add origin [URL-ul repo-ului tău]
   git push -u origin main
   ```

2. În Railway: **"Deploy from GitHub repo"**
3. Selectează repo-ul tău

---

## 📋 PASUL 3: Configurează Baza de Date

### 3.1 Adaugă serviciul MySQL:
1. În proiectul Railway, click **"+ New"**
2. Selectează **"Database" → "MySQL"**
3. Railway va crea automat o instanță MySQL

### 3.2 Notează credențialele:
- Mergi la serviciul MySQL
- Tab **"Variables"** - copiază:
  - `MYSQL_HOST`
  - `MYSQL_USER` 
  - `MYSQL_PASSWORD`
  - `MYSQL_DATABASE`

---

## 📋 PASUL 4: Configurează Environment Variables

### 4.1 În serviciul WordPress (nu MySQL):
Mergi la **"Variables"** și adaugă:

**Database Variables:**
```
MYSQL_HOST=mysql.railway.internal
MYSQL_USER=[copiază din serviciul MySQL]
MYSQL_PASSWORD=[copiază din serviciul MySQL]
MYSQL_DATABASE=[copiază din serviciul MySQL]
DB_TABLE_PREFIX=ts_
```

**WordPress Security Keys:**
```
AUTH_KEY=B#x&K$9mN@pQ2wE*F!gH3jL6vC8sA5dR7tY4uI1oP0qW9eM^zX%cV&nB#m@kJ!hG
SECURE_AUTH_KEY=P3wE*F!gH6jL9vC2sA5dR8tY1uI4oQ7qW0eM^zX%cV&nB#m@kJ!hG3bL6xK$9mN@
LOGGED_IN_KEY=F!gH9jL2vC5sA8dR1tY4uI7oQ0qW3eM^zX%cV&nB#m@kJ!hG6bL9xK$2mN@pP5wE
NONCE_KEY=L2vC5sA8dR1tY4uI7oQ0qW3eM^zX%cV&nB#m@kJ!hG6bL9xK$2mN@pP5wE*F!gH9
AUTH_SALT=sA8dR1tY4uI7oQ0qW3eM^zX%cV&nB#m@kJ!hG6bL9xK$2mN@pP5wE*F!gH9jL2vC
SECURE_AUTH_SALT=Y4uI7oQ0qW3eM^zX%cV&nB#m@kJ!hG6bL9xK$2mN@pP5wE*F!gH9jL2vC5sA8dR1
LOGGED_IN_SALT=oQ0qW3eM^zX%cV&nB#m@kJ!hG6bL9xK$2mN@pP5wE*F!gH9jL2vC5sA8dR1tY4uI
NONCE_SALT=M^zX%cV&nB#m@kJ!hG6bL9xK$2mN@pP5wE*F!gH9jL2vC5sA8dR1tY4uI7oQ0qW3
```

**Other Settings:**
```
RAILWAY_ENVIRONMENT=production
WP_DEBUG=false
WP_MEMORY_LIMIT=512M
```

---

## 📋 PASUL 5: Deploy și Test

### 5.1 Trigger Deploy:
1. Railway va face deploy automat la push pe GitHub
2. Sau click **"Deploy"** manual în interfață
3. Urmărește logurile în tab **"Deploy"**

### 5.2 Testează deployment:
1. După deploy, copiază Railway URL-ul (ex: `yourapp-production.up.railway.app`)
2. Deschide URL-ul în browser
3. Dacă vezi setup-ul WordPress, e perfect!

---

## 📋 PASUL 6: Importă Baza de Date

### 6.1 Conectează-te la MySQL:
1. În Railway, serviciul MySQL → **"Query"**
2. Sau folosește un client MySQL cu credențialele Railway

### 6.2 Importă datele:
1. Upload fișierul `toosensitive-database.sql`
2. Sau copiază conținutul și execută

### 6.3 Actualizează URL-urile:
```sql
UPDATE ts_options SET option_value = 'https://rejectionsensitive.com' WHERE option_name = 'home';
UPDATE ts_options SET option_value = 'https://rejectionsensitive.com' WHERE option_name = 'siteurl';
```

---

## 📋 PASUL 7: Configurează Domeniul rejectionsensitive.com

### 7.1 În Railway:
1. Serviciul WordPress → **"Settings" → "Domains"**
2. Click **"Custom Domain"**
3. Adaugă: `rejectionsensitive.com`
4. Adaugă și: `www.rejectionsensitive.com`

### 7.2 Railway îți va da niște DNS records, ceva de genul:
```
Type: CNAME
Name: rejectionsensitive.com
Value: yourapp-production.up.railway.app

Type: CNAME  
Name: www
Value: yourapp-production.up.railway.app
```

### 7.3 În GoDaddy DNS Management:
1. Login pe godaddy.com
2. **"My Products" → domeniul tău → "Manage DNS"**
3. Șterge record-urile existente pentru @ și www
4. Adaugă record-urile de la Railway:

```
Type: CNAME
Name: @
Value: yourapp-production.up.railway.app
TTL: 1 Hour

Type: CNAME
Name: www  
Value: yourapp-production.up.railway.app
TTL: 1 Hour
```

---

## 📋 PASUL 8: Verificare și SSL

### 8.1 Așteaptă propagarea DNS (10-30 minute)
### 8.2 Testează:
- `https://rejectionsensitive.com`
- `https://www.rejectionsensitive.com`

### 8.3 SSL e automat pe Railway! 🎉

---

## 🆘 Depanare Probleme Comune

### ❌ "Error establishing database connection"
**Soluție:** Verifică variabilele MySQL în Railway

### ❌ Site-ul arată URL-uri greșite
**Soluție:** Actualizează baza de date cu SQL-ul de mai sus

### ❌ Domeniul nu funcționează
**Soluție:** Verifică DNS records în GoDaddy

### ❌ Permisiuni fișiere
**Soluție:** Railway gestionează automat, nu e problemă

---

## 💰 Costuri Railway

- **Hobby Plan:** $5/lună pentru proiect
- **MySQL Database:** $5/lună 
- **Total:** ~$10/lună pentru site complet

---

## 📞 Support

Dacă te blochezi la orice pas, trimite-mi screenshot cu eroarea și îți zic exact ce să faci!