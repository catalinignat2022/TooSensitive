# Google Analytics & Search Console Setup Guide

## Required Steps for SEO Monitoring

### 1. Google Analytics 4 Setup

1. **Create GA4 Property:**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new property for your website
   - Get your Measurement ID (format: G-XXXXXXXXXX)

2. **Update Analytics Code:**
   - Edit `/inc/analytics-seo.php`
   - Replace `'G-XXXXXXXXXX'` with your actual Measurement ID on line 10

### 2. Google Search Console Setup

1. **Add Your Website:**
   - Go to [Google Search Console](https://search.google.com/search-console/)
   - Add property for your domain
   - Get verification meta tag

2. **Update Verification Code:**
   - Edit `/inc/analytics-seo.php`
   - Replace `'your-search-console-verification-code'` with actual code on line 31

### 3. Bing Webmaster Tools (Optional)

1. **Register Website:**
   - Go to [Bing Webmaster Tools](https://www.bing.com/webmasters/)
   - Add your site and get verification code

2. **Update Verification:**
   - Edit `/inc/analytics-seo.php`
   - Replace `'your-bing-verification-code'` with actual code on line 38

### 4. Submit Sitemaps

Once Search Console is verified:
- Submit your XML sitemap: `https://yourdomain.com/sitemap_index.xml`
- Check for crawl errors and index coverage

### 5. Monitor SEO Health

Use WP-CLI to check SEO health:
```bash
wp seo-check
```

This will check:
- Missing meta descriptions
- Sitemap accessibility
- Robots.txt status

## RSD-Specific Tracking Events

The analytics setup automatically tracks:
- **RSD Assessment clicks** - User engagement with assessment tools
- **Coping Strategies access** - Mental health resource usage
- **Emergency Support usage** - Crisis intervention tool usage
- **Scroll depth** - Content engagement metrics
- **Time on page** - Quality engagement tracking
- **Core Web Vitals** - Google ranking factors

## Privacy Compliance

- Cookie notice included for GDPR compliance
- No personal data stored in analytics
- User consent required for tracking
- Privacy policy integration

## Performance Monitoring

Core Web Vitals tracked:
- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)
- **CLS** (Cumulative Layout Shift)
- **FCP** (First Contentful Paint)
- **TTFB** (Time to First Byte)

## Next Steps

1. Set up Google Analytics 4 property
2. Verify with Google Search Console
3. Update verification codes in analytics-seo.php
4. Submit sitemap to search engines
5. Monitor SEO performance weekly
6. Review RSD-specific engagement metrics
7. Optimize based on user behavior data

## Troubleshooting

If analytics aren't working:
1. Check browser console for JavaScript errors
2. Verify GA4 Measurement ID is correct
3. Ensure cookies are accepted by users
4. Test in incognito mode
5. Use GA4 DebugView for real-time testing