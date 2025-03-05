<?php
// Load environment variables from .user.ini if available
$env_file = $_SERVER['DOCUMENT_ROOT'] . '/.user.ini';
$loaded_env = false;

if (file_exists($env_file)) {
    $env_vars = parse_ini_file($env_file);
    if ($env_vars !== false) {
        foreach ($env_vars as $key => $value) {
            putenv("$key=$value");
        }
        $loaded_env = true;
    }
}

// Fallback to credentials.php if .user.ini couldn't be loaded
if (!$loaded_env) {
    // Path assuming API is in public_html/api/ and variables is in cPanel root
    $fallback_file = $_SERVER['DOCUMENT_ROOT'] . '/../variables/credentials.php';
    if (file_exists($fallback_file)) {
        include_once($fallback_file);
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
    return $value !== false ? $value : $default;
}
?>