package com.bank;

import java.sql.Connection;
import java.sql.DriverManager;

public class App {

    private static final String URL = "jdbc:mysql://localhost:3306/bankSimulation";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "abc123";

    public static void main(String[] args) {
        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD)) {
            System.out.println("Database connection successful!");
        } catch (Exception e) {
            System.out.println("Database connection failed!");
            e.printStackTrace();
        }
    }
}
