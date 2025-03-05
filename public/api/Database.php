<?php
require_once __DIR__ . '/config.php';

/**
 * Database connection and interaction class
 */
class Database {
    private $connection;
    private static $instance;

    /**
     * Constructor - Creates database connection
     */
    private function __construct() {
        try {
            $this->connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
            
            if ($this->connection->connect_error) {
                $error = 'Database connection failed: ' . $this->connection->connect_error;
                error_log($error);
                throw new Exception($error);
            }
            
            // Set charset to ensure proper encoding
            $this->connection->set_charset("utf8mb4");
            
            // Configure timezone if needed
            $this->connection->query("SET time_zone = '+02:00'");
        } catch (Exception $e) {
            error_log('Database connection error: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Get singleton instance
     * @return Database
     */
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Get database connection
     * @return mysqli
     */
    public function getConnection() {
        return $this->connection;
    }

    /**
     * Execute query with prepared statement 
     * @param string $sql SQL query with placeholders
     * @param array $params Parameters to bind
     * @param string $types Types of parameters (i: integer, s: string, d: double, b: blob)
     * @return array|bool Result array or false on failure
     */
    public function executeQuery($sql, $params = [], $types = '') {
        try {
            $stmt = $this->connection->prepare($sql);
            
            if (!$stmt) {
                error_log("Query preparation failed: " . $this->connection->error);
                return false;
            }
            
            // If we have parameters, bind them
            if (!empty($params)) {
                // If types string not provided, create it based on parameters
                if (empty($types)) {
                    $types = '';
                    foreach ($params as $param) {
                        if (is_int($param)) {
                            $types .= 'i';
                        } elseif (is_float($param)) {
                            $types .= 'd';
                        } elseif (is_string($param)) {
                            $types .= 's';
                        } else {
                            $types .= 'b';
                        }
                    }
                }
                
                // Convert parameters to references for bind_param
                $bindParams = [$types];
                foreach ($params as $key => $value) {
                    $bindParams[] = &$params[$key];
                }
                
                call_user_func_array([$stmt, 'bind_param'], $bindParams);
            }
            
            // Execute statement
            if (!$stmt->execute()) {
                error_log("Query execution failed: " . $stmt->error);
                return false;
            }
            
            $result = $stmt->get_result();
            
            // If query returns results
            if ($result) {
                $data = [];
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                $stmt->close();
                return $data;
            } 
            // For INSERT, UPDATE, DELETE statements
            else {
                $affectedRows = $stmt->affected_rows;
                $insertId = $stmt->insert_id;
                $stmt->close();
                return [
                    'affected_rows' => $affectedRows,
                    'insert_id' => $insertId
                ];
            }
            
        } catch (Exception $e) {
            error_log("Database query error: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Properly escape string for database
     * @param string $string String to escape
     * @return string Escaped string
     */
    public function escapeString($string) {
        return $this->connection->real_escape_string($string);
    }
    
    /**
     * Begin transaction
     * @return bool Success status
     */
    public function beginTransaction() {
        return $this->connection->begin_transaction();
    }
    
    /**
     * Commit transaction
     * @return bool Success status
     */
    public function commit() {
        return $this->connection->commit();
    }
    
    /**
     * Rollback transaction
     * @return bool Success status
     */
    public function rollback() {
        return $this->connection->rollback();
    }
    
    /**
     * Close the database connection
     */
    public function close() {
        if ($this->connection) {
            $this->connection->close();
            $this->connection = null;
        }
    }
    
    /**
     * Destructor - Close database connection
     */
    public function __destruct() {
        $this->close();
    }
}
?>
