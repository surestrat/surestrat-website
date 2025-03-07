<?php
/**
 * Environment variables loader
 * 
 * IMPORTANT: In production, move this file and secrets.php outside the web root!
 * Example location: /home/username/config/secrets.php (one level above document root)
 */

// Path to secrets file outside web root (for production)
$secretsPath = dirname($_SERVER['DOCUMENT_ROOT']) . '/config/secrets.php';

// For development, try local secrets file
$devSecretsPath = __DIR__ . '/../../secrets.php';

// First try production path (outside web root)
if (file_exists($secretsPath)) {
    require_once $secretsPath;
} 
// Then try development path (for local development)
elseif (file_exists($devSecretsPath)) {
    require_once $devSecretsPath;
} 
// Finally, try to use the .env approach
else {
    // Log that we're using fallback method
    file_put_contents(__DIR__ . '/logs/env_warning.log', 
        date('[Y-m-d H:i:s]') . " Warning: Using fallback method for environment variables\n", 
        FILE_APPEND);
    
    // Try to load from .user.ini in cPanel
    if (function_exists('getenv')) {
        // Environment variables should already be loaded by the system
        // Or we can try to parse .env file here if needed
    }
}

/**
 * Get environment variable with fallback default value
 * @param string $key Environment variable name
 * @param mixed $default Default value if not found
 * @return mixed
 */
function getenv_default($key, $default = null) {
    $value = getenv($key);
    if ($value === false) {
        // If not found in environment, check if defined as constant
        if (defined($key)) {
            return constant($key);
        }
        return $default;
    }
    return $value;
}
?>