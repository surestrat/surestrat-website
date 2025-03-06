-- Create database if not exists
CREATE DATABASE IF NOT EXISTS surestr2_quotes_db;
USE surestr2_quotes_db;

-- Create quotes table to store core quote information
CREATE TABLE IF NOT EXISTS quotes (
    quote_id INT AUTO_INCREMENT PRIMARY KEY,
    reference_number VARCHAR(20) UNIQUE,
    status ENUM('pending', 'processed', 'approved', 'declined') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create personal_details table
CREATE TABLE IF NOT EXISTS personal_details (
    personal_id INT AUTO_INCREMENT PRIMARY KEY,
    quote_id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    id_number VARCHAR(13) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    province VARCHAR(50) NOT NULL,
    marital_status ENUM('single', 'married', 'divorced', 'widowed'),
    employment_status ENUM('employed', 'self-employed', 'unemployed', 'retired'),
    occupation VARCHAR(100),
    monthly_income DECIMAL(12, 2),
    FOREIGN KEY (quote_id) REFERENCES quotes(quote_id) ON DELETE CASCADE
);

-- Create insurance_types table to store selected insurance types
CREATE TABLE IF NOT EXISTS insurance_types (
    insurance_type_id INT AUTO_INCREMENT PRIMARY KEY,
    quote_id INT NOT NULL,
    insurance_type ENUM('vehicle', 'home', 'life', 'business') NOT NULL,
    FOREIGN KEY (quote_id) REFERENCES quotes(quote_id) ON DELETE CASCADE,
    UNIQUE KEY unique_quote_type (quote_id, insurance_type)
);

-- Create vehicle_details table
CREATE TABLE IF NOT EXISTS vehicle_details (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
    quote_id INT NOT NULL,
    vehicle_count ENUM('1', '2', '3', 'more'),
    vehicle_type ENUM('sedan', 'suv', 'bakkie', 'hatchback'),
    vehicle_year INT,
    vehicle_make VARCHAR(50),
    vehicle_model VARCHAR(50),
    vehicle_usage ENUM('personal', 'business', 'uber'),
    FOREIGN KEY (quote_id) REFERENCES quotes(quote_id) ON DELETE CASCADE
);

-- Create property_details table
CREATE TABLE IF NOT EXISTS property_details (
    property_id INT AUTO_INCREMENT PRIMARY KEY,
    quote_id INT NOT NULL,
    property_type ENUM('house', 'apartment', 'townhouse', 'estate'),
    property_value DECIMAL(12, 2),
    property_address VARCHAR(255),
    security_measures ENUM('alarm', 'electric', 'guards', 'multiple'),
    FOREIGN KEY (quote_id) REFERENCES quotes(quote_id) ON DELETE CASCADE
);

-- Create life_insurance_details table
CREATE TABLE IF NOT EXISTS life_insurance_details (
    life_insurance_id INT AUTO_INCREMENT PRIMARY KEY,
    quote_id INT NOT NULL,
    age INT,
    smoking_status ENUM('non-smoker', 'smoker'),
    coverage_amount ENUM('100000', '250000', '500000', '1000000'),
    existing_conditions ENUM('none', 'diabetes', 'hypertension', 'other'),
    FOREIGN KEY (quote_id) REFERENCES quotes(quote_id) ON DELETE CASCADE
);

-- Create business_insurance_details table
CREATE TABLE IF NOT EXISTS business_insurance_details (
    business_insurance_id INT AUTO_INCREMENT PRIMARY KEY,
    quote_id INT NOT NULL,
    business_name VARCHAR(100),
    business_type ENUM('retail', 'service', 'manufacturing', 'other'),
    coverage_types ENUM('liability', 'property', 'workers', 'all'),
    employee_count INT,
    FOREIGN KEY (quote_id) REFERENCES quotes(quote_id) ON DELETE CASCADE
);

-- Create terms_agreement table
CREATE TABLE IF NOT EXISTS terms_agreement (
    agreement_id INT AUTO_INCREMENT PRIMARY KEY,
    quote_id INT NOT NULL,
    terms_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    accepted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quote_id) REFERENCES quotes(quote_id) ON DELETE CASCADE
);

-- Create quote_activities table to track history/status changes
CREATE TABLE IF NOT EXISTS quote_activities (
    activity_id INT AUTO_INCREMENT PRIMARY KEY,
    quote_id INT NOT NULL,
    activity_type ENUM('created', 'updated', 'status_change', 'processed'),
    description TEXT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quote_id) REFERENCES quotes(quote_id) ON DELETE CASCADE
);

-- Create index for better performance
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_personal_details_email ON personal_details(email);
CREATE INDEX idx_personal_details_phone ON personal_details(phone);