<?php
// Load environment variables - this file should be protected outside the web root
require_once 'env.php';

/**
 * Get PostgreSQL PDO connection
 */
function getPgConnection() {
    try {
        // Get connection parameters from environment variables with fallbacks
        $host = getenv_default('DB_HOST', '');
        $port = getenv_default('DB_PORT', '5432');
        $dbname = getenv_default('DB_NAME', '');
        $user = getenv_default('DB_USER', '');
        $password = getenv_default('DB_PASSWORD', '');
        
        // Construct DSN
        $dsn = "pgsql:host={$host};port={$port};dbname={$dbname}";
        
        // Options array for PDO
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ];
        
        // Create a new PDO instance
        $pdo = new PDO($dsn, $user, $password, $options);
        
        // Set application name for better database logging
        $pdo->exec("SET application_name = 'surestrat_website'");
        
        return $pdo;
    } catch (PDOException $e) {
        // Log the error without exposing credentials
        logMessage("Database connection error: " . $e->getMessage(), 'db_error_log.txt');
        throw new Exception('Database connection failed. Please contact support.', 500);
    }
}

/**
 * Log messages to a file
 * @param string $message The message to log
 * @param string $logFile The log file name
 */
function logMessage($message, $logFile) {
    $logDir = getenv_default('LOG_DIR', __DIR__ . '/logs');
    
    // Create logs directory if it doesn't exist
    if (!is_dir($logDir)) {
        mkdir($logDir, 0755, true);
    }
    
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[{$timestamp}] {$message}" . PHP_EOL;
    file_put_contents($logDir . '/' . $logFile, $logEntry, FILE_APPEND);
}

/**
 * Validates the form data
 * @param array $data The form data to validate
 * @throws Exception if validation fails
 */
function validateFormData($data) {
    // Required fields
    $requiredFields = ['firstName', 'lastName', 'idNumber', 'phone', 'email', 'province', 'insuranceTypes'];
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            throw new Exception("Missing required field: {$field}", 400);
        }
    }

    // Email validation
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format', 400);
    }

    // Phone validation (South African format)
    if (!preg_match('/^(\+27|0)[6-8][0-9]{8}$/', $data['phone'])) {
        throw new Exception('Invalid phone number format', 400);
    }

    // ID number validation (South African ID)
    if (!preg_match('/^\d{13}$/', $data['idNumber'])) {
        throw new Exception('Invalid ID number format', 400);
    }

    // Insurance types must be an array
    if (!is_array($data['insuranceTypes']) || empty($data['insuranceTypes'])) {
        throw new Exception('At least one insurance type must be selected', 400);
    }

    // Terms must be accepted
    if (!isset($data['termsAccepted']) || $data['termsAccepted'] !== true) {
        throw new Exception('Terms and conditions must be accepted', 400);
    }
}
?>