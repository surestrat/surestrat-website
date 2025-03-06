<?php
// Enable error display for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set headers to allow cross-origin requests and specify content type
header('Access-Control-Allow-Origin: https://surestrat.co.za');
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
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

require_once __DIR__ . '/Database.php';

try {
    // Get raw POST data
    $rawData = file_get_contents('php://input');
    
    // Log the raw data for debugging
    file_put_contents('request_log.txt', "Request time: " . date('Y-m-d H:i:s') . "\n", FILE_APPEND);
    file_put_contents('raw_data.txt', $rawData . "\n", FILE_APPEND);
    
    // Parse JSON data
    $data = json_decode($rawData, true);
    
    // Check if JSON parsing was successful
    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON: ' . json_last_error_msg(), 400);
    }
    
    // Log the parsed data
    file_put_contents('parsed_data.txt', print_r($data, true) . "\n", FILE_APPEND);
    
    // Validate required fields
    $requiredFields = ['firstName', 'lastName', 'idNumber', 'phone', 'email', 'province', 'insuranceTypes'];
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            throw new Exception("Missing required field: $field", 400);
        }
    }

    // Validate email
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format', 400);
    }

    // Validate phone number (South African format)
    if (!preg_match('/^(\+27|0)[6-8][0-9]{8}$/', $data['phone'])) {
        throw new Exception('Invalid phone number format', 400);
    }

    // Validate termsAccepted is true
    if (!isset($data['termsAccepted']) || $data['termsAccepted'] !== true) {
        throw new Exception('Terms must be accepted', 400);
    }

    // Get database instance
    $db = Database::getInstance();
    $conn = $db->getConnection();
    
    if (!$conn) {
        throw new Exception('Database connection failed', 500);
    }
    
    // Start transaction
    if (!$conn->begin_transaction()) {
        throw new Exception('Failed to start database transaction', 500);
    }

    try {
        // Generate unique reference number
        $referenceNumber = 'QT' . date('Ymd') . rand(1000, 9999);
        
        // Insert into quotes table
        $stmt = $conn->prepare("INSERT INTO quotes (reference_number) VALUES (?)");
        if (!$stmt) {
            throw new Exception('Failed to prepare quotes statement: ' . $conn->error, 500);
        }
        $stmt->bind_param("s", $referenceNumber);
        if (!$stmt->execute()) {
            throw new Exception('Failed to execute quotes statement: ' . $stmt->error, 500);
        }
        $quoteId = $stmt->insert_id;
        $stmt->close();
        
        // Insert personal details
        $stmt = $conn->prepare("INSERT INTO personal_details 
            (quote_id, first_name, last_name, id_number, phone, email, province, marital_status, employment_status, occupation, monthly_income) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        if (!$stmt) {
            throw new Exception('Failed to prepare personal details statement: ' . $conn->error, 500);
        }
            
        // Ensure numeric fields are properly formatted
        $monthlyIncome = isset($data['monthlyIncome']) && $data['monthlyIncome'] !== '' ? 
            floatval($data['monthlyIncome']) : null;
        $maritalStatus = isset($data['maritalStatus']) && $data['maritalStatus'] !== '' ? 
            $data['maritalStatus'] : null;
        $employmentStatus = isset($data['employmentStatus']) && $data['employmentStatus'] !== '' ? 
            $data['employmentStatus'] : null;
        $occupation = isset($data['occupation']) && $data['occupation'] !== '' ? 
            $data['occupation'] : null;
        
        $stmt->bind_param("isssssssssd", 
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
        );
        if (!$stmt->execute()) {
            throw new Exception('Failed to execute personal details statement: ' . $stmt->error, 500);
        }
        $stmt->close();
        
        // Insert insurance types
        if (!is_array($data['insuranceTypes'])) {
            throw new Exception('Insurance types must be an array', 400);
        }
        
        foreach ($data['insuranceTypes'] as $insuranceType) {
            $stmt = $conn->prepare("INSERT INTO insurance_types (quote_id, insurance_type) VALUES (?, ?)");
            if (!$stmt) {
                throw new Exception('Failed to prepare insurance types statement: ' . $conn->error, 500);
            }
            $stmt->bind_param("is", $quoteId, $insuranceType);
            if (!$stmt->execute()) {
                throw new Exception('Failed to execute insurance types statement: ' . $stmt->error, 500);
            }
            $stmt->close();
            
            // Insert specific insurance details based on type
            if ($insuranceType == 'vehicle' && isset($data['vehicleType'])) {
                $stmt = $conn->prepare("INSERT INTO vehicle_details 
                    (quote_id, vehicle_count, vehicle_type, vehicle_year, vehicle_make, vehicle_model, vehicle_usage) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)");
                if (!$stmt) {
                    throw new Exception('Failed to prepare vehicle details statement: ' . $conn->error, 500);
                }
                    
                $vehicleCount = isset($data['vehicleCount']) ? $data['vehicleCount'] : null;
                $vehicleYear = isset($data['vehicleYear']) ? intval($data['vehicleYear']) : null;
                $vehicleMake = isset($data['vehicleMake']) ? $data['vehicleMake'] : null;
                $vehicleModel = isset($data['vehicleModel']) ? $data['vehicleModel'] : null;
                $vehicleUsage = isset($data['vehicleUsage']) ? $data['vehicleUsage'] : null;
                
                $stmt->bind_param("ississs", 
                    $quoteId, 
                    $vehicleCount,
                    $data['vehicleType'],
                    $vehicleYear,
                    $vehicleMake,
                    $vehicleModel,
                    $vehicleUsage
                );
                if (!$stmt->execute()) {
                    throw new Exception('Failed to execute vehicle details statement: ' . $stmt->error, 500);
                }
                $stmt->close();
            }
            
            if ($insuranceType == 'home') {
                $stmt = $conn->prepare("INSERT INTO property_details 
                    (quote_id, property_type, property_value, property_address, security_measures) 
                    VALUES (?, ?, ?, ?, ?)");
                if (!$stmt) {
                    throw new Exception('Failed to prepare property details statement: ' . $conn->error, 500);
                }
                    
                $propertyType = isset($data['propertyType']) ? $data['propertyType'] : null;
                $propertyValue = isset($data['propertyValue']) ? floatval($data['propertyValue']) : null;
                $propertyAddress = isset($data['propertyAddress']) ? $data['propertyAddress'] : null;
                $securityMeasures = isset($data['securityMeasures']) ? $data['securityMeasures'] : null;
                
                $stmt->bind_param("isdss", 
                    $quoteId, 
                    $propertyType,
                    $propertyValue,
                    $propertyAddress,
                    $securityMeasures
                );
                if (!$stmt->execute()) {
                    throw new Exception('Failed to execute property details statement: ' . $stmt->error, 500);
                }
                $stmt->close();
            }
            
            if ($insuranceType == 'life') {
                $stmt = $conn->prepare("INSERT INTO life_insurance_details 
                    (quote_id, age, smoking_status, coverage_amount, existing_conditions) 
                    VALUES (?, ?, ?, ?, ?)");
                if (!$stmt) {
                    throw new Exception('Failed to prepare life insurance statement: ' . $conn->error, 500);
                }
                    
                $age = isset($data['age']) ? intval($data['age']) : null;
                $smokingStatus = isset($data['smokingStatus']) ? $data['smokingStatus'] : null;
                $coverageAmount = isset($data['coverageAmount']) ? $data['coverageAmount'] : null;
                $existingConditions = isset($data['existingConditions']) ? $data['existingConditions'] : null;
                
                $stmt->bind_param("issss", 
                    $quoteId, 
                    $age,
                    $smokingStatus,
                    $coverageAmount,
                    $existingConditions
                );
                if (!$stmt->execute()) {
                    throw new Exception('Failed to execute life insurance statement: ' . $stmt->error, 500);
                }
                $stmt->close();
            }
            
            if ($insuranceType == 'business') {
                $stmt = $conn->prepare("INSERT INTO business_insurance_details 
                    (quote_id, business_name, business_type, coverage_types, employee_count) 
                    VALUES (?, ?, ?, ?, ?)");
                if (!$stmt) {
                    throw new Exception('Failed to prepare business insurance statement: ' . $conn->error, 500);
                }
                    
                $businessName = isset($data['businessName']) ? $data['businessName'] : null;
                $businessType = isset($data['businessType']) ? $data['businessType'] : null;
                $coverageTypes = isset($data['coverageTypes']) ? $data['coverageTypes'] : null;
                $employeeCount = isset($data['employeeCount']) ? intval($data['employeeCount']) : null;
                
                $stmt->bind_param("ssssi", 
                    $quoteId, 
                    $businessName,
                    $businessType,
                    $coverageTypes,
                    $employeeCount
                );
                if (!$stmt->execute()) {
                    throw new Exception('Failed to execute business insurance statement: ' . $stmt->error, 500);
                }
                $stmt->close();
            }
        }
        
        // Insert terms agreement
        $stmt = $conn->prepare("INSERT INTO terms_agreement (quote_id, terms_accepted) VALUES (?, 1)");
        if (!$stmt) {
            throw new Exception('Failed to prepare terms agreement statement: ' . $conn->error, 500);
        }
        $stmt->bind_param("i", $quoteId);
        if (!$stmt->execute()) {
            throw new Exception('Failed to execute terms agreement statement: ' . $stmt->error, 500);
        }
        $stmt->close();
        
        // Log activity
        $stmt = $conn->prepare("INSERT INTO quote_activities (quote_id, activity_type, description) VALUES (?, 'created', ?)");
        if (!$stmt) {
            throw new Exception('Failed to prepare activities statement: ' . $conn->error, 500);
        }
        $description = "Quote submitted from website";
        $stmt->bind_param("is", $quoteId, $description);
        if (!$stmt->execute()) {
            throw new Exception('Failed to execute activities statement: ' . $stmt->error, 500);
        }
        $stmt->close();
        
        // Commit transaction
        if (!$conn->commit()) {
            throw new Exception('Failed to commit transaction', 500);
        }
        
        // Return success response
        $response = [
            'success' => true,
            'message' => 'Quote submitted successfully',
            'quoteId' => $quoteId,
            'reference' => $referenceNumber,
            'timestamp' => date('Y-m-d H:i:s')
        ];
        
        echo json_encode($response);
        
    } catch (Exception $e) {
        // Rollback transaction on error
        $conn->rollback();
        throw $e;
    }

} catch (Exception $e) {
    $statusCode = $e->getCode() ?: 500;
    http_response_code($statusCode);
    
    $response = [
        'success' => false,
        'error' => $e->getMessage(),
        'code' => $statusCode
    ];
    
    // Make sure we're outputting valid JSON
    echo json_encode($response);
    
    // Log the error
    file_put_contents('error_log.txt', date('Y-m-d H:i:s') . ": " . $e->getMessage() . "\n", FILE_APPEND);
}
?>