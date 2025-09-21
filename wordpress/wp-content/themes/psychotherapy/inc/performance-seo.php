<?php
/**
 * Core Web Vitals and Performance Optimizations for TooSensitive
 * Modern SEO techniques for page speed and user experience
 */

// Optimize loading of CSS and JS
function toosensitive_optimize_assets() {
    // Defer non-critical CSS
    add_filter('style_loader_tag', 'toosensitive_defer_non_critical_css', 10, 2);
    
    // Preload critical resources
    add_action('wp_head', 'toosensitive_add_preload_hints', 1);
    
    // Add async/defer to JavaScript
    add_filter('script_loader_tag', 'toosensitive_async_defer_scripts', 10, 2);
}

function toosensitive_defer_non_critical_css($html, $handle) {
    // Critical CSS handles that should load immediately
    $critical_handles = array('psychotherapy-style', 'wp-block-library');
    
    if (!in_array($handle, $critical_handles)) {
        $html = str_replace('<link ', '<link rel="preload" as="style" onload="this.onload=null;this.rel=\'stylesheet\'" ', $html);
        $html .= '<noscript>' . str_replace(' rel="preload" as="style" onload="this.onload=null;this.rel=\'stylesheet\'"', '', $html) . '</noscript>';
    }
    
    return $html;
}

function toosensitive_add_preload_hints() {
    // Preload critical fonts
    echo '<link rel="preload" href="' . get_theme_file_uri('/assets/fonts/poppins.woff2') . '" as="font" type="font/woff2" crossorigin>' . "\n";
    
    // Preload critical images
    echo '<link rel="preload" href="' . get_theme_file_uri('/assets/images/hero-bg.jpg') . '" as="image">' . "\n";
    
    // DNS prefetch for external domains
    echo '<link rel="dns-prefetch" href="//fonts.googleapis.com">' . "\n";
    echo '<link rel="dns-prefetch" href="//www.google-analytics.com">' . "\n";
    echo '<link rel="dns-prefetch" href="//googletagmanager.com">' . "\n";
}

function toosensitive_async_defer_scripts($tag, $handle) {
    // Scripts to defer
    $defer_scripts = array('jquery', 'wp-embed');
    
    // Scripts to async
    $async_scripts = array('google-analytics', 'gtm');
    
    if (in_array($handle, $defer_scripts)) {
        return str_replace('<script ', '<script defer ', $tag);
    }
    
    if (in_array($handle, $async_scripts)) {
        return str_replace('<script ', '<script async ', $tag);
    }
    
    return $tag;
}

// Image optimization
function toosensitive_optimize_images() {
    // Add loading="lazy" to images
    add_filter('wp_get_attachment_image_attributes', 'toosensitive_add_lazy_loading', 10, 3);
    
    // Add responsive images
    add_theme_support('responsive-embeds');
    add_theme_support('post-thumbnails');
    
    // Set image quality
    add_filter('jpeg_quality', function() { return 85; });
    add_filter('wp_editor_set_quality', function() { return 85; });
}

function toosensitive_add_lazy_loading($attr, $attachment, $size) {
    $attr['loading'] = 'lazy';
    $attr['decoding'] = 'async';
    return $attr;
}

// Optimize database queries
function toosensitive_optimize_queries() {
    // Remove unnecessary WordPress features
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    remove_action('wp_head', 'feed_links_extra', 3);
    remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10);
    
    // Disable emoji scripts
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    
    // Optimize heartbeat
    add_filter('heartbeat_settings', function($settings) {
        $settings['interval'] = 60; // 60 seconds
        return $settings;
    });
}

// Add Critical CSS inline
function toosensitive_critical_css() {
    $critical_css = "
    /* Critical CSS for above-the-fold content */
    body{font-family:Poppins,sans-serif;margin:0;padding:0}
    .header{background:#fff;padding:1rem 0}
    .hero-section{background:#f5fafd;padding:3rem 0;text-align:center}
    .hero-title{font-size:2.5rem;font-weight:700;color:#000;margin-bottom:1rem}
    .hero-subtitle{font-size:1.2rem;color:#666;margin-bottom:2rem}
    .btn-primary{background:#4d7a79;color:#fff;padding:1rem 2rem;border:none;border-radius:5px;font-size:1rem;cursor:pointer}
    .container{max-width:1200px;margin:0 auto;padding:0 1rem}
    ";
    
    echo '<style id="critical-css">' . $critical_css . '</style>' . "\n";
}

// Structured Data for Core Web Vitals
function toosensitive_add_performance_schema() {
    $schema = array(
        '@context' => 'https://schema.org',
        '@type' => 'TechArticle',
        'headline' => 'Fast Loading Mental Health Support for RSD',
        'description' => 'Optimized website providing immediate access to Rejection Sensitive Dysphoria resources and support tools.',
        'keywords' => 'RSD, Rejection Sensitive Dysphoria, fast loading, performance, mental health',
        'author' => array(
            '@type' => 'Organization',
            'name' => 'TooSensitive: RSD & Emotional Support'
        ),
        'publisher' => array(
            '@type' => 'Organization',
            'name' => 'TooSensitive: RSD & Emotional Support'
        ),
        'datePublished' => '2025-01-01',
        'dateModified' => date('c'),
        'mainEntityOfPage' => array(
            '@type' => 'WebPage',
            '@id' => home_url()
        )
    );
    
    echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
}

// Add viewport meta for mobile optimization
function toosensitive_mobile_optimization() {
    echo '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">' . "\n";
    echo '<meta name="format-detection" content="telephone=no">' . "\n";
    echo '<meta name="theme-color" content="#4d7a79">' . "\n";
    
    // Add Apple touch icons
    echo '<link rel="apple-touch-icon" sizes="180x180" href="' . get_theme_file_uri('/assets/images/apple-touch-icon.png') . '">' . "\n";
    echo '<link rel="icon" type="image/png" sizes="32x32" href="' . get_theme_file_uri('/assets/images/favicon-32x32.png') . '">' . "\n";
    echo '<link rel="manifest" href="' . get_theme_file_uri('/manifest.json') . '">' . "\n";
}

// Security headers for SEO
function toosensitive_security_headers() {
    if (!is_admin()) {
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: SAMEORIGIN');
        header('X-XSS-Protection: 1; mode=block');
        header('Referrer-Policy: strict-origin-when-cross-origin');
    }
}

// Initialize all optimizations
add_action('init', 'toosensitive_optimize_assets');
add_action('init', 'toosensitive_optimize_images');
add_action('init', 'toosensitive_optimize_queries');
add_action('wp_head', 'toosensitive_critical_css', 1);
add_action('wp_head', 'toosensitive_mobile_optimization', 2);
add_action('wp_head', 'toosensitive_add_performance_schema', 15);
add_action('send_headers', 'toosensitive_security_headers');

// Preconnect to external domains for faster loading
function toosensitive_resource_hints($urls, $relation_type) {
    if ($relation_type === 'preconnect') {
        $urls[] = array(
            'href' => 'https://fonts.googleapis.com',
            'crossorigin',
        );
        $urls[] = array(
            'href' => 'https://fonts.gstatic.com',
            'crossorigin',
        );
    }
    return $urls;
}
add_filter('wp_resource_hints', 'toosensitive_resource_hints', 10, 2);