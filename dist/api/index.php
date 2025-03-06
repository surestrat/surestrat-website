<?php
require_once __DIR__ . '/config.php';
initializeSecureSession();

// CORS Headers - using only one set, removing duplicates
header('Access-Control-Allow-Origin: https://surestrat.co.za'); // Consider restricting this in production
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
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

    // Add a simple health check endpoint
    if ($path === 'health' || $path === 'ping') {
        echo json_encode([
            'status' => 'ok',
            'timestamp' => time(),
            'environment' => getenv_default('APP_ENV', 'production')
        ]);
        exit;
    }

    switch($path) {
        case 'submit-quote':
            require_once 'submit-quote.php';
            break;
        case 'test':
            // Test endpoint to verify API is working correctly
            echo json_encode([
                'status' => 'success',
                'message' => 'API is working correctly',
                'timestamp' => time(),
                'path' => $path,
                'method' => $_SERVER['REQUEST_METHOD']
            ]);
            break;
        default:
            throw new Exception('Not found', 404);
    }
} catch (Exception $e) {
    $statusCode = $e->getCode() ?: 500;
    http_response_code($statusCode);
    
    // Log detailed error internally but return limited info to client
    $errorDetails = $e->getMessage() . ' in ' . $e->getFile() . ' on line ' . $e->getLine();
    error_log("API Error: " . $errorDetails);
    
    echo json_encode([
        'error' => $e->getMessage(),
        'status' => $statusCode
    ]);
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