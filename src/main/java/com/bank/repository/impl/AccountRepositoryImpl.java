package com.bank.repository.impl;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.bank.model.Account;
import com.bank.repository.AccountRepository;

public class AccountRepositoryImpl implements AccountRepository {

    private static final String URL = "jdbc:mysql://localhost:3306/bankSimulation?useSSL=false&serverTimezone=UTC";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "abc123";

    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("MySQL JDBC Driver not found.", e);
        }
    }

    @Override
    public void createAccount(Account account) {
        String sql = "INSERT INTO Account(customer_id, account_number, aadhar_number, ifsc_code, phone_number_linked, amount, bank_name, name_on_account, status, created_at, modified_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setInt(1, account.getCustomerId());
            stmt.setString(2, account.getAccountNumber());
            stmt.setString(3, account.getAadharNumber());
            stmt.setString(4, account.getIfscCode());
            stmt.setString(5, account.getPhoneNumberLinked());
            stmt.setDouble(6, account.getAmount());
            stmt.setString(7, account.getBankName());
            stmt.setString(8, account.getNameOnAccount());
            stmt.setString(9, account.getStatus());
            stmt.setTimestamp(10, Timestamp.valueOf(account.getCreatedAt()));
            stmt.setTimestamp(11, Timestamp.valueOf(account.getModifiedAt()));

            stmt.executeUpdate();
            try (ResultSet rs = stmt.getGeneratedKeys()) {
                if (rs.next()) {
                    account.setAccountId(rs.getInt(1));
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error inserting account", e);
        }
    }

    @Override
    public Account getAccountByNumber(String accountNumber) {
        String sql = "SELECT * FROM Account WHERE account_number = ?";

        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, accountNumber);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return mapToAccount(rs);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error fetching account", e);
        }
        return null;
    }

    @Override
    public List<Account> getAccountsByCustomerId(int customerId) {
        List<Account> accounts = new ArrayList<>();
        String sql = "SELECT * FROM Account WHERE customer_id = ?";

        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, customerId);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    accounts.add(mapToAccount(rs));
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error fetching accounts by customerId", e);
        }
        return accounts;
    }

    @Override
    public void updateAccount(String accountNumber, Account account) {
        String sql = "UPDATE Account SET customer_id=?, aadhar_number=?, ifsc_code=?, phone_number_linked=?, amount=?, bank_name=?, name_on_account=?, status=?, modified_at=? WHERE account_number=?";

        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, account.getCustomerId());
            stmt.setString(2, account.getAadharNumber());
            stmt.setString(3, account.getIfscCode());
            stmt.setString(4, account.getPhoneNumberLinked());
            stmt.setDouble(5, account.getAmount());
            stmt.setString(6, account.getBankName());
            stmt.setString(7, account.getNameOnAccount());
            stmt.setString(8, account.getStatus());
            stmt.setTimestamp(9, Timestamp.valueOf(LocalDateTime.now()));
            stmt.setString(10, accountNumber);

            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Error updating account", e);
        }
    }

    @Override
    public void deleteAccount(String accountNumber) {
        String sql = "DELETE FROM Account WHERE account_number=?";

        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, accountNumber);
            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Error deleting account", e);
        }
    }

    private Account mapToAccount(ResultSet rs) throws SQLException {
        Account account = new Account();
        account.setAccountId(rs.getInt("account_id"));
        account.setCustomerId(rs.getInt("customer_id"));
        account.setAccountNumber(rs.getString("account_number"));
        account.setAadharNumber(rs.getString("aadhar_number"));
        account.setIfscCode(rs.getString("ifsc_code"));
        account.setPhoneNumberLinked(rs.getString("phone_number_linked"));
        account.setAmount(rs.getDouble("amount"));
        account.setBankName(rs.getString("bank_name"));
        account.setNameOnAccount(rs.getString("name_on_account"));
        account.setStatus(rs.getString("status"));
        account.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        account.setModifiedAt(rs.getTimestamp("modified_at").toLocalDateTime());
        return account;
    }
}
