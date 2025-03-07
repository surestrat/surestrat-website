<?php
/**
 * DATABASE CONFIGURATION
 * 
 * IMPORTANT: 
 * 1. Copy this file to 'secrets.php' in the same directory for development
 * 2. In production, place it at /home/username/config/secrets.php (above document root)
 * 3. Never commit the actual secrets.php to version control
 */

// Database connection details
define('DB_HOST', 'your-database-host.com');
define('DB_PORT', '5432');
define('DB_NAME', 'your_database_name');
define('DB_USER', 'your_database_user');
define('DB_PASSWORD', 'your_database_password');

// Set as environment variables as well
putenv("DB_HOST=".DB_HOST);
putenv("DB_PORT=".DB_PORT);
putenv("DB_NAME=".DB_NAME);
putenv("DB_USER=".DB_USER);
putenv("DB_PASSWORD=".DB_PASSWORD);

// API keys and other secrets
define('API_KEY', 'your_api_key_if_needed');
putenv("API_KEY=".API_KEY);

// Log directory location
define('LOG_DIR', dirname($_SERVER['DOCUMENT_ROOT']) . '/logs');  // Outside web root
putenv("LOG_DIR=".LOG_DIR);
?>
