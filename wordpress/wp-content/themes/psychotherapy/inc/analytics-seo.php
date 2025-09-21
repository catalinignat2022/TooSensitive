<?php
/**
 * Analytics and SEO Monitoring for TooSensitive
 * Google Analytics 4, Search Console, and performance tracking
 */

// Add Google Analytics 4 tracking
function toosensitive_add_google_analytics() {
    // Replace 'G-XXXXXXXXXX' with your actual GA4 measurement ID
    $ga4_id = 'G-XXXXXXXXXX'; // You'll need to replace this with your actual GA4 ID
    
    if (!is_admin() && !empty($ga4_id) && $ga4_id !== 'G-XXXXXXXXXX') {
        ?>
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo $ga4_id; ?>"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '<?php echo $ga4_id; ?>', {
            // Enhanced ecommerce and user engagement tracking
            allow_enhanced_conversions: true,
            allow_ad_personalization_signals: false, // GDPR compliance
            cookie_flags: 'SameSite=None;Secure'
        });
        
        // Track RSD-specific events
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            content_group1: 'RSD Support', // Content grouping
            custom_parameter_1: 'mental_health'
        });
        </script>
        <?php
    }
}

// Add Google Search Console verification
function toosensitive_add_search_console_verification() {
    // Replace with your actual Search Console verification code
    $gsc_verification = 'your-search-console-verification-code';
    
    if (!empty($gsc_verification) && $gsc_verification !== 'your-search-console-verification-code') {
        echo '<meta name="google-site-verification" content="' . esc_attr($gsc_verification) . '">' . "\n";
    }
}

// Add Bing Webmaster Tools verification
function toosensitive_add_bing_verification() {
    $bing_verification = 'your-bing-verification-code';
    
    if (!empty($bing_verification) && $bing_verification !== 'your-bing-verification-code') {
        echo '<meta name="msvalidate.01" content="' . esc_attr($bing_verification) . '">' . "\n";
    }
}

// Track RSD-specific user interactions
function toosensitive_add_enhanced_tracking() {
    if (!is_admin()) {
        ?>
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Track RSD Assessment clicks
            const assessmentLinks = document.querySelectorAll('a[href*="rsd-assessment"]');
            assessmentLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'click', {
                            event_category: 'RSD Assessment',
                            event_label: 'Assessment Link Click',
                            value: 1
                        });
                    }
                });
            });
            
            // Track Coping Strategies engagement
            const copingLinks = document.querySelectorAll('a[href*="coping-strategies"]');
            copingLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'engagement', {
                            event_category: 'Coping Strategies',
                            event_label: 'Strategies Page Visit',
                            value: 1
                        });
                    }
                });
            });
            
            // Track Emergency Support usage
            const emergencyLinks = document.querySelectorAll('a[href*="calm-now"]');
            emergencyLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'conversion', {
                            event_category: 'Emergency Support',
                            event_label: 'Calm Now Access',
                            value: 1
                        });
                    }
                });
            });
            
            // Track page scroll depth (for engagement metrics)
            let maxScroll = 0;
            window.addEventListener('scroll', function() {
                const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
                if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
                    maxScroll = scrollPercent;
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'scroll', {
                            event_category: 'Engagement',
                            event_label: 'Scroll Depth',
                            value: scrollPercent
                        });
                    }
                }
            });
            
            // Track time on page for content engagement
            let startTime = Date.now();
            window.addEventListener('beforeunload', function() {
                const timeOnPage = Math.round((Date.now() - startTime) / 1000);
                if (timeOnPage > 30 && typeof gtag !== 'undefined') { // Only track if more than 30 seconds
                    gtag('event', 'timing_complete', {
                        name: 'page_engagement',
                        value: timeOnPage
                    });
                }
            });
        });
        </script>
        <?php
    }
}

// Add Core Web Vitals tracking
function toosensitive_add_core_web_vitals_tracking() {
    if (!is_admin()) {
        ?>
        <script>
        // Core Web Vitals tracking
        function sendToGoogleAnalytics({name, delta, id}) {
            if (typeof gtag !== 'undefined') {
                gtag('event', name, {
                    event_category: 'Web Vitals',
                    event_label: id,
                    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
                    non_interaction: true,
                });
            }
        }
        
        // Load web-vitals library
        if ('serviceWorker' in navigator) {
            import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({onCLS, onFID, onFCP, onLCP, onTTFB}) => {
                onCLS(sendToGoogleAnalytics);
                onFID(sendToGoogleAnalytics);
                onFCP(sendToGoogleAnalytics);
                onLCP(sendToGoogleAnalytics);
                onTTFB(sendToGoogleAnalytics);
            });
        }
        </script>
        <?php
    }
}

// Add heatmap and user behavior tracking (Hotjar alternative - privacy-friendly)
function toosensitive_add_behavior_tracking() {
    if (!is_admin()) {
        ?>
        <script>
        // Privacy-friendly behavior tracking
        document.addEventListener('DOMContentLoaded', function() {
            // Track click patterns for UX optimization
            let clickData = [];
            document.addEventListener('click', function(e) {
                clickData.push({
                    element: e.target.tagName,
                    class: e.target.className,
                    time: Date.now()
                });
                
                // Send data periodically (anonymized)
                if (clickData.length >= 10) {
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'user_interaction', {
                            event_category: 'UX Analytics',
                            event_label: 'Click Pattern',
                            custom_parameter: clickData.length
                        });
                    }
                    clickData = [];
                }
            });
        });
        </script>
        <?php
    }
}

// SEO monitoring and reporting
function toosensitive_seo_health_check() {
    // This function can be called via WP-CLI to check SEO health
    $seo_issues = array();
    
    // Check if pages have meta descriptions
    $pages = get_pages();
    foreach ($pages as $page) {
        $meta_desc = get_post_meta($page->ID, '_yoast_wpseo_metadesc', true);
        if (empty($meta_desc)) {
            $seo_issues[] = "Missing meta description: " . $page->post_title;
        }
    }
    
    // Check if sitemap is accessible
    $sitemap_url = home_url('/sitemap_index.xml');
    $response = wp_remote_get($sitemap_url);
    if (is_wp_error($response) || wp_remote_retrieve_response_code($response) !== 200) {
        $seo_issues[] = "Sitemap not accessible: " . $sitemap_url;
    }
    
    // Check if robots.txt exists
    $robots_url = home_url('/robots.txt');
    $response = wp_remote_get($robots_url);
    if (is_wp_error($response) || wp_remote_retrieve_response_code($response) !== 200) {
        $seo_issues[] = "Robots.txt not accessible: " . $robots_url;
    }
    
    return $seo_issues;
}

// Add privacy-compliant cookie notice for GDPR
function toosensitive_add_privacy_notice() {
    if (!is_admin()) {
        ?>
        <div id="cookie-notice" style="display:none; position:fixed; bottom:0; left:0; right:0; background:#333; color:#fff; padding:1rem; z-index:9999; text-align:center;">
            <p>We use cookies to improve your experience and analyze site usage. By continuing to browse, you consent to our use of cookies. 
            <a href="<?php echo home_url('/privacy-policy/'); ?>" style="color:#4d7a79;">Learn more</a>
            <button onclick="acceptCookies()" style="background:#4d7a79; color:#fff; border:none; padding:0.5rem 1rem; margin-left:1rem; cursor:pointer;">Accept</button>
            </p>
        </div>
        <script>
        function acceptCookies() {
            localStorage.setItem('cookies-accepted', 'true');
            document.getElementById('cookie-notice').style.display = 'none';
        }
        
        if (!localStorage.getItem('cookies-accepted')) {
            document.getElementById('cookie-notice').style.display = 'block';
        }
        </script>
        <?php
    }
}

// Hook all tracking functions
add_action('wp_head', 'toosensitive_add_google_analytics', 5);
add_action('wp_head', 'toosensitive_add_search_console_verification', 1);
add_action('wp_head', 'toosensitive_add_bing_verification', 1);
add_action('wp_footer', 'toosensitive_add_enhanced_tracking');
add_action('wp_footer', 'toosensitive_add_core_web_vitals_tracking');
add_action('wp_footer', 'toosensitive_add_behavior_tracking');
add_action('wp_footer', 'toosensitive_add_privacy_notice');

// WP-CLI command for SEO health check
if (defined('WP_CLI') && WP_CLI) {
    WP_CLI::add_command('seo-check', function() {
        $issues = toosensitive_seo_health_check();
        if (empty($issues)) {
            WP_CLI::success('No SEO issues found!');
        } else {
            WP_CLI::warning('SEO issues found:');
            foreach ($issues as $issue) {
                WP_CLI::line('- ' . $issue);
            }
        }
    });
}