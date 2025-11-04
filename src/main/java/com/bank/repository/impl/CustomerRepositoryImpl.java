package com.bank.repository.impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.bank.model.Customer;
import com.bank.repository.CustomerRepository;

public class CustomerRepositoryImpl implements CustomerRepository {

    private static final String URL = "jdbc:mysql://localhost:3306/bankSimulation?useSSL=false&serverTimezone=UTC";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "abc123";

    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("MySQL JDBC Driver not found", e);
        }
    }

    @Override
    public void createCustomer(Customer customer) {
        String sql = "INSERT INTO Customer (name, phone_number, email, address, customer_pin, aadhar_number, dob, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'Active')";
        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, customer.getName());
            stmt.setString(2, customer.getPhoneNumber());
            stmt.setString(3, customer.getEmail());
            stmt.setString(4, customer.getAddress());
            stmt.setString(5, customer.getCustomerPin());
            stmt.setString(6, customer.getAadharNumber());
            stmt.setDate(7, customer.getDob() != null ? java.sql.Date.valueOf(customer.getDob()) : null);

            stmt.executeUpdate();

            try (ResultSet rs = stmt.getGeneratedKeys()) {
                if (rs.next()) {
                    customer.setCustomerId(rs.getInt(1));
                }
            }
        } catch (SQLException e) {
            System.err.println("Error inserting customer: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }
    


    @Override
public String getCustomerPinById(int customerId) {
    String sql = "SELECT customer_pin FROM Customer WHERE customer_id = ?";
    try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        stmt.setInt(1, customerId);
        try (ResultSet rs = stmt.executeQuery()) {
            if (rs.next()) {
                return rs.getString("customer_pin");
            }
        }
    } catch (SQLException e) {
        System.err.println("Error fetching customer PIN: " + e.getMessage());
        throw new RuntimeException(e);
    }
    return null;
}

    private String generatePin() {
        int pin = (int)(Math.random() * 9000) + 1000;
        return String.valueOf(pin);
    }

    @Override
    public Customer getCustomerById(int id) {
        String sql = "SELECT * FROM Customer WHERE customer_id = ?";
        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return mapCustomer(rs);
            }
        } catch (SQLException e) {
            System.err.println("Error fetching customer by ID: " + e.getMessage());
        }
        return null;
    }
    @Override
    public Customer getCustomerByAadhar(String aadharNumber) {
        String sql = "SELECT * FROM Customer WHERE aadhar_number = ?";
        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, aadharNumber);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return mapCustomer(rs);
            }
        } catch (SQLException e) {
            System.err.println("Error fetching customer by Aadhar: " + e.getMessage());
        }
        return null;
    }
    @Override
    public List<Customer> getAllCustomers() {
        List<Customer> list = new ArrayList<>();
        String sql = "SELECT * FROM Customer";
        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             Statement stmt = conn.createStatement()) {
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                list.add(mapCustomer(rs));
            }
        } catch (SQLException e) {
            System.err.println("Error fetching all customers: " + e.getMessage());
        }
        return list;
    }

    @Override
    public void updateCustomer(int id, Customer customer) {
        String sql = "UPDATE Customer SET name = ?, phone_number = ?, email = ?, address = ?, aadhar_number = ?, dob = ? WHERE customer_id = ?";
        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, customer.getName());
            stmt.setString(2, customer.getPhoneNumber());
            stmt.setString(3, customer.getEmail());
            stmt.setString(4, customer.getAddress());
            stmt.setString(5, customer.getAadharNumber());
            stmt.setDate(6, customer.getDob() != null ? java.sql.Date.valueOf(customer.getDob()) : null);
            stmt.setInt(7, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error updating customer: " + e.getMessage());
        }
    }

    @Override
    public void deleteCustomer(int id) {
        String sql = "DELETE FROM Customer WHERE customer_id = ?";
        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error deleting customer: " + e.getMessage());
        }
    }

    private Customer mapCustomer(ResultSet rs) throws SQLException {
        Customer customer = new Customer();
        customer.setCustomerId(rs.getInt("customer_id"));
        customer.setName(rs.getString("name"));
        customer.setPhoneNumber(rs.getString("phone_number"));
        customer.setEmail(rs.getString("email"));
        customer.setAddress(rs.getString("address"));
        customer.setAadharNumber(rs.getString("aadhar_number"));
        java.sql.Date dob = rs.getDate("dob");
        if (dob != null) customer.setDob(dob.toLocalDate());
        customer.setStatus(rs.getString("status"));
        return customer;
    }
    @Override
public String getCustomerEmailById(int customerId) {
    String sql = "SELECT email FROM Customer WHERE customer_id = ?";
    try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        stmt.setInt(1, customerId);
        try (ResultSet rs = stmt.executeQuery()) {
            if (rs.next()) {
                return rs.getString("email");
            }
        }
    } catch (SQLException e) {
        System.err.println("Error fetching customer email: " + e.getMessage());
        throw new RuntimeException(e);
    }
    return null;
}

@Override
public String getCustomerNameById(int customerId) {
    String sql = "SELECT name FROM Customer WHERE customer_id = ?";
    try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        stmt.setInt(1, customerId);
        try (ResultSet rs = stmt.executeQuery()) {
            if (rs.next()) {
                return rs.getString("name");
            }
        }
    } catch (SQLException e) {
        System.err.println("Error fetching customer name: " + e.getMessage());
        throw new RuntimeException(e);
    }
    return null;
}

}
