<?php


header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
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

    // Initialize database connection
    $db = Database::getInstance();
    $conn = $db->getConnection();

    $sql = "INSERT INTO insurance_quotes (
        first_name, 
        last_name,
        id_number,
        phone,
        email,
        province,
        insurance_types,
        form_data,
        created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())";

    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        throw new Exception('Database error: ' . $conn->error);
    }

    $stmt->bind_param(
        "ssssssss",
        $data['firstName'],
        $data['lastName'],
        $data['idNumber'],
        $data['phone'],
        $data['email'],
        $data['province'],
        json_encode($data['insuranceTypes']),
        json_encode($data)
    );

    if (!$stmt->execute()) {
        throw new Exception('Failed to submit quote: ' . $stmt->error);
    }

    echo json_encode([
        'success' => true,
        'message' => 'Quote submitted successfully',
        'quoteId' => $conn->insert_id
    ]);

} catch (Exception $e) {
    $statusCode = $e->getCode() ?: 500;
    http_response_code($statusCode);
    echo json_encode(['error' => $e->getMessage()]);
    error_log("Quote Submission Error: " . $e->getMessage());
} finally {
    if (isset($db)) {
        $db->close();
    }
}