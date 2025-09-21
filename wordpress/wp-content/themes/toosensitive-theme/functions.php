<?php
/**
 * TooSensitive Theme Functions
 * Production-ready WordPress theme for RSD support
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Include RSD Authentication Backend
require_once get_template_directory() . '/includes/rsd-auth-backend.php';

// Include RSD Authentication Backend
require_once get_template_directory() . '/includes/rsd-auth-backend.php';

/**
 * Theme Setup
 */
function toosensitive_setup() {
    // Add theme support for various features
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('custom-header');
    add_theme_support('custom-background');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    add_theme_support('title-tag');
    add_theme_support('automatic-feed-links');
    add_theme_support('responsive-embeds');
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => esc_html__('Primary Menu', 'toosensitive'),
        'footer' => esc_html__('Footer Menu', 'toosensitive'),
    ));
    
    // Set content width
    global $content_width;
    if (!isset($content_width)) {
        $content_width = 1200;
    }
}
add_action('after_setup_theme', 'toosensitive_setup');

/**
 * Enqueue Scripts and Styles
 */
/**
 * Enqueue Scripts and Styles
 */
function toosensitive_scripts() {
    // Enqueue main stylesheet
    wp_enqueue_style('toosensitive-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // Enqueue custom CSS
    wp_enqueue_style('toosensitive-custom', get_template_directory_uri() . '/assets/css/custom.css', array(), '1.0.0');
    
    // Enqueue Google Fonts
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', array(), null);
    
    // RSD Authentication System CSS
    wp_enqueue_style(
        'rsd-auth-system',
        get_template_directory_uri() . '/assets/css/rsd-auth-system.css',
        array('toosensitive-style'),
        wp_get_theme()->get('Version')
    );
    
    // Enqueue JavaScript
    wp_enqueue_script('toosensitive-main', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), '1.0.0', true);
    
    // RSD Authentication System JavaScript
    wp_enqueue_script(
        'rsd-auth-system',
        get_template_directory_uri() . '/assets/js/rsd-auth-system.js',
        array('jquery'),
        wp_get_theme()->get('Version'),
        true
    );
    
    // Localize script for AJAX
    wp_localize_script('toosensitive-main', 'toosensitive_ajax', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('toosensitive_nonce')
    ));
}
add_action('wp_enqueue_scripts', 'toosensitive_scripts');

/**
 * Enqueue RSD Emergency Support System JavaScript
 */
function toosensitive_rsd_emergency_scripts() {
    // Core Emergency Toolkit
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
add_action('wp_enqueue_scripts', 'toosensitive_rsd_emergency_scripts');

/**
 * Widget Areas
 */
function toosensitive_widgets_init() {
    register_sidebar(array(
        'name'          => esc_html__('Sidebar', 'toosensitive'),
        'id'            => 'sidebar-1',
        'description'   => esc_html__('Add widgets here.', 'toosensitive'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
    
    register_sidebar(array(
        'name'          => esc_html__('Footer Widgets', 'toosensitive'),
        'id'            => 'footer-widgets',
        'description'   => esc_html__('Add footer widgets here.', 'toosensitive'),
        'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="footer-widget-title">',
        'after_title'   => '</h4>',
    ));
}
add_action('widgets_init', 'toosensitive_widgets_init');

/**
 * Custom Post Types
 */
function toosensitive_custom_post_types() {
    // Testimonials
    register_post_type('testimonials', array(
        'labels' => array(
            'name' => 'Testimonials',
            'singular_name' => 'Testimonial',
            'add_new' => 'Add New Testimonial',
            'add_new_item' => 'Add New Testimonial',
            'edit_item' => 'Edit Testimonial',
            'new_item' => 'New Testimonial',
            'view_item' => 'View Testimonial',
            'search_items' => 'Search Testimonials',
            'not_found' => 'No testimonials found',
            'not_found_in_trash' => 'No testimonials found in trash'
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-format-quote',
        'show_in_rest' => true,
    ));
    
    // Resources
    register_post_type('resources', array(
        'labels' => array(
            'name' => 'Resources',
            'singular_name' => 'Resource',
            'add_new' => 'Add New Resource',
            'add_new_item' => 'Add New Resource',
            'edit_item' => 'Edit Resource',
            'new_item' => 'New Resource',
            'view_item' => 'View Resource',
            'search_items' => 'Search Resources',
            'not_found' => 'No resources found',
            'not_found_in_trash' => 'No resources found in trash'
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-book-alt',
        'show_in_rest' => true,
    ));
}
add_action('init', 'toosensitive_custom_post_types');

/**
 * Custom Fields for RSD Assessment
 */
function toosensitive_add_meta_boxes() {
    add_meta_box(
        'rsd-assessment-results',
        'RSD Assessment Results',
        'toosensitive_assessment_meta_box',
        'assessment',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'toosensitive_add_meta_boxes');

function toosensitive_assessment_meta_box($post) {
    wp_nonce_field('toosensitive_assessment_meta', 'toosensitive_assessment_nonce');
    $score = get_post_meta($post->ID, '_assessment_score', true);
    $responses = get_post_meta($post->ID, '_assessment_responses', true);
    
    echo '<p><label for="assessment_score">Assessment Score:</label>';
    echo '<input type="number" id="assessment_score" name="assessment_score" value="' . esc_attr($score) . '" /></p>';
    
    echo '<p><label for="assessment_responses">Responses (JSON):</label>';
    echo '<textarea id="assessment_responses" name="assessment_responses" rows="10" cols="50">' . esc_textarea($responses) . '</textarea></p>';
}

/**
 * Security Enhancements
 */
function toosensitive_security_headers() {
    if (!is_admin()) {
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: SAMEORIGIN');
        header('X-XSS-Protection: 1; mode=block');
        header('Referrer-Policy: strict-origin-when-cross-origin');
    }
}
add_action('send_headers', 'toosensitive_security_headers');

/**
 * Remove WordPress Version
 */
function toosensitive_remove_version() {
    return '';
}
add_filter('the_generator', 'toosensitive_remove_version');

/**
 * Disable XML-RPC
 */
add_filter('xmlrpc_enabled', '__return_false');

/**
 * Performance Optimizations
 */
function toosensitive_optimize_performance() {
    // Remove emoji scripts
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('admin_print_styles', 'print_emoji_styles');
    
    // Remove unnecessary head links
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    
    // Clean up head
    remove_action('wp_head', 'wp_generator');
}
add_action('init', 'toosensitive_optimize_performance');

/**
 * RSD Assessment Form Handler
 */
function handle_rsd_assessment() {
    // Verify nonce
    if (!wp_verify_nonce($_POST['nonce'], 'toosensitive_nonce')) {
        wp_die('Security check failed');
    }
    
    $responses = array();
    $total_score = 0;
    
    // Process form responses
    for ($i = 1; $i <= 10; $i++) {
        if (isset($_POST["question_$i"])) {
            $response = intval($_POST["question_$i"]);
            $responses["question_$i"] = $response;
            $total_score += $response;
        }
    }
    
    // Calculate result category
    $result_category = 'low';
    if ($total_score >= 30) {
        $result_category = 'high';
    } elseif ($total_score >= 20) {
        $result_category = 'moderate';
    }
    
    // Store in database (optional)
    $email = sanitize_email($_POST['email']);
    if ($email) {
        // Add to email list (integrate with your email service)
        add_user_to_email_list($email, $result_category, $total_score);
    }
    
    // Return results
    wp_send_json_success(array(
        'score' => $total_score,
        'category' => $result_category,
        'message' => get_result_message($result_category)
    ));
}
add_action('wp_ajax_rsd_assessment', 'handle_rsd_assessment');
add_action('wp_ajax_nopriv_rsd_assessment', 'handle_rsd_assessment');

/**
 * Get Assessment Result Message
 */
function get_result_message($category) {
    $messages = array(
        'low' => array(
            'title' => 'Low RSD Indicators',
            'description' => 'You seem to handle criticism and rejection relatively well. While everyone experiences some sensitivity, your responses suggest you have healthy coping mechanisms.',
            'recommendations' => array(
                'Continue practicing self-compassion',
                'Share your coping strategies with others',
                'Stay informed about emotional wellness'
            )
        ),
        'moderate' => array(
            'title' => 'Moderate RSD Indicators',
            'description' => 'Your responses suggest you may experience rejection sensitivity that impacts your daily life. This is more common than you might think.',
            'recommendations' => array(
                'Learn more about RSD and emotional regulation',
                'Consider speaking with a mental health professional',
                'Practice mindfulness and stress management techniques',
                'Join our community for support and resources'
            )
        ),
        'high' => array(
            'title' => 'High RSD Indicators',
            'description' => 'Your responses strongly suggest you experience Rejection Sensitive Dysphoria. This can be challenging, but you\'re not alone and help is available.',
            'recommendations' => array(
                'Consider professional evaluation for RSD and ADHD',
                'Explore therapy options (CBT, DBT)',
                'Learn emergency coping strategies',
                'Connect with others who understand RSD',
                'Download our comprehensive RSD toolkit'
            )
        )
    );
    
    return $messages[$category];
}

/**
 * Email List Integration
 */
function add_user_to_email_list($email, $category, $score) {
    // Integration with email service provider (MailChimp, ConvertKit, etc.)
    // This is a placeholder - implement based on your chosen service
    
    $data = array(
        'email' => $email,
        'category' => $category,
        'score' => $score,
        'date' => current_time('mysql'),
        'source' => 'rsd_assessment'
    );
    
    // Store in custom table or send to external service
    global $wpdb;
    $table_name = $wpdb->prefix . 'toosensitive_emails';
    
    $wpdb->insert($table_name, $data);
}

/**
 * Create Database Tables
 */
function toosensitive_create_tables() {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'toosensitive_emails';
    
    $charset_collate = $wpdb->get_charset_collate();
    
    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        email varchar(100) NOT NULL,
        category varchar(20) NOT NULL,
        score int(3) NOT NULL,
        date datetime DEFAULT CURRENT_TIMESTAMP,
        source varchar(50) NOT NULL,
        PRIMARY KEY (id)
    ) $charset_collate;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}
register_activation_hook(__FILE__, 'toosensitive_create_tables');

/**
 * Shortcodes
 */

// RSD Assessment Shortcode
function rsd_assessment_shortcode($atts) {
    ob_start();
    include get_template_directory() . '/includes/assessment-form.php';
    return ob_get_clean();
}
add_shortcode('rsd_assessment', 'rsd_assessment_shortcode');

// Email Signup Shortcode
function email_signup_shortcode($atts) {
    $atts = shortcode_atts(array(
        'title' => 'Stay Updated',
        'description' => 'Get the latest RSD resources and support.',
        'button_text' => 'Subscribe'
    ), $atts);
    
    ob_start();
    include get_template_directory() . '/includes/email-signup.php';
    return ob_get_clean();
}
add_shortcode('email_signup', 'email_signup_shortcode');

/**
 * Custom Walker for Navigation
 */
class TooSensitive_Walker_Nav_Menu extends Walker_Nav_Menu {
    // Custom navigation walker for better control
    function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
        $classes = empty($item->classes) ? array() : (array) $item->classes;
        $classes[] = 'menu-item-' . $item->ID;
        
        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
        $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';
        
        $id = apply_filters('nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args);
        $id = $id ? ' id="' . esc_attr($id) . '"' : '';
        
        $output .= '<li' . $id . $class_names .'>';
        
        $attributes = ! empty($item->attr_title) ? ' title="'  . esc_attr($item->attr_title) .'"' : '';
        $attributes .= ! empty($item->target) ? ' target="' . esc_attr($item->target) .'"' : '';
        $attributes .= ! empty($item->xfn) ? ' rel="'    . esc_attr($item->xfn) .'"' : '';
        $attributes .= ! empty($item->url) ? ' href="'   . esc_attr($item->url) .'"' : '';
        
        $item_output = isset($args->before) ? $args->before : '';
        $item_output .= '<a' . $attributes .'>';
        $item_output .= (isset($args->link_before) ? $args->link_before : '') . apply_filters('the_title', $item->title, $item->ID) . (isset($args->link_after) ? $args->link_after : '');
        $item_output .= '</a>';
        $item_output .= isset($args->after) ? $args->after : '';
        
        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }
}

/**
 * Admin Customizations
 */
function toosensitive_admin_init() {
    // Add custom fields to pages
    add_meta_box(
        'page_options',
        'Page Options',
        'toosensitive_page_options_callback',
        'page'
    );
}
add_action('admin_init', 'toosensitive_admin_init');

function toosensitive_page_options_callback($post) {
    wp_nonce_field('toosensitive_page_options', 'toosensitive_page_options_nonce');
    
    $hero_title = get_post_meta($post->ID, '_hero_title', true);
    $hero_subtitle = get_post_meta($post->ID, '_hero_subtitle', true);
    $show_email_signup = get_post_meta($post->ID, '_show_email_signup', true);
    
    echo '<table class="form-table">';
    echo '<tr><th><label for="hero_title">Hero Title</label></th>';
    echo '<td><input type="text" id="hero_title" name="hero_title" value="' . esc_attr($hero_title) . '" style="width: 100%;" /></td></tr>';
    echo '<tr><th><label for="hero_subtitle">Hero Subtitle</label></th>';
    echo '<td><textarea id="hero_subtitle" name="hero_subtitle" rows="3" style="width: 100%;">' . esc_textarea($hero_subtitle) . '</textarea></td></tr>';
    echo '<tr><th><label for="show_email_signup">Show Email Signup</label></th>';
    echo '<td><input type="checkbox" id="show_email_signup" name="show_email_signup" value="1" ' . checked($show_email_signup, 1, false) . ' /></td></tr>';
    echo '</table>';
}

function toosensitive_save_page_options($post_id) {
    if (!isset($_POST['toosensitive_page_options_nonce']) || !wp_verify_nonce($_POST['toosensitive_page_options_nonce'], 'toosensitive_page_options')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (!current_user_can('edit_page', $post_id)) {
        return;
    }
    
    update_post_meta($post_id, '_hero_title', sanitize_text_field($_POST['hero_title']));
    update_post_meta($post_id, '_hero_subtitle', sanitize_textarea_field($_POST['hero_subtitle']));
    update_post_meta($post_id, '_show_email_signup', isset($_POST['show_email_signup']) ? 1 : 0);
}
add_action('save_post', 'toosensitive_save_page_options');

/**
 * Security Enhancements
 */
function toosensitive_security() {
    // Remove WordPress version from head
    remove_action('wp_head', 'wp_generator');
    
    // Disable XML-RPC
    add_filter('xmlrpc_enabled', '__return_false');
    
    // Remove unnecessary scripts
    wp_deregister_script('wp-embed');
}
add_action('init', 'toosensitive_security');

/**
 * Performance Optimizations
 */
function toosensitive_performance() {
    // Remove emoji scripts
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    
    // Remove block library CSS if not using Gutenberg
    wp_dequeue_style('wp-block-library');
}
add_action('wp_enqueue_scripts', 'toosensitive_performance');

?>