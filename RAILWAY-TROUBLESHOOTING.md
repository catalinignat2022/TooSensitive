# Railway Deployment Troubleshooting Guide

## 🚨 Common Issues și Solutions

### 1. Apache ServerName Warning (RESOLVED ✅)
**Error:** `AH00558: apache2: Could not reliably determine the server's fully qualified domain name`

**Solution Applied:**
- ✅ Added `ServerName localhost` to apache2.conf
- ✅ Created dynamic ServerName using RAILWAY_PUBLIC_DOMAIN
- ✅ Added docker-entrypoint.sh for environment setup
- ✅ Included railway-specific Apache configuration

### 2. Database Connection Issues
**Symptoms:** WordPress can't connect to MySQL

**Solutions:**
```bash
# Check environment variables in Railway dashboard
railway variables

# Verify these variables exist:
MYSQL_HOST
MYSQL_USER  
MYSQL_PASSWORD
MYSQL_DATABASE
```

**Auto-fix:** Our docker-entrypoint.sh now waits for database connection

### 3. WordPress Not Loading
**Symptoms:** Container starts but site shows errors

**Check List:**
- ✅ Verify WP_HOME and WP_SITEURL are set correctly
- ✅ Check file permissions (handled in Dockerfile)
- ✅ Ensure uploads directory exists (auto-created)

### 4. HTTPS/SSL Issues
**Symptoms:** Mixed content warnings, redirect loops

**Auto-configured in railway-wp-config.php:**
- ✅ Force SSL in production
- ✅ Trust Railway proxy headers
- ✅ Proper HTTPS detection

### 5. Performance Issues
**Solutions applied:**
- ✅ OpCache enabled
- ✅ Apache compression (deflate)
- ✅ Static file caching headers
- ✅ Optimized PHP settings

## 🔧 Quick Fixes

### Re-deploy with Latest Fixes
```bash
# If you have issues, redeploy with latest fixes:
git pull origin main
railway up
```

### Check Logs
```bash
# Railway deployment logs
railway logs

# Follow live logs
railway logs --follow
```

### Environment Variables Check
```bash
# List all variables
railway variables

# Add missing variable
railway variables set VARIABLE_NAME=value
```

### Force Redeploy
```bash
# Trigger new deployment
railway up --detach

# Or via Railway Dashboard:
# Project → Deployments → Deploy Latest
```

## 📊 Health Checks

### Container Health
```bash
# Check if container is running
railway status

# Check specific service
railway logs --service=web
```

### WordPress Health
After deployment, check:
1. **Homepage:** https://your-app.up.railway.app
2. **Admin:** https://your-app.up.railway.app/wp-admin
3. **Health endpoint:** Container includes health check

### Database Health
```bash
# Test database connection (in Railway terminal)
railway run mysqladmin ping -h$MYSQL_HOST
```

## 🎯 Expected Behavior After Fix

### Successful Deployment Should Show:
```
🚀 Starting TooSensitive WordPress on Railway...
🌐 Apache ServerName: your-app.up.railway.app
🔧 Environment: production
📁 WordPress uploads directory ready
🗄️  Waiting for database connection...
✅ Database connection successful
🔧 Configuring Apache...
🚀 Starting Apache...
```

### No More Error Messages:
- ❌ ~~AH00558: apache2: Could not reliably determine the server's FQDN~~
- ✅ Clean Apache startup
- ✅ WordPress loads without issues

## 🚀 Next Steps After Successful Deployment

1. **Configure Custom Domain:**
   - Railway Dashboard → Settings → Domains
   - Add: rejectionsensitive.com
   - Update GoDaddy CNAME

2. **WordPress Setup:**
   - Visit /wp-admin
   - Complete WordPress installation
   - Activate theme and plugins

3. **SSL Certificate:**
   - Railway auto-provisions SSL
   - Should work immediately

## 📞 Support

If issues persist:
1. Check Railway logs: `railway logs`
2. Verify all environment variables are set
3. Try force redeploy: `railway up`
4. Check this troubleshooting guide for common issues