<?php
class Database {
    private $conn;
    private static $instance = null;
    private $stmt;

    private function __construct() {
        try {
            // Add error logging to see what's happening
            error_log("Attempting database connection to: " . DB_HOST);
            
            // Test if credentials are available
            error_log("DB credentials check - Host: " . (DB_HOST ? "Set" : "Not set") . 
                      ", User: " . (DB_USER ? "Set" : "Not set") . 
                      ", DB Name: " . (DB_NAME ? "Set" : "Not set"));
            
            $this->conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
            if ($this->conn->connect_error) {
                throw new Exception('Connection failed: ' . $this->conn->connect_error);
            }
            error_log("Database connection successful");
            $this->conn->set_charset('utf8mb4');
        } catch (Exception $e) {
            error_log("Database Connection Error: " . $e->getMessage());
            throw new Exception('Database connection failed');
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function prepare($sql) {
        $this->stmt = $this->conn->prepare($sql);
        if (!$this->stmt) {
            throw new Exception('Error preparing statement: ' . $this->conn->error);
        }
        return $this->stmt;
    }

    public function close() {
        if ($this->stmt) {
            $this->stmt->close();
        }
        if ($this->conn) {
            $this->conn->close();
        }
    }

    public function getConnection() {
        return $this->conn;
    }

    // Prevent cloning
    private function __clone() {}

    // Prevent unserialization
    public function __wakeup() {
        throw new Exception("Cannot unserialize singleton");
    }
}
?>