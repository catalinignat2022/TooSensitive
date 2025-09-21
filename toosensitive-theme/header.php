<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="TooSensitive - Support for people with Rejection Sensitive Dysphoria (RSD) and emotional sensitivity. You're not broken, you're not alone.">
    
    <!-- Preconnect to external domains -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Security headers -->
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
    
    <?php wp_head(); ?>
    
    <!-- Structured Data for SEO -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "TooSensitive",
        "description": "Support and resources for Rejection Sensitive Dysphoria (RSD) and emotional sensitivity",
        "url": "<?php echo home_url(); ?>",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "<?php echo home_url(); ?>/?s={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    }
    </script>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header" role="banner">
    <div class="container">
        <div class="header-content">
            <!-- Logo -->
            <div class="site-branding">
                <?php if (has_custom_logo()) : ?>
                    <?php the_custom_logo(); ?>
                <?php else : ?>
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="logo" rel="home">
                        TooSensitive
                    </a>
                <?php endif; ?>
                <p class="site-description sr-only"><?php bloginfo('description'); ?></p>
            </div>

            <!-- Primary Navigation -->
            <nav class="main-nav" role="navigation" aria-label="Primary navigation">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'menu_class'     => 'primary-menu',
                    'container'      => false,
                    'walker'         => new TooSensitive_Walker_Nav_Menu(),
                    'fallback_cb'    => 'toosensitive_fallback_menu',
                ));
                ?>
                
                <!-- Mobile menu toggle -->
                <button class="mobile-menu-toggle" aria-label="Toggle mobile menu" aria-expanded="false">
                    <span class="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>
            </nav>

            <!-- CTA Button -->
            <div class="header-cta">
                <a href="<?php echo esc_url(home_url('/assessment')); ?>" class="btn btn-primary">
                    Take Assessment
                </a>
            </div>
        </div>
    </div>
</header>

<?php
/**
 * Fallback menu when no menu is assigned
 */
function toosensitive_fallback_menu() {
    echo '<ul class="primary-menu">';
    echo '<li><a href="' . home_url() . '">Home</a></li>';
    echo '<li><a href="' . home_url('/assessment') . '">Assessment</a></li>';
    echo '<li><a href="' . home_url('/what-is-rsd') . '">What is RSD?</a></li>';
    echo '<li><a href="' . home_url('/coping-strategies') . '">Coping Strategies</a></li>';
    echo '<li><a href="' . home_url('/community') . '">Community</a></li>';
    echo '<li><a href="' . home_url('/app') . '">The App</a></li>';
    echo '<li><a href="' . home_url('/about') . '">About</a></li>';
    echo '</ul>';
}
?>