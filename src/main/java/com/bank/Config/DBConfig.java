package com.bank.Config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DBConfig {

    private static final String URL = "jdbc:mysql://localhost:3306/bankSimulation?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";

    private static final String USERNAME = "root";
    private static final String PASSWORD = "abc123";

    public static void main(String[] args) {
        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             Statement stmt = conn.createStatement()) {

            System.out.println("Connected to database successfully!");

            // Create Customer Table if not exists
            stmt.execute("""
                CREATE TABLE IF NOT EXISTS Customer (
                    customer_id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    phone_number VARCHAR(15) UNIQUE,
                    email VARCHAR(100) UNIQUE,
                    address VARCHAR(200),
                    customer_pin VARCHAR(10) NOT NULL,
                    aadhar_number VARCHAR(20) UNIQUE,
                    dob DATE,
                    status VARCHAR(20) DEFAULT 'Inactive'
                );
            """);

            // Attempt to add new columns safely if they don't exist
            try {
                stmt.execute("ALTER TABLE Customer ADD COLUMN dob DATE");
            } catch (SQLException e) {
                System.out.println("Column 'dob' already exists or cannot be added: " + e.getMessage());
            }

            // Create Account table if not exists with updated columns
            stmt.execute("""
                CREATE TABLE IF NOT EXISTS Account (
                    account_id INT AUTO_INCREMENT PRIMARY KEY,
                    customer_id INT,
                    account_number VARCHAR(20) UNIQUE,
                    aadhar_number VARCHAR(12),
                    ifsc_code VARCHAR(20),
                    phone_number_linked VARCHAR(15),
                    amount DECIMAL(15,2) DEFAULT 600,
                    bank_name VARCHAR(100),
                    name_on_account VARCHAR(100),
                    status VARCHAR(20) DEFAULT 'ACTIVE',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
                );
            """);

            // Create Transactions Table if not exists
            stmt.execute("""
                CREATE TABLE IF NOT EXISTS Transactions (
                    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
                    account_id INT,
                    transaction_type VARCHAR(20),
                    amount DECIMAL(15,2),
                    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (account_id) REFERENCES Account(account_id)
                );
            """);

            System.out.println("Tables created or updated successfully!");

        } catch (SQLException e) {
            System.err.println("Database error:");
            e.printStackTrace();
        }
    }
}
