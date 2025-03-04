<?php
// Load environment variables from .user.ini if available
$env_file = $_SERVER['DOCUMENT_ROOT'] . '/.user.ini';
if (file_exists($env_file)) {
    $env_vars = parse_ini_file($env_file);
    foreach ($env_vars as $key => $value) {
        putenv("$key=$value");
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