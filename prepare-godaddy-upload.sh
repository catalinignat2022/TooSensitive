#!/bin/bash

echo "📦 TooSensitive - GoDaddy Hosting Upload Preparation"
echo "=================================================="

# Crează directorul pentru upload
UPLOAD_DIR="godaddy-upload"
WORDPRESS_DIR="wordpress"

echo "🗂️  Pregătesc fișierele pentru upload la GoDaddy..."

# Șterge directorul anterior dacă există
if [ -d "$UPLOAD_DIR" ]; then
    echo "🧹 Șterg directorul anterior..."
    rm -rf "$UPLOAD_DIR"
fi

# Creează directorul de upload
mkdir -p "$UPLOAD_DIR"

echo "📁 Copiez fișierele WordPress..."

# Copiază toate fișierele WordPress
cp -r "$WORDPRESS_DIR"/* "$UPLOAD_DIR"/

# Înlocuiește wp-config.php cu versiunea pentru GoDaddy
echo "⚙️  Configurez wp-config pentru GoDaddy..."
cp godaddy-wp-config.php "$UPLOAD_DIR"/wp-config.php

# Copiază theme-ul custom
echo "🎨 Copiez theme-ul TooSensitive..."
if [ -d "toosensitive-theme" ]; then
    cp -r toosensitive-theme "$UPLOAD_DIR"/wp-content/themes/
fi

# Copiază imaginile articolelor
echo "🖼️  Copiez imaginile..."
if [ -d "article-images" ]; then
    mkdir -p "$UPLOAD_DIR"/wp-content/uploads/article-images
    cp -r article-images/* "$UPLOAD_DIR"/wp-content/uploads/article-images/
fi

# Setează permisiuni corecte
echo "🔒 Setez permisiunile..."
find "$UPLOAD_DIR" -type d -exec chmod 755 {} \;
find "$UPLOAD_DIR" -type f -exec chmod 644 {} \;

# Creează un arhivă ZIP pentru upload ușor
echo "📦 Creez arhiva ZIP..."
zip -r "toosensitive-godaddy.zip" "$UPLOAD_DIR"

echo ""
echo "✅ PREGĂTIRE COMPLETĂ!"
echo "======================"
echo ""
echo "📁 Fișiere pregătite în: $UPLOAD_DIR/"
echo "📦 Arhivă ZIP creată: toosensitive-godaddy.zip"
echo ""
echo "📋 URMĂTORII PAȘI:"
echo "1. Logează-te în GoDaddy hosting panel"
echo "2. Găsește detaliile bazei de date MySQL"
echo "3. Editează wp-config.php cu detaliile corecte"
echo "4. Upload fișierele via File Manager sau FTP"
echo "5. Rulează WordPress installer dacă necesar"
echo ""
echo "🔧 CONFIGURARE wp-config.php:"
echo "- Editează $UPLOAD_DIR/wp-config.php"
echo "- Înlocuiește DB_NAME, DB_USER, DB_PASSWORD, DB_HOST"
echo "- Generează chei noi pe: https://api.wordpress.org/secret-key/1.1/salt/"
echo ""
echo "🌐 După upload, site-ul va fi disponibil la:"
echo "   https://rejectionsensitive.com"

# Informații suplimentare
echo ""
echo "💡 TIPS pentru GoDaddy:"
echo "- Folosește File Manager pentru upload simplu"
echo "- Extractează ZIP-ul direct pe server"
echo "- Verifică că fișierele sunt în public_html/"
echo "- SSL certificate se activează automat"
echo ""
echo "🎯 Toate optimizările Yoast SEO sunt incluse!"