<?php
/**
 * WordPress Configuration for TooSensitive - GoDaddy Hosting
 * Optimized for GoDaddy shared/managed hosting environment
 */

// ** Database settings - GoDaddy MySQL ** //
// Înlocuiește valorile cu cele din GoDaddy hosting panel
define('DB_NAME', 'your_database_name');
define('DB_USER', 'your_database_user');
define('DB_PASSWORD', 'your_database_password');
define('DB_HOST', 'localhost'); // Sau hostname-ul specific din GoDaddy panel
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 * Generează noi chei pe: https://api.wordpress.org/secret-key/1.1/salt/
 */
define('AUTH_KEY',         'pune-aici-cheia-unica-generata');
define('SECURE_AUTH_KEY',  'pune-aici-cheia-unica-generata');
define('LOGGED_IN_KEY',    'pune-aici-cheia-unica-generata');
define('NONCE_KEY',        'pune-aici-cheia-unica-generata');
define('AUTH_SALT',        'pune-aici-cheia-unica-generata');
define('SECURE_AUTH_SALT', 'pune-aici-cheia-unica-generata');
define('LOGGED_IN_SALT',   'pune-aici-cheia-unica-generata');
define('NONCE_SALT',       'pune-aici-cheia-unica-generata');
/**#@-*/

/**
 * WordPress Database Table prefix.
 */
$table_prefix = 'ts_';

/**
 * WordPress URLs - Auto-detection pentru GoDaddy
 */
$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
$domain = $_SERVER['HTTP_HOST'] ?? 'rejectionsensitive.com';
define('WP_HOME', $protocol . '://' . $domain);
define('WP_SITEURL', $protocol . '://' . $domain);

/**
 * SSL Configuration pentru GoDaddy
 */
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
    $_SERVER['HTTPS'] = 'on';
}

/**
 * Debug settings - OFF pentru producție
 */
define('WP_DEBUG', false);
define('WP_DEBUG_LOG', false);
define('WP_DEBUG_DISPLAY', false);

/**
 * Suppress PHP deprecation warnings - Fix pentru Yoast SEO
 * Această configuraţie rezolvă warning-urile de la Yoast SEO cu PHP 8.4
 */
error_reporting(E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED);

/**
 * Custom error handler pentru Yoast SEO deprecation warnings
 */
if (!function_exists('ts_custom_error_handler')) {
    function ts_custom_error_handler($errno, $errstr, $errfile, $errline) {
        // Suppress Yoast SEO Symfony deprecation warnings
        if (strpos($errstr, 'YoastSEO_Vendor\Symfony\Component\DependencyInjection\Container') !== false) {
            return true; // Suppress the error
        }
        return false; // Let other errors show normally
    }
    set_error_handler('ts_custom_error_handler', E_DEPRECATED | E_USER_DEPRECATED);
}

/**
 * Security și performance pentru GoDaddy hosting
 */
define('DISALLOW_FILE_EDIT', true);
define('DISALLOW_FILE_MODS', false); // Permitem update-uri pe GoDaddy
define('AUTOMATIC_UPDATER_DISABLED', false);
define('WP_AUTO_UPDATE_CORE', true);

/**
 * Memory settings optimizate pentru GoDaddy shared hosting
 */
define('WP_MEMORY_LIMIT', '256M');
define('WP_MAX_MEMORY_LIMIT', '512M');

/**
 * Cache settings
 */
define('WP_CACHE', true);

/**
 * File permissions - optimizate pentru GoDaddy
 */
define('FS_CHMOD_DIR', (0755 & ~ umask()));
define('FS_CHMOD_FILE', (0644 & ~ umask()));

/**
 * Upload settings
 */
define('UPLOADS', 'wp-content/uploads');

/**
 * GoDaddy specific optimizations
 */
// Trust GoDaddy proxy headers
if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_X_FORWARDED_FOR'];
}

// Forțează SSL pe GoDaddy în producție
if (strpos($_SERVER['HTTP_HOST'], 'rejectionsensitive.com') !== false) {
    define('FORCE_SSL_ADMIN', true);
}

/* Add any custom values between this line and the "stop editing" comment. */

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';