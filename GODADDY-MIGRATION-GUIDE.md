# GoDaddy WordPress Hosting Setup Guide pentru TooSensitive

## 🎯 Overview
Migrare de la Railway la GoDaddy hosting pentru mai multă stabilitate și configurare simplificată.

## 📋 Checklist Setup GoDaddy

### 1. 🔐 Acces la GoDaddy Hosting
- [ ] Verifică că hosting-ul este activ în GoDaddy panel
- [ ] Obține detaliile FTP/SFTP din hosting control panel
- [ ] Obține detaliile bazei de date MySQL

### 2. 📁 Pregătirea Fișierelor WordPress
Fișierele din directorul `wordpress/` trebuie uploadate pe server:

```bash
# Fișierele principale care trebuie uploadate:
wordpress/
├── index.php
├── wp-config.php (va fi modificat pentru GoDaddy)
├── wp-admin/
├── wp-content/
├── wp-includes/
└── toate celelalte fișiere WordPress
```

### 3. 🗄️ Configurare Baza de Date
GoDaddy oferă MySQL database. Ai nevoie de:
- Database name
- Database username  
- Database password
- Database host (usually localhost sau un hostname specific)

### 4. ⚙️ Configurare wp-config.php pentru GoDaddy
Creez versiune optimizată pentru GoDaddy hosting.

## 🚀 Pași de Implementare

### Pasul 1: Obține Detaliile Hosting
În GoDaddy hosting panel:
1. **Hosting Dashboard** → **Databases** → **MySQL** 
2. Notează: DB name, username, password, host
3. **Hosting Dashboard** → **File Manager** sau **FTP/SFTP details**

### Pasul 2: Upload Fișiere
**Opțiuni:**
- **File Manager** în GoDaddy (recomandat pentru început)
- **FTP/SFTP client** (FileZilla, Cyberduck)
- **ZIP upload** și extract pe server

### Pasul 3: Configurare WordPress
- Modifică wp-config.php cu detaliile GoDaddy
- Testează conexiunea la baza de date
- Rulează WordPress installer dacă necesar

## 🔧 Tools și Scripts Utile

### Upload Helper Script
Creez script pentru pregătirea fișierelor de upload.

### GoDaddy wp-config Template  
Versiune optimizată pentru hosting GoDaddy.

### Testing Script
Pentru verificarea funcționării după deploy.

## ⚡ Avantaje GoDaddy vs Railway

**✅ GoDaddy Pro:**
- Hosting managed WordPress optimizat
- Baza de date MySQL inclusă
- SSL certificate inclus
- Support 24/7
- Interface familiară
- Backup automat
- Mai puține probleme cu health checks

**📊 Performance:**
- Loading times mai predictibile
- Fără container startup delays
- Conexiune directă la DB

## 🌐 Domain Configuration
Domeniul `rejectionsensitive.com` va pointa automat la hosting-ul GoDaddy - mult mai simplu!

## 📝 Next Steps
1. Obține detaliile hosting din GoDaddy panel
2. Creez wp-config pentru GoDaddy
3. Pregătesc fișierele pentru upload
4. Upload și testare

---
**Nota:** Toate experien​ța de la Railway (WordPress optimization, Yoast SEO fix) se aplică și pe GoDaddy!