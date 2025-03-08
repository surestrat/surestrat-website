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
 * Sanitize input to prevent XSS
 * @param mixed $data The data to sanitize
 * @return mixed The sanitized data
 */
function sanitizeInput($data) {
    if (is_array($data)) {
        foreach ($data as $key => $value) {
            $data[$key] = sanitizeInput($value);
        }
    } else {
        $data = htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
    }
    return $data;
}

/**
 * Validates the form data
 * @param array $data The form data to validate
 * @throws Exception if validation fails
 */
function validateFormData($data) {
    // Basic data structure validation
    if (!is_array($data)) {
        throw new Exception('Invalid data format submitted', 400);
    }
    
    // Check for maximum data size
    if (strlen(json_encode($data)) > 500000) { // ~500KB limit
        throw new Exception('Request data too large', 400);
    }

    // Required fields with specific validation
    $requiredFields = [
        'firstName' => [
            'minLength' => 2,
            'maxLength' => 50,
            'pattern' => '/^[A-Za-z\s\-\']+$/',
            'message' => 'First name must be 2-50 characters and contain only letters, spaces, hyphens and apostrophes'
        ],
        'lastName' => [
            'minLength' => 1,
            'maxLength' => 50,
            'pattern' => '/^[A-Za-z\s\-\']+$/',
            'message' => 'Last name must be 1-50 characters and contain only letters, spaces, hyphens and apostrophes'
        ],
        'idNumber' => [
            'pattern' => '/^\d{13}$/',
            'message' => 'ID number must be 13 digits'
        ],
        'phone' => [
            'pattern' => '/^(\+27|0)[6-8][0-9]{8}$/',
            'message' => 'Invalid phone number format'
        ],
        'email' => [
            'filter' => FILTER_VALIDATE_EMAIL,
            'message' => 'Invalid email format'
        ],
        'province' => [
            'oneOf' => ['gauteng', 'western-cape', 'kwazulu-natal', 'eastern-cape', 'free-state', 'limpopo', 'mpumalanga', 'north-west', 'northern-cape'],
            'message' => 'Invalid province selected'
        ],
        'insuranceTypes' => [
            'isArray' => true,
            'nonEmpty' => true,
            'message' => 'At least one insurance type must be selected'
        ],
        'termsAccepted' => [
            'equals' => true,
            'message' => 'Terms and conditions must be accepted'
        ]
    ];

    // Validate each required field
    foreach ($requiredFields as $field => $rules) {
        // Check if the field exists
        if (!isset($data[$field])) {
            throw new Exception("Missing required field: {$field}", 400);
        }

        $value = $data[$field];

        // Check if the field is not empty
        if (($rules['nonEmpty'] ?? false) && empty($value)) {
            throw new Exception("Field cannot be empty: {$field}", 400);
        }

        // Check specific validations
        if (isset($rules['minLength']) && strlen($value) < $rules['minLength']) {
            throw new Exception($rules['message'], 400);
        }

        if (isset($rules['maxLength']) && strlen($value) > $rules['maxLength']) {
            throw new Exception($rules['message'], 400);
        }

        if (isset($rules['pattern']) && !preg_match($rules['pattern'], $value)) {
            throw new Exception($rules['message'], 400);
        }

        if (isset($rules['filter']) && !filter_var($value, $rules['filter'])) {
            throw new Exception($rules['message'], 400);
        }

        if (isset($rules['isArray']) && $rules['isArray'] && !is_array($value)) {
            throw new Exception($rules['message'], 400);
        }

        if (isset($rules['oneOf']) && !in_array($value, $rules['oneOf'])) {
            throw new Exception($rules['message'], 400);
        }

        if (isset($rules['equals']) && $value !== $rules['equals']) {
            throw new Exception($rules['message'], 400);
        }
    }

    // Validate insurance type values
    $validInsuranceTypes = ['vehicle', 'home', 'life', 'business'];
    foreach ($data['insuranceTypes'] as $type) {
        if (!in_array($type, $validInsuranceTypes)) {
            throw new Exception("Invalid insurance type: {$type}", 400);
        }
    }

    // Conditional validations based on selected insurance types
    foreach ($data['insuranceTypes'] as $type) {
        switch ($type) {
            case 'vehicle':
                if (!isset($data['vehicleType']) || empty($data['vehicleType'])) {
                    throw new Exception("Vehicle type is required when vehicle insurance is selected", 400);
                }
                break;
                
            case 'home':
                if (!isset($data['propertyType']) || empty($data['propertyType'])) {
                    throw new Exception("Property type is required when home insurance is selected", 400);
                }
                break;
        }
    }
}
?>