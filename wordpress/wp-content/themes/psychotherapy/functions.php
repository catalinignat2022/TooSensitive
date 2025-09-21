<?php
/**
 * Psychotherapy functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package psychotherapy
 * @since psychotherapy 1.0
 */

// Include RSD Authentication Backend
require_once get_template_directory() . '/includes/rsd-auth-backend.php';

if ( ! function_exists( 'psychotherapy_support' ) ) :

	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * @since psychotherapy 1.0
	 *
	 * @return void
	 */
	function psychotherapy_support() {

		load_theme_textdomain( 'psychotherapy', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		// Add support for block styles.
		add_theme_support( 'wp-block-styles' );

		add_theme_support( 'align-wide' );

		// Enqueue editor styles.
		add_editor_style( 'style.css' );

		add_theme_support( 'responsive-embeds' );
		
		// Add support for experimental link color control.
		add_theme_support( 'experimental-link-color' );
	}

endif;

add_action( 'after_setup_theme', 'psychotherapy_support' );

if ( ! function_exists( 'psychotherapy_styles' ) ) :

	/**
	 * Enqueue styles.
	 *
	 * @since psychotherapy 1.0
	 *
	 * @return void
	 */
	function psychotherapy_styles() {

		// Register theme stylesheet.
		wp_register_style(
			'psychotherapy-style',
			get_template_directory_uri() . '/style.css',
			array(),
			wp_get_theme()->get( 'Version' )
		);

		wp_enqueue_style(
			'animate-css',
			esc_url(get_template_directory_uri()).'/assets/css/animate.css' 
		);

		// Enqueue theme stylesheet.
		wp_enqueue_style( 'psychotherapy-style' );

		wp_style_add_data( 'psychotherapy-style', 'rtl', 'replace' );

		wp_enqueue_style( 'dashicons' );

		//font-awesome
		wp_enqueue_style( 'fontawesome', get_template_directory_uri() . '/inc/fontawesome/css/all.css', array(), '6.7.0' );

		wp_enqueue_style('swiper-css',
		esc_url(get_template_directory_uri()) . '/assets/css/swiper-bundle.css',
		array()
		);
		
		// RSD Authentication System CSS
		wp_enqueue_style(
			'rsd-auth-system',
			get_template_directory_uri() . '/assets/css/rsd-auth-system.css',
			array('psychotherapy-style'),
			wp_get_theme()->get('Version')
		);
		
	}

endif;

add_action( 'wp_enqueue_scripts', 'psychotherapy_styles' );

/* Enqueue Custom Js */
function psychotherapy_scripts() {

	wp_enqueue_script( 
		'wow', esc_url(get_template_directory_uri()) . '/assets/js/wow.js', 
		array('jquery') 
	);

	wp_enqueue_script(
		'psychotherapy-custom', esc_url(get_template_directory_uri()) . '/assets/js/custom.js',
		array('jquery')
	);

	wp_enqueue_script(
        'psychotherapy-scroll-to-top',
        esc_url(get_template_directory_uri()) . '/assets/js/scroll-to-top.js',
        array(), 
        null, 
        true // Load in footer
    );

	wp_enqueue_script(
		'swiper-js',
		esc_url(get_template_directory_uri()) . '/assets/js/swiper-bundle.js',
		array(),
		true
	);

	// RSD Authentication System JavaScript
	wp_enqueue_script(
		'rsd-auth-system',
		get_template_directory_uri() . '/assets/js/rsd-auth-system.js',
		array('jquery'),
		wp_get_theme()->get('Version'),
		true
	);

	// Assessment page script: load when template, page slug, or our rewrite route is active
	$assessment_route = ( intval( get_query_var( 'assessment_page' ) ) === 1 );
	if ( is_page_template( 'page-assessment.php' ) || is_page( 'assessment' ) || $assessment_route ) {

		wp_enqueue_script(
			'psychotherapy-assessment',
			esc_url(get_template_directory_uri()) . '/assets/js/assessment.js',
			array(),
			'1.0.0',
			true
		);
	}
}
add_action( 'wp_enqueue_scripts', 'psychotherapy_scripts' );

/* Enqueue admin-notice-script js */
add_action('admin_enqueue_scripts', function ($hook) {
    if ($hook !== 'appearance_page_psychotherapy') return;

    wp_enqueue_script('admin-notice-script', get_template_directory_uri() . '/get-started/js/admin-notice-script.js', ['jquery'], null, true);
    wp_localize_script('admin-notice-script', 'pluginInstallerData', [
        'ajaxurl'     => admin_url('admin-ajax.php'),
        'nonce'       => wp_create_nonce('install_wordclever_nonce'), // Match this with PHP nonce check
        'redirectUrl' => admin_url('themes.php?page=psychotherapy'),
    ]);
});

add_action('wp_ajax_check_wordclever_activation', function () {
    include_once ABSPATH . 'wp-admin/includes/plugin.php';
    $nature_photography_plugin_file = 'wordclever-ai-content-writer/wordclever.php';

    if (is_plugin_active($nature_photography_plugin_file)) {
        wp_send_json_success(['active' => true]);
    } else {
        wp_send_json_success(['active' => false]);
    }
});
add_filter( 'woocommerce_enable_setup_wizard', '__return_false' );


function psychotherapy_theme_setting() {
	
// Add block patterns
require get_template_directory() . '/inc/block-pattern.php';

// Add block Style
require get_template_directory() . '/inc/block-style.php';

// TGM
require get_template_directory() . '/inc/tgm/plugin-activation.php';

// Get Started
require get_template_directory() . '/get-started/getstart.php';

// Get Notice
require get_template_directory() . '/get-started/notice.php';

// Get Notice
require get_template_directory() . '/inc/customizer.php';

}
add_action('after_setup_theme', 'psychotherapy_theme_setting');

/**
 * Enqueue RSD Emergency Support System JavaScript
 */
function psychotherapy_rsd_emergency_scripts() {
    // Core Emergency Toolkit (existing)
    wp_enqueue_script(
        'emergency-toolkit',
        get_template_directory_uri() . '/assets/js/emergency-toolkit.js',
        array(),
        '1.0.0',
        true
    );
    
    // Crisis Detection System
    wp_enqueue_script(
        'crisis-detection',
        get_template_directory_uri() . '/assets/js/crisis-detection.js',
        array('jquery'),
        '1.0.0',
        true
    );
    
    // RSD AI Companion
    wp_enqueue_script(
        'rsd-companion',
        get_template_directory_uri() . '/assets/js/rsd-companion.js',
        array('crisis-detection'),
        '1.0.0',
        true
    );
    
    // Digital Survival Kit
    wp_enqueue_script(
        'digital-survival-kit',
        get_template_directory_uri() . '/assets/js/digital-survival-kit.js',
        array('jquery'),
        '1.0.0',
        true
    );
    
    // Peer Support Network
    wp_enqueue_script(
        'peer-support-network',
        get_template_directory_uri() . '/assets/js/peer-support-network.js',
        array('jquery'),
        '1.0.0',
        true
    );
    
    // Mood Tracking System
    wp_enqueue_script(
        'mood-tracking-system',
        get_template_directory_uri() . '/assets/js/mood-tracking-system.js',
        array('jquery'),
        '1.0.0',
        true
    );
    
    // Central Emergency Manager (loads last, after all modules)
    wp_enqueue_script(
        'rsd-emergency-manager',
        get_template_directory_uri() . '/assets/js/rsd-emergency-manager.js',
        array('crisis-detection', 'rsd-companion', 'digital-survival-kit', 'peer-support-network', 'mood-tracking-system'),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'psychotherapy_rsd_emergency_scripts');

/**
 * Enqueue Crisis Dashboard JavaScript
 */
function psychotherapy_crisis_dashboard_scripts() {
    wp_enqueue_script(
        'crisis-dashboard',
        get_template_directory_uri() . '/assets/js/crisis-dashboard.js',
        array('jquery', 'emergency-toolkit'),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'psychotherapy_crisis_dashboard_scripts');

/**
 * Exclude Emergency Toolkit category (ID 3) from main blog/home query
 */
function psychotherapy_exclude_emergency_from_home( $query ) {
	// Don't touch admin, REST requests, or singular views
	if ( is_admin() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) || $query->is_singular ) {
		return;
	}

	// Only target queries that return posts (default post type or explicitly 'post')
	$post_type = $query->get( 'post_type' );
	if ( $post_type && $post_type !== 'post' ) {
		return;
	}

	// Exclude Emergency Toolkit category (ID 3) from front-end post lists / query loops
	$term_id = 3; // Emergency Toolkit category ID
	$tax_query = $query->get( 'tax_query' );
	if ( ! $tax_query ) {
		$tax_query = array();
	}

	$tax_query[] = array(
		'taxonomy' => 'category',
		'field'    => 'term_id',
		'terms'    => array( $term_id ),
		'operator' => 'NOT IN',
	);

	$query->set( 'tax_query', $tax_query );
}
add_action( 'pre_get_posts', 'psychotherapy_exclude_emergency_from_home' );

/**
 * Exclude Emergency Toolkit category from REST post collection queries
 * This helps Query Loop blocks on the front-end which fetch posts via REST.
 */
function psychotherapy_exclude_emergency_from_rest( $args, $request ) {
	// Only modify collection queries for posts
	if ( isset( $args['post_type'] ) && $args['post_type'] !== 'post' ) {
		return $args;
	}

	// Avoid modifying singular or item-specific requests
	if ( isset( $request['id'] ) || ( isset( $request['context'] ) && $request['context'] === 'view' && isset( $request['slug'] ) ) ) {
		return $args;
	}

	$term_id = 3; // Emergency Toolkit category ID

	if ( empty( $args['tax_query'] ) ) {
		$args['tax_query'] = array();
	}

	$args['tax_query'][] = array(
		'taxonomy' => 'category',
		'field'    => 'term_id',
		'terms'    => array( $term_id ),
		'operator' => 'NOT IN',
	);

	return $args;
}
add_filter( 'rest_post_query', 'psychotherapy_exclude_emergency_from_rest', 10, 2 );

/**
 * Provide a direct route for /assessment to render the assessment template
 * even when a WP "Page" object isn't present. This is useful for local/dev
 * environments where creating the admin page may be inconvenient.
 */
function psychotherapy_assessment_rewrite() {
	// Dezactivat: folosim doar articolul WordPress cu slug 'assessment'
	// add_rewrite_tag( '%assessment_page%', '([0-9]+)' );
	// add_rewrite_rule( '^assessment/?$', 'index.php?assessment_page=1', 'top' );

	// Flush rewrite rules once after removing the rule
	if ( get_option( 'psychotherapy_assessment_rewrite_flushed' ) !== '2' ) {
		flush_rewrite_rules( true );
		update_option( 'psychotherapy_assessment_rewrite_flushed', '2' );
	}
}
add_action( 'init', 'psychotherapy_assessment_rewrite' );

function psychotherapy_assessment_template( $template ) {
	// Dezactivat: folosim doar articolul WordPress cu slug 'assessment'
	return $template;
}
add_filter( 'template_include', 'psychotherapy_assessment_template' );

/**
 * Shortcode to render the RSD assessment app so it can be embedded in posts/pages.
 * Usage: [rsd_assessment]
 */
function psychotherapy_rsd_assessment_shortcode( $atts = array() ) {
	// Ensure the assessment script is enqueued when shortcode is present
	wp_enqueue_script(
		'psychotherapy-assessment',
		esc_url(get_template_directory_uri()) . '/assets/js/assessment.js',
		array(),
		'1.0.0',
		true
	);

	// Minimal markup (IDs match the JS expectations)
	$html = '';
	$html .= '<div class="wp-block-group content-area"><div class="wp-block-group assessment-wrapper">';
	$html .= '<h1 class="wp-block-heading">Take the 2‑Minute RSD Assessment</h1>';
	$html .= '<p class="lead">Quick, anonymous, and evidence‑informed — this short quiz helps you see whether Rejection Sensitive Dysphoria might explain why criticism or rejection feels overwhelming.</p>';
	$html .= '<div id="assessment-app" class="wp-block-group assessment-app" aria-live="polite">';
	$html .= '<div id="assessment-start" class="wp-block-group assessment-start"><p>Ready to begin? You\'ll see 10 short statements. For each, choose how often it applies to you.</p><div class="wp-block-button is-style-primary"><button id="start-assessment" class="wp-block-button__link">Start Assessment</button></div></div>';
	$html .= '<form id="assessment-form" class="wp-block-group assessment-form" style="display:none;" aria-hidden="true"><div id="question-container" class="question-container"></div><div class="assessment-controls wp-block-buttons"><div class="wp-block-button"><button type="button" id="prev-btn" class="wp-block-button__link">Previous</button></div><div class="wp-block-button is-style-primary"><button type="button" id="next-btn" class="wp-block-button__link">Next</button></div></div></form>';
	$html .= '<div id="assessment-results" class="wp-block-group assessment-results" style="display:none;" aria-hidden="true"></div>';
	$html .= '</div></div></div>';

	return $html;
}
add_shortcode( 'rsd_assessment', 'psychotherapy_rsd_assessment_shortcode' );


/**
 * Create a published "Assessment" post with slug 'assessment' once so the assessment
 * appears as a normal article within the theme (integrated layout).
 */
function psychotherapy_ensure_assessment_post() {
	// Run only in admin or front-end but only create once
	if ( get_option( 'psychotherapy_assessment_post_created' ) === '1' ) {
		return;
	}

	// Check if a post with slug 'assessment' exists
	$existing = get_page_by_path( 'assessment', OBJECT, array( 'post', 'page' ) );
	if ( $existing ) {
		update_option( 'psychotherapy_assessment_post_created', '1' );
		return;
	}

	// Build post content using the shortcode so it's editable later
	$post_id = wp_insert_post( array(
		'post_title'   => 'Assessment',
		'post_name'    => 'assessment',
		'post_content' => '[rsd_assessment]',
		'post_status'  => 'publish',
		'post_type'    => 'post',
		'post_author'  => 1,
	) );

	if ( $post_id && ! is_wp_error( $post_id ) ) {
		update_option( 'psychotherapy_assessment_post_created', '1' );
	}
}
add_action( 'init', 'psychotherapy_ensure_assessment_post' );

/**
 * Add custom JavaScript to remove unwanted elements
 */
function psychotherapy_remove_unwanted_elements() {
	?>
	<script type="text/javascript">
	jQuery(document).ready(function($) {
		// Function to remove unwanted navigation elements
		function removeUnwantedElements() {
			// Remove WordPress block navigation
			$(".wp-block-navigation").remove();
			$(".wp-block-navigation__container").remove();
			$(".wp-block-navigation-item").remove();
			$(".wp-block-navigation-item__content").remove();
			
			// Remove search elements
			$(".wp-block-search").remove();
			$(".wp-block-search__button").remove();
			
			// Remove by specific classes
			$("ul.has-text-color.has-accent-color.has-medium-font-size").remove();
			$("ul[class*='wp-block-navigation']").remove();
			
			// Hide with CSS as backup
			$("[class*='wp-block-navigation']").css({
				"display": "none !important",
				"visibility": "hidden !important",
				"opacity": "0 !important",
				"height": "0 !important",
				"width": "0 !important"
			});
		}
		
		// Run immediately
		removeUnwantedElements();
		
		// Run every 500ms to catch dynamically loaded content
		setInterval(removeUnwantedElements, 500);
		
		// Run on various events
		$(window).on("load resize", removeUnwantedElements);
		$(document).on("DOMNodeInserted", removeUnwantedElements);
	});
	</script>
	<?php
}
add_action( 'wp_footer', 'psychotherapy_remove_unwanted_elements' );

// Include SEO Schema and optimization functions
require get_template_directory() . '/inc/seo-schema.php';
require get_template_directory() . '/inc/performance-seo.php';
require get_template_directory() . '/inc/content-seo.php';
require get_template_directory() . '/inc/analytics-seo.php';