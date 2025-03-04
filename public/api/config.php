<?php
require_once __DIR__ . '/env.php';

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', dirname($_SERVER['DOCUMENT_ROOT']) . '/logs/error.log');

// Database configuration
define('DB_HOST', getenv_default('DB_HOST', 'localhost'));
define('DB_USER', getenv_default('DB_USER', ''));
define('DB_PASS', getenv_default('DB_PASS', ''));
define('DB_NAME', getenv_default('DB_NAME', ''));

// API Settings
define('ALLOWED_ORIGIN', getenv_default('ALLOWED_ORIGIN', ''));
define('MAX_REQUESTS_PER_MINUTE', getenv_default('MAX_REQUESTS_PER_MINUTE', 60));

// Security
define('CSRF_TOKEN_NAME', 'csrf_token');
define('SESSION_TIMEOUT', 1800); // 30 minutes

/**
 * Initialize secure session with configurable options
 * @return void
 */
function initializeSecureSession() {
    // Session cookie settings
    $secure = true;
    $httponly = true;
    $samesite = 'Strict';
    $lifetime = SESSION_TIMEOUT;
    
    // Configure session settings
    ini_set('session.cookie_httponly', $httponly);
    ini_set('session.cookie_secure', $secure);
    ini_set('session.use_only_cookies', 1);
    ini_set('session.cookie_samesite', $samesite);
    ini_set('session.gc_maxlifetime', $lifetime);
    ini_set('session.cookie_lifetime', $lifetime);
    
    // Additional security measures
    ini_set('session.use_strict_mode', 1);
    ini_set('session.cookie_path', '/');
    
    // Start session if not already started
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    // Regenerate session ID periodically
    if (!isset($_SESSION['last_regeneration'])) {
        session_regenerate_id(true);
        $_SESSION['last_regeneration'] = time();
    } elseif (time() - $_SESSION['last_regeneration'] > 3600) {
        session_regenerate_id(true);
        $_SESSION['last_regeneration'] = time();
    }
}
?>