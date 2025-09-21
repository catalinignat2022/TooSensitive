# TooSensitive WordPress - Production Deployment Guide

## 🚀 Complete Production Deployment Instructions

### Pre-Deployment Checklist

✅ **WordPress Installation Ready**
- WordPress 6.8.2 with secure configuration
- Production-optimized theme with 7 custom page templates
- Security enhancements and performance optimizations
- Custom post types for testimonials and resources

### 1. Hosting Requirements

**Minimum Requirements:**
- PHP 8.0+ (recommended 8.4+)
- MySQL 8.0+ or MariaDB 10.6+
- Apache 2.4+ or Nginx 1.18+
- SSL Certificate (Let's Encrypt recommended)
- Memory: 512MB minimum, 1GB recommended
- Disk Space: 5GB minimum for growth

**Recommended Hosting Providers:**
- **SiteGround** - WordPress optimized hosting
- **WP Engine** - Managed WordPress hosting
- **Cloudways** - Cloud hosting with multiple providers
- **DigitalOcean** - VPS with WordPress droplet

### 2. Domain Setup

1. Purchase domain from registrar (Namecheap, GoDaddy, etc.)
2. Point DNS to hosting provider
3. Configure SSL certificate
4. Set up www vs non-www redirect

### 3. Database Setup

**On your hosting panel:**
```sql
CREATE DATABASE toosensitive_wp;
CREATE USER 'ts_user'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON toosensitive_wp.* TO 'ts_user'@'localhost';
FLUSH PRIVILEGES;
```

### 4. File Upload Process

**Via FTP/SFTP:**
1. Upload all files from `/wordpress/` directory to public_html
2. Upload `/toosensitive-theme/` to `/wp-content/themes/`
3. Set proper file permissions:
   - Folders: 755
   - Files: 644
   - wp-config.php: 600

**Via Hosting Panel File Manager:**
1. Zip the wordpress directory
2. Upload and extract in public_html
3. Move theme files to proper location

### 5. wp-config.php Production Settings

```php
<?php
// Database Configuration
define('DB_NAME', 'your_database_name');
define('DB_USER', 'your_database_user');
define('DB_PASSWORD', 'your_strong_password');
define('DB_HOST', 'localhost'); // or your host's DB server
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

// Security Keys (Generate at: https://api.wordpress.org/secret-key/1.1/salt/)
define('AUTH_KEY',         'put your unique phrase here');
define('SECURE_AUTH_KEY',  'put your unique phrase here');
define('LOGGED_IN_KEY',    'put your unique phrase here');
define('NONCE_KEY',        'put your unique phrase here');
define('AUTH_SALT',        'put your unique phrase here');
define('SECURE_AUTH_SALT', 'put your unique phrase here');
define('LOGGED_IN_SALT',   'put your unique phrase here');
define('NONCE_SALT',       'put your unique phrase here');

// Production Settings
$table_prefix = 'ts_';
define('WP_DEBUG', false);
define('DISALLOW_FILE_EDIT', true);
define('FORCE_SSL_ADMIN', true);
define('WP_MEMORY_LIMIT', '512M');

// Auto Updates
define('WP_AUTO_UPDATE_CORE', true);

// Security
define('DISALLOW_FILE_MODS', false); // Allow plugin updates

if ( ! defined( 'ABSPATH' ) ) {
    define( 'ABSPATH', __DIR__ . '/' );
}
require_once ABSPATH . 'wp-settings.php';
```

### 6. WordPress Installation

1. Go to `https://yourdomain.com/wp-admin/install.php`
2. Complete the 5-minute installation:
   - Site Title: "TooSensitive: RSD & Emotional Support"
   - Username: Choose secure admin username
   - Password: Use strong password
   - Email: Your admin email

### 7. Theme Activation & Setup

1. Login to WordPress admin
2. Go to Appearance > Themes
3. Activate "TooSensitive Theme"
4. Create the 7 main pages:
   - Home (set as homepage)
   - RSD Assessment
   - Education
   - Coping Strategies
   - Community
   - App Preview
   - About

### 8. Essential Plugins Installation

**Required Plugins:**
```
1. Yoast SEO - SEO optimization
2. W3 Total Cache - Performance
3. Wordfence Security - Security
4. Contact Form 7 - Forms
5. UpdraftPlus - Backups
6. WP Mail SMTP - Email delivery
```

### 9. SEO & Analytics Setup

**Yoast SEO Configuration:**
- Set up site title and tagline
- Configure social media links
- Set up XML sitemaps
- Add meta descriptions for all pages

**Google Analytics:**
- Create GA4 property
- Install tracking code
- Set up conversion goals

**Google Search Console:**
- Verify domain ownership
- Submit XML sitemap
- Monitor search performance

### 10. Email Configuration

**SMTP Setup (recommended):**
- Use WP Mail SMTP plugin
- Configure with Gmail, SendGrid, or Mailgun
- Test email delivery

### 11. Security Hardening

**File Permissions:**
```bash
find /path/to/wordpress/ -type d -exec chmod 755 {} \;
find /path/to/wordpress/ -type f -exec chmod 644 {} \;
chmod 600 wp-config.php
```

**.htaccess Security Rules:**
```apache
# Block access to sensitive files
<files wp-config.php>
order allow,deny
deny from all
</files>

# Block XML-RPC
<files xmlrpc.php>
order allow,deny
deny from all
</files>

# Hide WordPress version
RewriteRule ^wp-admin/includes/ - [F,L]
RewriteRule !^wp-includes/ - [S=3]
RewriteRule ^wp-includes/[^/]+\.php$ - [F,L]
RewriteRule ^wp-includes/js/tinymce/langs/.+\.php - [F,L]
RewriteRule ^wp-includes/theme-compat/ - [F,L]
```

### 12. Performance Optimization

**Caching Setup:**
- Enable W3 Total Cache
- Configure page caching
- Enable browser caching
- Set up CDN (Cloudflare recommended)

**Image Optimization:**
- Install image compression plugin
- Use WebP format when possible
- Optimize images before upload

### 13. Backup Strategy

**UpdraftPlus Configuration:**
- Schedule daily database backups
- Schedule weekly full backups
- Store backups on cloud storage (Google Drive, Dropbox)

### 14. Content Migration

**Pages to Create:**
1. **Homepage** - Use homepage.php template
2. **RSD Assessment** - Use page-assessment.php template
3. **Education** - Use page-education.php template
4. **Coping Strategies** - Use page-coping-strategies.php template
5. **Community** - Use page-community.php template
6. **App Preview** - Use page-app-preview.php template
7. **About** - Use page-about.php template

**Additional Pages:**
- Privacy Policy
- Terms of Service
- Contact
- FAQ

### 15. Testing Checklist

**Functionality Tests:**
- [ ] All 7 pages load correctly
- [ ] RSD Assessment form submits
- [ ] Email signup forms work
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility
- [ ] Page loading speed (aim for <3 seconds)
- [ ] SSL certificate working
- [ ] Contact forms deliver emails

### 16. Launch Checklist

**Pre-Launch:**
- [ ] All content reviewed and approved
- [ ] SEO meta data added to all pages
- [ ] Analytics tracking installed
- [ ] Backup system tested
- [ ] Security scan completed
- [ ] Performance optimization done

**Launch Day:**
- [ ] DNS propagation complete
- [ ] SSL certificate active
- [ ] All forms tested on live site
- [ ] Submit sitemap to Google
- [ ] Announce launch on social media

### 17. Post-Launch Maintenance

**Weekly Tasks:**
- Review analytics data
- Check backup logs
- Update plugins/themes
- Monitor site speed

**Monthly Tasks:**
- Security scan
- Content updates
- SEO performance review
- Database optimization

### 18. Support & Resources

**Documentation:**
- WordPress Codex: https://codex.wordpress.org/
- Theme documentation included in `/docs/` folder
- Support email: support@toosensitive.org

**Emergency Contacts:**
- Hosting provider support
- Developer contact information
- Backup restoration guides

---

## 🎯 Quick Deployment Commands

**For experienced users, here's the rapid deployment process:**

```bash
# 1. Create database and user
mysql -u root -p -e "CREATE DATABASE toosensitive_wp; CREATE USER 'ts_user'@'localhost' IDENTIFIED BY 'PASSWORD'; GRANT ALL PRIVILEGES ON toosensitive_wp.* TO 'ts_user'@'localhost';"

# 2. Upload files to server
rsync -avz wordpress/ user@server:/path/to/public_html/

# 3. Set permissions
find /path/to/public_html/ -type d -exec chmod 755 {} \;
find /path/to/public_html/ -type f -exec chmod 644 {} \;
chmod 600 /path/to/public_html/wp-config.php

# 4. Complete WordPress installation via web interface
# 5. Activate theme and configure settings
```

---

**🚀 Your TooSensitive website is now ready for production!**

The theme includes all necessary functionality for RSD support, community features, and professional presentation. All templates are optimized for performance and SEO.