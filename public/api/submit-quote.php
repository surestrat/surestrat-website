<?php
// Enable error display for debugging (disable in production)
ini_set('display_errors', 0); // Set to 0 in production
ini_set('display_startup_errors', 0); // Set to 0 in production
error_reporting(E_ALL);

// Set headers to allow cross-origin requests and specify content type
header('Access-Control-Allow-Origin: *'); // Change to specific domain in production
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Request-Time');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Check for Content-Type header
if (!isset($_SERVER['CONTENT_TYPE']) || strpos($_SERVER['CONTENT_TYPE'], 'application/json') === false) {
    http_response_code(415);
    echo json_encode(['success' => false, 'error' => 'Unsupported Media Type. Content-Type must be application/json']);
    exit;
}

// Include config file with all necessary functions
require_once('config.php');

// Set execution time limit to prevent long-running scripts
set_time_limit(30); // 30 seconds max execution time

// Log request
$requestTime = date('Y-m-d H:i:s');
logMessage("===== Quote Request: $requestTime =====", 'api_log.txt');
logMessage("Remote IP: " . $_SERVER['REMOTE_ADDR'], 'api_log.txt');

try {
    // Check for request size limits
    $contentLength = isset($_SERVER['CONTENT_LENGTH']) ? (int)$_SERVER['CONTENT_LENGTH'] : 0;
    if ($contentLength > 500000) { // ~500KB
        throw new Exception('Request entity too large', 413);
    }
    
    // Get raw POST data with size limit
    $rawData = file_get_contents('php://input', false, null, 0, 500000);
    if ($rawData === false) {
        throw new Exception('Failed to read request body', 400);
    }
    
    logMessage("Raw data received", 'api_log.txt');
    
    // Parse JSON data
    $data = json_decode($rawData, true);
    
    // Check if JSON parsing was successful
    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON: ' . json_last_error_msg(), 400);
    }
    
    // Sanitize input data to prevent XSS
    $data = sanitizeInput($data);
    
    // Validate the form data
    validateFormData($data);
    logMessage("Data validation passed", 'api_log.txt');

    // Check for rate limits
    if (!checkRateLimit($_SERVER['REMOTE_ADDR'])) {
        throw new Exception('Rate limit exceeded. Please try again later.', 429);
    }

    // Get PostgreSQL connection
    $pdo = getPgConnection();
    logMessage("Database connection established", 'api_log.txt');
    
    // Start transaction
    $pdo->beginTransaction();
    
    try {
        // Generate unique reference number
        $referenceNumber = 'QT' . date('Ymd') . rand(1000, 9999);
        
        // Insert into quotes table
        $stmt = $pdo->prepare("INSERT INTO quotes (reference_number, created_at) VALUES (?, NOW()) RETURNING id");
        $stmt->execute([$referenceNumber]);
        $quoteId = $stmt->fetchColumn();
        
        logMessage("Quote created with ID: $quoteId", 'api_log.txt');
        
        // Insert personal details
        $stmt = $pdo->prepare("INSERT INTO personal_details 
            (quote_id, first_name, last_name, id_number, phone, email, province, marital_status, employment_status, occupation, monthly_income) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        // Prepare optional fields
        $maritalStatus = isset($data['maritalStatus']) ? $data['maritalStatus'] : null;
        $employmentStatus = isset($data['employmentStatus']) ? $data['employmentStatus'] : null;
        $occupation = isset($data['occupation']) ? $data['occupation'] : null;
        $monthlyIncome = isset($data['monthlyIncome']) ? floatval($data['monthlyIncome']) : null;
        
        $stmt->execute([
            $quoteId,
            $data['firstName'],
            $data['lastName'],
            $data['idNumber'],
            $data['phone'],
            $data['email'],
            $data['province'],
            $maritalStatus,
            $employmentStatus,
            $occupation,
            $monthlyIncome
        ]);
        
        logMessage("Personal details added", 'api_log.txt');
        
        // Insert insurance types
        foreach ($data['insuranceTypes'] as $insuranceType) {
            $stmt = $pdo->prepare("INSERT INTO insurance_types (quote_id, insurance_type) VALUES (?, ?)");
            $stmt->execute([$quoteId, $insuranceType]);
            
            // Process specific insurance type data
            switch ($insuranceType) {
                case 'vehicle':
                    if (isset($data['vehicleType'])) {
                        $stmt = $pdo->prepare("INSERT INTO vehicle_details 
                            (quote_id, vehicle_count, vehicle_type, vehicle_year, vehicle_make, vehicle_model, vehicle_usage) 
                            VALUES (?, ?, ?, ?, ?, ?, ?)");
                            
                        $stmt->execute([
                            $quoteId,
                            $data['vehicleCount'] ?? null,
                            $data['vehicleType'] ?? null,
                            isset($data['vehicleYear']) ? intval($data['vehicleYear']) : null,
                            $data['vehicleMake'] ?? null,
                            $data['vehicleModel'] ?? null,
                            $data['vehicleUsage'] ?? null
                        ]);
                        logMessage("Vehicle details added", 'api_log.txt');
                    }
                    break;
                
                case 'home':
                    $stmt = $pdo->prepare("INSERT INTO property_details 
                        (quote_id, property_type, property_value, property_address, security_measures) 
                        VALUES (?, ?, ?, ?, ?)");
                        
                    $stmt->execute([
                        $quoteId,
                        $data['propertyType'] ?? null,
                        isset($data['propertyValue']) ? floatval($data['propertyValue']) : null,
                        $data['propertyAddress'] ?? null,
                        $data['securityMeasures'] ?? null
                    ]);
                    logMessage("Property details added", 'api_log.txt');
                    break;
                    
                case 'life':
                    $stmt = $pdo->prepare("INSERT INTO life_insurance_details 
                        (quote_id, age, smoking_status, coverage_amount, existing_conditions) 
                        VALUES (?, ?, ?, ?, ?)");
                        
                    $stmt->execute([
                        $quoteId,
                        isset($data['age']) ? intval($data['age']) : null,
                        $data['smokingStatus'] ?? null,
                        $data['coverageAmount'] ?? null,
                        $data['existingConditions'] ?? null
                    ]);
                    logMessage("Life insurance details added", 'api_log.txt');
                    break;
                    
                case 'business':
                    $stmt = $pdo->prepare("INSERT INTO business_insurance_details 
                        (quote_id, business_name, business_type, coverage_types, employee_count) 
                        VALUES (?, ?, ?, ?, ?)");
                        
                    $stmt->execute([
                        $quoteId,
                        $data['businessName'] ?? null,
                        $data['businessType'] ?? null,
                        $data['coverageTypes'] ?? null,
                        isset($data['employeeCount']) ? intval($data['employeeCount']) : null
                    ]);
                    logMessage("Business details added", 'api_log.txt');
                    break;
            }
        }
        
        // Insert terms agreement
        $stmt = $pdo->prepare("INSERT INTO terms_agreement (quote_id, terms_accepted) VALUES (?, true)");
        $stmt->execute([$quoteId]);
        
        // Log activity
        $stmt = $pdo->prepare("INSERT INTO quote_activities (quote_id, activity_type, description, created_at) VALUES (?, 'created', ?, NOW())");
        $description = "Quote submitted from website";
        $stmt->execute([$quoteId, $description]);
        
        // Commit transaction
        $pdo->commit();
        logMessage("Transaction committed successfully, Quote ID: {$quoteId}", 'api_log.txt');
        
        // Return success response
        $response = [
            'success' => true,
            'message' => 'Quote submitted successfully',
            'quoteId' => $quoteId,
            'reference' => $referenceNumber,
            'timestamp' => $requestTime
        ];
        
        echo json_encode($response);
        
    } catch (Exception $e) {
        // Rollback transaction on error
        if (isset($pdo) && $pdo->inTransaction()) {
            $pdo->rollBack();
        }
        logMessage("Transaction rolled back: " . $e->getMessage(), 'error_log.txt');
        throw $e;
    }

} catch (Exception $e) {
    $statusCode = $e->getCode() ?: 500;
    
    // Ensure standard HTTP status codes
    if (!in_array($statusCode, [400, 401, 403, 404, 405, 413, 429, 500])) {
        $statusCode = 500;
    }
    
    http_response_code($statusCode);
    
    // For security, don't expose detailed error messages in production
    $isProduction = getenv_default('APP_ENV', 'production') === 'production';
    $errorMessage = $isProduction && $statusCode >= 500 
        ? 'An internal server error occurred. Please try again later.' 
        : $e->getMessage();
    
    $response = [
        'success' => false,
        'error' => $errorMessage,
        'code' => $statusCode
    ];
    
    // Make sure we're outputting valid JSON
    echo json_encode($response);
    
    // Log the actual error with details
    logMessage("Error: " . $e->getMessage() . " | Trace: " . $e->getTraceAsString(), 'error_log.txt');
}

/**
 * Check if the client is within rate limits
 * @param string $ip The client IP address
 * @return bool True if within limits, false otherwise
 */
function checkRateLimit($ip) {
    $logDir = getenv_default('LOG_DIR', __DIR__ . '/logs');
    $rateFile = $logDir . '/rate_limits.json';
    
    // Create or load rate limit data
    if (file_exists($rateFile)) {
        $rateData = json_decode(file_get_contents($rateFile), true);
    } else {
        $rateData = [];
    }
    
    // Clean up old entries (older than 1 hour)
    $now = time();
    foreach ($rateData as $clientIp => $data) {
        if ($now - $data['timestamp'] > 3600) {
            unset($rateData[$clientIp]);
        }
    }
    
    // Check if IP exists and increment count
    if (isset($rateData[$ip])) {
        // If more than 10 requests in the last minute, block
        if ($rateData[$ip]['count'] >= 10 && ($now - $rateData[$ip]['timestamp']) < 60) {
            return false;
        }
        
        // If last request was within a minute, increment; otherwise reset
        if ($now - $rateData[$ip]['timestamp'] < 60) {
            $rateData[$ip]['count']++;
        } else {
            $rateData[$ip]['count'] = 1;
        }
        
        $rateData[$ip]['timestamp'] = $now;
    } else {
        // First request from this IP
        $rateData[$ip] = [
            'count' => 1,
            'timestamp' => $now
        ];
    }
    
    // Save updated rate data
    file_put_contents($rateFile, json_encode($rateData));
    
    return true;
}
?>