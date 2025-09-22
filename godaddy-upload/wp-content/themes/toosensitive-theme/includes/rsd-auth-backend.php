<?php
/**
 * RSD Authentication Backend Functions
 * Handles user authentication, registration, and data management for RSD Emergency Center
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class RSDAuthBackend {
    
    public function __construct() {
        $this->init_hooks();
    }
    
    /**
     * Initialize WordPress hooks
     */
    private function init_hooks() {
        // AJAX handlers for non-logged-in users
        add_action('wp_ajax_nopriv_rsd_check_auth_status', array($this, 'check_auth_status'));
        add_action('wp_ajax_nopriv_rsd_user_login', array($this, 'handle_user_login'));
        add_action('wp_ajax_nopriv_rsd_user_register', array($this, 'handle_user_register'));
        
        // AJAX handlers for logged-in users
        add_action('wp_ajax_rsd_check_auth_status', array($this, 'check_auth_status'));
        add_action('wp_ajax_rsd_user_logout', array($this, 'handle_user_logout'));
        add_action('wp_ajax_rsd_get_user_preferences', array($this, 'get_user_preferences'));
        add_action('wp_ajax_rsd_get_user_crisis_history', array($this, 'get_user_crisis_history'));
        add_action('wp_ajax_rsd_get_user_mood_data', array($this, 'get_user_mood_data'));
        add_action('wp_ajax_rsd_save_user_data', array($this, 'save_user_data'));
        
        // Custom user meta fields
        add_action('user_register', array($this, 'save_custom_user_fields'));
        add_action('personal_options_update', array($this, 'save_custom_user_fields'));
        add_action('edit_user_profile_update', array($this, 'save_custom_user_fields'));
        
        // Create custom database tables
        add_action('init', array($this, 'create_custom_tables'));
    }
    
    /**
     * Check current authentication status
     */
    public function check_auth_status() {
        $response = array();
        
        if (is_user_logged_in()) {
            $current_user = wp_get_current_user();
            
            $response = array(
                'authenticated' => true,
                'user' => array(
                    'ID' => $current_user->ID,
                    'email' => $current_user->user_email,
                    'display_name' => $current_user->display_name,
                    'first_name' => $current_user->first_name,
                    'last_name' => $current_user->last_name,
                    'avatar_url' => get_avatar_url($current_user->ID),
                    'registration_date' => $current_user->user_registered,
                    'rsd_preferences' => get_user_meta($current_user->ID, 'rsd_preferences', true)
                )
            );
        } else {
            $response = array(
                'authenticated' => false,
                'user' => null
            );
        }
        
        wp_send_json_success($response);
    }
    
    /**
     * Handle user login
     */
    public function handle_user_login() {
        // Verify nonce for security
        if (!$this->verify_request()) {
            wp_send_json_error(array('message' => 'Security verification failed.'));
            return;
        }
        
        $email = sanitize_email($_POST['email']);
        $password = sanitize_text_field($_POST['password']);
        $remember_me = isset($_POST['remember_me']) && $_POST['remember_me'] == '1';
        
        // Validate input
        if (empty($email) || empty($password)) {
            wp_send_json_error(array('message' => 'Please provide both email and password.'));
            return;
        }
        
        if (!is_email($email)) {
            wp_send_json_error(array('message' => 'Please provide a valid email address.'));
            return;
        }
        
        // Get user by email
        $user = get_user_by('email', $email);
        
        if (!$user) {
            wp_send_json_error(array('message' => 'No account found with this email address.'));
            return;
        }
        
        // Verify password
        if (!wp_check_password($password, $user->data->user_pass, $user->ID)) {
            wp_send_json_error(array('message' => 'Incorrect password. Please try again.'));
            return;
        }
        
        // Check if user account is active
        if (get_user_meta($user->ID, 'account_status', true) === 'inactive') {
            wp_send_json_error(array('message' => 'Your account is inactive. Please contact support.'));
            return;
        }
        
        // Log the user in
        wp_set_current_user($user->ID);
        wp_set_auth_cookie($user->ID, $remember_me);
        
        // Update last login time
        update_user_meta($user->ID, 'last_login', current_time('mysql'));
        
        // Log the login event
        $this->log_user_activity($user->ID, 'login', array(
            'ip_address' => $this->get_user_ip(),
            'user_agent' => sanitize_text_field($_SERVER['HTTP_USER_AGENT'])
        ));
        
        // Prepare response
        $response = array(
            'message' => 'Login successful!',
            'user' => array(
                'ID' => $user->ID,
                'email' => $user->user_email,
                'display_name' => $user->display_name,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'avatar_url' => get_avatar_url($user->ID)
            )
        );
        
        wp_send_json_success($response);
    }
    
    /**
     * Handle user registration
     */
    public function handle_user_register() {
        // Verify nonce for security
        if (!$this->verify_request()) {
            wp_send_json_error(array('message' => 'Security verification failed.'));
            return;
        }
        
        $first_name = sanitize_text_field($_POST['first_name']);
        $last_name = sanitize_text_field($_POST['last_name']);
        $email = sanitize_email($_POST['email']);
        $password = sanitize_text_field($_POST['password']);
        $email_updates = isset($_POST['email_updates']) && $_POST['email_updates'] == '1';
        
        // Validate input
        if (empty($first_name) || empty($last_name) || empty($email) || empty($password)) {
            wp_send_json_error(array('message' => 'Please fill in all required fields.'));
            return;
        }
        
        if (!is_email($email)) {
            wp_send_json_error(array('message' => 'Please provide a valid email address.'));
            return;
        }
        
        if (strlen($password) < 8) {
            wp_send_json_error(array('message' => 'Password must be at least 8 characters long.'));
            return;
        }
        
        // Check if email already exists
        if (email_exists($email)) {
            wp_send_json_error(array('message' => 'An account with this email address already exists.'));
            return;
        }
        
        // Create username from email
        $username = $this->generate_username_from_email($email);
        
        // Check if username already exists
        if (username_exists($username)) {
            $username = $username . '_' . rand(100, 999);
        }
        
        // Create the user
        $user_id = wp_create_user($username, $password, $email);
        
        if (is_wp_error($user_id)) {
            wp_send_json_error(array('message' => 'Registration failed. Please try again.'));
            return;
        }
        
        // Update user meta
        update_user_meta($user_id, 'first_name', $first_name);
        update_user_meta($user_id, 'last_name', $last_name);
        update_user_meta($user_id, 'email_updates', $email_updates ? 'yes' : 'no');
        update_user_meta($user_id, 'registration_ip', $this->get_user_ip());
        update_user_meta($user_id, 'account_status', 'active');
        
        // Set display name
        wp_update_user(array(
            'ID' => $user_id,
            'display_name' => $first_name . ' ' . $last_name,
            'nickname' => $first_name
        ));
        
        // Initialize default RSD preferences
        $default_preferences = array(
            'theme' => 'default',
            'notifications' => true,
            'crisis_alerts' => true,
            'mood_reminders' => true,
            'emergency_contacts' => array(),
            'preferred_coping_strategies' => array()
        );
        update_user_meta($user_id, 'rsd_preferences', $default_preferences);
        
        // Log the registration event
        $this->log_user_activity($user_id, 'register', array(
            'ip_address' => $this->get_user_ip(),
            'user_agent' => sanitize_text_field($_SERVER['HTTP_USER_AGENT'])
        ));
        
        // Send welcome email
        $this->send_welcome_email($user_id);
        
        wp_send_json_success(array('message' => 'Account created successfully! Please sign in.'));
    }
    
    /**
     * Handle user logout
     */
    public function handle_user_logout() {
        if (!is_user_logged_in()) {
            wp_send_json_error(array('message' => 'User not logged in.'));
            return;
        }
        
        $user_id = get_current_user_id();
        
        // Log the logout event
        $this->log_user_activity($user_id, 'logout', array(
            'ip_address' => $this->get_user_ip()
        ));
        
        // Clear authentication
        wp_logout();
        
        wp_send_json_success(array('message' => 'Logged out successfully.'));
    }
    
    /**
     * Get user preferences
     */
    public function get_user_preferences() {
        if (!is_user_logged_in()) {
            wp_send_json_error(array('message' => 'Authentication required.'));
            return;
        }
        
        $user_id = get_current_user_id();
        $preferences = get_user_meta($user_id, 'rsd_preferences', true);
        
        if (!$preferences) {
            $preferences = array(
                'theme' => 'default',
                'notifications' => true,
                'crisis_alerts' => true,
                'mood_reminders' => true,
                'emergency_contacts' => array(),
                'preferred_coping_strategies' => array()
            );
            update_user_meta($user_id, 'rsd_preferences', $preferences);
        }
        
        wp_send_json_success(array('preferences' => $preferences));
    }
    
    /**
     * Get user crisis history
     */
    public function get_user_crisis_history() {
        if (!is_user_logged_in()) {
            wp_send_json_error(array('message' => 'Authentication required.'));
            return;
        }
        
        $user_id = get_current_user_id();
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'rsd_crisis_logs';
        
        $crisis_history = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM $table_name WHERE user_id = %d ORDER BY created_at DESC LIMIT 50",
            $user_id
        ));
        
        wp_send_json_success(array('history' => $crisis_history));
    }
    
    /**
     * Get user mood data
     */
    public function get_user_mood_data() {
        if (!is_user_logged_in()) {
            wp_send_json_error(array('message' => 'Authentication required.'));
            return;
        }
        
        $user_id = get_current_user_id();
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'rsd_mood_tracking';
        
        $mood_data = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM $table_name WHERE user_id = %d ORDER BY created_at DESC LIMIT 100",
            $user_id
        ));
        
        wp_send_json_success(array('mood_data' => $mood_data));
    }
    
    /**
     * Save user data
     */
    public function save_user_data() {
        if (!is_user_logged_in()) {
            wp_send_json_error(array('message' => 'Authentication required.'));
            return;
        }
        
        $user_id = get_current_user_id();
        $data_type = sanitize_text_field($_POST['data_type']);
        $data = json_decode(stripslashes($_POST['data']), true);
        
        global $wpdb;
        
        switch ($data_type) {
            case 'crisis_event':
                $table_name = $wpdb->prefix . 'rsd_crisis_logs';
                $result = $wpdb->insert(
                    $table_name,
                    array(
                        'user_id' => $user_id,
                        'crisis_type' => sanitize_text_field($data['type']),
                        'severity_level' => intval($data['severity']),
                        'triggers' => sanitize_textarea_field($data['triggers']),
                        'coping_strategies_used' => sanitize_textarea_field($data['coping_strategies']),
                        'duration_minutes' => intval($data['duration']),
                        'notes' => sanitize_textarea_field($data['notes']),
                        'created_at' => current_time('mysql')
                    ),
                    array('%d', '%s', '%d', '%s', '%s', '%d', '%s', '%s')
                );
                break;
                
            case 'mood_entry':
                $table_name = $wpdb->prefix . 'rsd_mood_tracking';
                $result = $wpdb->insert(
                    $table_name,
                    array(
                        'user_id' => $user_id,
                        'mood_rating' => intval($data['rating']),
                        'emotional_state' => sanitize_text_field($data['emotional_state']),
                        'energy_level' => intval($data['energy_level']),
                        'stress_level' => intval($data['stress_level']),
                        'notes' => sanitize_textarea_field($data['notes']),
                        'created_at' => current_time('mysql')
                    ),
                    array('%d', '%d', '%s', '%d', '%d', '%s', '%s')
                );
                break;
                
            case 'preferences':
                $result = update_user_meta($user_id, 'rsd_preferences', $data);
                break;
                
            default:
                wp_send_json_error(array('message' => 'Invalid data type.'));
                return;
        }
        
        if ($result !== false) {
            wp_send_json_success(array('message' => 'Data saved successfully.'));
        } else {
            wp_send_json_error(array('message' => 'Failed to save data.'));
        }
    }
    
    /**
     * Create custom database tables
     */
    public function create_custom_tables() {
        global $wpdb;
        
        $charset_collate = $wpdb->get_charset_collate();
        
        // Crisis logs table
        $crisis_table_name = $wpdb->prefix . 'rsd_crisis_logs';
        $crisis_sql = "CREATE TABLE $crisis_table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            user_id bigint(20) NOT NULL,
            crisis_type varchar(100) NOT NULL,
            severity_level tinyint(1) NOT NULL,
            triggers text,
            coping_strategies_used text,
            duration_minutes int(11),
            notes text,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY user_id (user_id),
            KEY created_at (created_at)
        ) $charset_collate;";
        
        // Mood tracking table
        $mood_table_name = $wpdb->prefix . 'rsd_mood_tracking';
        $mood_sql = "CREATE TABLE $mood_table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            user_id bigint(20) NOT NULL,
            mood_rating tinyint(1) NOT NULL,
            emotional_state varchar(100),
            energy_level tinyint(1),
            stress_level tinyint(1),
            notes text,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY user_id (user_id),
            KEY created_at (created_at)
        ) $charset_collate;";
        
        // User activity logs table
        $activity_table_name = $wpdb->prefix . 'rsd_user_activity';
        $activity_sql = "CREATE TABLE $activity_table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            user_id bigint(20) NOT NULL,
            activity_type varchar(50) NOT NULL,
            activity_data text,
            ip_address varchar(45),
            user_agent text,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY user_id (user_id),
            KEY activity_type (activity_type),
            KEY created_at (created_at)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($crisis_sql);
        dbDelta($mood_sql);
        dbDelta($activity_sql);
    }
    
    /**
     * Save custom user fields
     */
    public function save_custom_user_fields($user_id) {
        if (isset($_POST['rsd_emergency_contacts'])) {
            update_user_meta($user_id, 'rsd_emergency_contacts', sanitize_textarea_field($_POST['rsd_emergency_contacts']));
        }
        
        if (isset($_POST['rsd_preferred_coping_strategies'])) {
            update_user_meta($user_id, 'rsd_preferred_coping_strategies', sanitize_textarea_field($_POST['rsd_preferred_coping_strategies']));
        }
    }
    
    /**
     * Generate username from email
     */
    private function generate_username_from_email($email) {
        $username = sanitize_user(current(explode('@', $email)), true);
        
        // Remove any remaining invalid characters
        $username = preg_replace('/[^a-zA-Z0-9_]/', '', $username);
        
        // Ensure minimum length
        if (strlen($username) < 3) {
            $username = 'user_' . rand(1000, 9999);
        }
        
        return $username;
    }
    
    /**
     * Get user IP address
     */
    private function get_user_ip() {
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            return sanitize_text_field($_SERVER['HTTP_CLIENT_IP']);
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            return sanitize_text_field($_SERVER['HTTP_X_FORWARDED_FOR']);
        } else {
            return sanitize_text_field($_SERVER['REMOTE_ADDR']);
        }
    }
    
    /**
     * Log user activity
     */
    private function log_user_activity($user_id, $activity_type, $activity_data = array()) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'rsd_user_activity';
        
        $wpdb->insert(
            $table_name,
            array(
                'user_id' => $user_id,
                'activity_type' => $activity_type,
                'activity_data' => json_encode($activity_data),
                'ip_address' => $this->get_user_ip(),
                'user_agent' => sanitize_text_field($_SERVER['HTTP_USER_AGENT']),
                'created_at' => current_time('mysql')
            ),
            array('%d', '%s', '%s', '%s', '%s', '%s')
        );
    }
    
    /**
     * Send welcome email
     */
    private function send_welcome_email($user_id) {
        $user = get_userdata($user_id);
        
        if (!$user) {
            return;
        }
        
        $subject = 'Welcome to TooSensitive - Your RSD Support Journey Begins';
        
        $message = "
        <html>
        <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
            <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
                <h1 style='color: #007bff; text-align: center;'>Welcome to TooSensitive!</h1>
                
                <p>Dear {$user->first_name},</p>
                
                <p>Welcome to our supportive community! We're thrilled to have you join us on this journey toward better understanding and managing Rejection Sensitive Dysphoria (RSD).</p>
                
                <h3>Your account is now ready:</h3>
                <ul>
                    <li>✅ Access to personalized RSD Emergency Center</li>
                    <li>✅ Crisis detection and management tools</li>
                    <li>✅ Mood tracking and analytics</li>
                    <li>✅ Peer support network</li>
                    <li>✅ Customizable coping strategies</li>
                </ul>
                
                <h3>Getting Started:</h3>
                <ol>
                    <li>Log in to access your Emergency Center</li>
                    <li>Complete your preference settings</li>
                    <li>Add emergency contacts</li>
                    <li>Explore available coping strategies</li>
                </ol>
                
                <div style='background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;'>
                    <h4 style='margin-top: 0; color: #007bff;'>🚨 Emergency Support</h4>
                    <p>Remember: If you're experiencing a severe crisis, please reach out to emergency services or crisis hotlines immediately. Our tools are designed to supplement, not replace, professional mental health care.</p>
                </div>
                
                <p>If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>
                
                <p>Take care,<br>
                The TooSensitive Team</p>
                
                <hr style='margin: 30px 0; border: none; border-top: 1px solid #eee;'>
                <p style='font-size: 12px; color: #666; text-align: center;'>
                    This email was sent to {$user->user_email}. 
                    If you didn't create this account, please contact us immediately.
                </p>
            </div>
        </body>
        </html>
        ";
        
        $headers = array(
            'Content-Type: text/html; charset=UTF-8',
            'From: TooSensitive Support <support@toosensitive.com>'
        );
        
        wp_mail($user->user_email, $subject, $message, $headers);
    }
    
    /**
     * Verify request security
     */
    private function verify_request() {
        // For now, we'll use basic verification
        // In production, you should implement proper nonce verification
        return true;
    }
}

// Initialize the authentication backend
new RSDAuthBackend();