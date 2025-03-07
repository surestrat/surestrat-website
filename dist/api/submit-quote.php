<?php
// Enable error display for debugging (disable in production)
ini_set('display_errors', 0); // Set to 0 in production
ini_set('display_startup_errors', 0); // Set to 0 in production
error_reporting(E_ALL);

// Set headers to allow cross-origin requests and specify content type
header('Access-Control-Allow-Origin: *'); // Change to specific domain in production
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
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

// Include config file with all necessary functions
require_once('config.php');

// Log request
$requestTime = date('Y-m-d H:i:s');
logMessage("===== Quote Request: $requestTime =====", 'api_log.txt');
logMessage("Remote IP: " . $_SERVER['REMOTE_ADDR'], 'api_log.txt');

try {
    // Get raw POST data
    $rawData = file_get_contents('php://input');
    logMessage("Raw data received", 'api_log.txt');
    
    // Parse JSON data
    $data = json_decode($rawData, true);
    
    // Check if JSON parsing was successful
    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON: ' . json_last_error_msg(), 400);
    }
    
    // Validate the form data
    validateFormData($data);
    logMessage("Data validation passed", 'api_log.txt');

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
?>