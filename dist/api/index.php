<?php
require_once __DIR__ . '/config.php';
initializeSecureSession();

// CORS Headers
header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

# Find your CORS Headers section and update:
// CORS Headers
header('Access-Control-Allow-Origin: *'); // Consider restricting this in production
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Basic rate limiting
if (!checkRateLimit($_SERVER['REMOTE_ADDR'])) {
    http_response_code(429);
    echo json_encode(['error' => 'Too many requests']);
    exit;
}

// Route API requests
try {
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $path = trim(str_replace('/api', '', $path), '/');

    switch($path) {
        case 'submit-quote':
            require_once 'submit-quote.php';
            break;
        default:
            throw new Exception('Not found', 404);
    }
} catch (Exception $e) {
    $statusCode = $e->getCode() ?: 500;
    http_response_code($statusCode);
    echo json_encode(['error' => $e->getMessage()]);
    error_log("API Error: " . $e->getMessage());
}

// Rate limiting function
function checkRateLimit($ip) {
    $timestamp = time();
    $rateFile = sys_get_temp_dir() . '/rate_' . md5($ip);
    
    if (file_exists($rateFile)) {
        $data = unserialize(file_get_contents($rateFile));
        if ($timestamp - $data['timestamp'] <= 60) {
            if ($data['count'] >= MAX_REQUESTS_PER_MINUTE) {
                return false;
            }
            $data['count']++;
        } else {
            $data = ['timestamp' => $timestamp, 'count' => 1];
        }
    } else {
        $data = ['timestamp' => $timestamp, 'count' => 1];
    }
    
    file_put_contents($rateFile, serialize($data));
    return true;
}
?>