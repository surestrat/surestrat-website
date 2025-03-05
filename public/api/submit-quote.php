<?php
// Enable error display for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set headers to allow cross-origin requests and specify content type
header('Access-Control-Allow-Origin: *');
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

// Log the incoming request for debugging
$requestLog = [
    'time' => date('Y-m-d H:i:s'),
    'method' => $_SERVER['REQUEST_METHOD'],
    'content_type' => $_SERVER['CONTENT_TYPE'] ?? 'Not set',
    'content_length' => $_SERVER['CONTENT_LENGTH'] ?? 'Not set'
];
file_put_contents('request_log.txt', print_r($requestLog, true) . "\n", FILE_APPEND);

try {
    // Get raw POST data
    $rawData = file_get_contents('php://input');
    
    // Log the raw data for debugging
    file_put_contents('raw_data.txt', $rawData . "\n", FILE_APPEND);
    
    // Parse JSON data
    $data = json_decode($rawData, true);
    
    // Check if JSON parsing was successful
    if (json_last_error() !== JSON_ERROR_NONE) {
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

    // Mock successful response for testing
    echo json_encode([
        'success' => true,
        'message' => 'Quote submitted successfully',
        'quoteId' => rand(1000, 9999), // Generate a random ID for testing
        'timestamp' => date('Y-m-d H:i:s')
    ]);

} catch (Exception $e) {
    $statusCode = $e->getCode() ?: 500;
    http_response_code($statusCode);
    echo json_encode([
        'error' => $e->getMessage(),
        'code' => $statusCode
    ]);
    
    // Log the error
    file_put_contents('error_log.txt', date('Y-m-d H:i:s') . ": " . $e->getMessage() . "\n", FILE_APPEND);
}