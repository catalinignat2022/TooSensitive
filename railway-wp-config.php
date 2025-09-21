<?php
/**
 * WordPress Configuration File for TooSensitive - Railway Deployment
 * This config uses Railway environment variables
 */

// ** Database settings - using Railway environment variables ** //
define('DB_NAME', $_ENV['MYSQL_DATABASE'] ?? $_ENV['DB_NAME'] ?? 'toosensitive_wp');
define('DB_USER', $_ENV['MYSQL_USER'] ?? $_ENV['DB_USER'] ?? 'root');
define('DB_PASSWORD', $_ENV['MYSQL_PASSWORD'] ?? $_ENV['DB_PASSWORD'] ?? '');
define('DB_HOST', $_ENV['MYSQL_HOST'] ?? $_ENV['DB_HOST'] ?? 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 * You can generate these using: https://api.wordpress.org/secret-key/1.1/salt/
 */
define('AUTH_KEY',         $_ENV['AUTH_KEY'] ?? 'B#x&K$9mN@pQ2wE*F!gH3jL6vC8sA5dR7tY4uI1oP0qW9eM^zX%cV&nB#m@kJ!hG');
define('SECURE_AUTH_KEY',  $_ENV['SECURE_AUTH_KEY'] ?? 'P3wE*F!gH6jL9vC2sA5dR8tY1uI4oQ7qW0eM^zX%cV&nB#m@kJ!hG3bL6xK$9mN@');
define('LOGGED_IN_KEY',    $_ENV['LOGGED_IN_KEY'] ?? 'F!gH9jL2vC5sA8dR1tY4uI7oQ0qW3eM^zX%cV&nB#m@kJ!hG6bL9xK$2mN@pP5wE');
define('NONCE_KEY',        $_ENV['NONCE_KEY'] ?? 'L2vC5sA8dR1tY4uI7oQ0qW3eM^zX%cV&nB#m@kJ!hG6bL9xK$2mN@pP5wE*F!gH9');
define('AUTH_SALT',        $_ENV['AUTH_SALT'] ?? 'sA8dR1tY4uI7oQ0qW3eM^zX%cV&nB#m@kJ!hG6bL9xK$2mN@pP5wE*F!gH9jL2vC');
define('SECURE_AUTH_SALT', $_ENV['SECURE_AUTH_SALT'] ?? 'Y4uI7oQ0qW3eM^zX%cV&nB#m@kJ!hG6bL9xK$2mN@pP5wE*F!gH9jL2vC5sA8dR1');
define('LOGGED_IN_SALT',   $_ENV['LOGGED_IN_SALT'] ?? 'oQ0qW3eM^zX%cV&nB#m@kJ!hG6bL9xK$2mN@pP5wE*F!gH9jL2vC5sA8dR1tY4uI');
define('NONCE_SALT',       $_ENV['NONCE_SALT'] ?? 'M^zX%cV&nB#m@kJ!hG6bL9xK$2mN@pP5wE*F!gH9jL2vC5sA8dR1tY4uI7oQ0qW3');

/**#@-*/

/**
 * WordPress Database Table prefix.
 */
$table_prefix = $_ENV['DB_TABLE_PREFIX'] ?? 'ts_';

/**
 * WordPress URLs - Dynamic based on Railway deployment
 */
$railway_url = $_ENV['RAILWAY_PUBLIC_DOMAIN'] ?? $_ENV['RAILWAY_STATIC_URL'] ?? '';
if ($railway_url) {
    define('WP_HOME', 'https://' . $railway_url);
    define('WP_SITEURL', 'https://' . $railway_url);
} else {
    // Fallback to auto-detection
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    define('WP_HOME', $protocol . '://' . $host);
    define('WP_SITEURL', $protocol . '://' . $host);
}

/**
 * Set Apache ServerName environment variable for Railway
 */
if (!empty($railway_url)) {
    putenv('APACHE_SERVER_NAME=' . $railway_url);
}

/**
 * For developers: WordPress debugging mode.
 */
$debug_mode = $_ENV['WP_DEBUG'] ?? $_ENV['RAILWAY_ENVIRONMENT'] === 'development';
define('WP_DEBUG', filter_var($debug_mode, FILTER_VALIDATE_BOOLEAN));
define('WP_DEBUG_LOG', WP_DEBUG);
define('WP_DEBUG_DISPLAY', WP_DEBUG && $_ENV['RAILWAY_ENVIRONMENT'] === 'development');

/**
 * Suppress PHP deprecation warnings from plugins
 * This is a temporary fix for Yoast SEO PHP 8.4 compatibility issues
 */
error_reporting(E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED);

/**
 * Custom error handler to suppress specific Yoast SEO deprecation warnings
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
 * Security and performance settings for production
 */
define('DISALLOW_FILE_EDIT', true);
define('DISALLOW_FILE_MODS', $_ENV['RAILWAY_ENVIRONMENT'] === 'production');
define('AUTOMATIC_UPDATER_DISABLED', false);
define('WP_AUTO_UPDATE_CORE', true);

/**
 * Memory and performance settings
 */
define('WP_MEMORY_LIMIT', $_ENV['WP_MEMORY_LIMIT'] ?? '512M');
define('WP_MAX_MEMORY_LIMIT', $_ENV['WP_MAX_MEMORY_LIMIT'] ?? '512M');

/**
 * SSL and security - Force HTTPS on Railway
 */
if ($_ENV['RAILWAY_ENVIRONMENT'] === 'production') {
    define('FORCE_SSL_ADMIN', true);
    // Force HTTPS
    if (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] !== 'on') {
        if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
            $_SERVER['HTTPS'] = 'on';
        }
    }
}

/**
 * Cache settings
 */
define('WP_CACHE', true);

/**
 * Custom uploads directory
 */
define('UPLOADS', 'wp-content/uploads');

/**
 * Railway-specific optimizations
 */
// Trust Railway proxy headers
if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_X_FORWARDED_FOR'];
}

// Set proper scheme detection for Railway
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
    $_SERVER['HTTPS'] = 'on';
}

/* Add any custom values between this line and the "stop editing" comment. */

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';