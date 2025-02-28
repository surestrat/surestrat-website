<?php
require_once '../../config/db-config.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if ($conn->connect_error) {
        throw new Exception('Connection failed: ' . $conn->connect_error);
    }

    $data = json_decode(file_get_contents('php://input'), true);

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

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Quote submitted successfully']);
    } else {
        throw new Exception('Failed to submit quote: ' . $stmt->error);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
} finally {
    if (isset($stmt)) $stmt->close();
    if (isset($conn)) $conn->close();
}
?>