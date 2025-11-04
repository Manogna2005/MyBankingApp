package com.bank.repository.impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.bank.model.Transaction;
import com.bank.repository.TransactionRepository;

public class TransactionRepositoryImpl implements TransactionRepository {

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
    public void insertTransaction(int accountId, String type, double amount) {
        String sql = "INSERT INTO Transactions (account_id, transaction_type, amount, transaction_date) VALUES (?, ?, ?, ?)";
        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setInt(1, accountId);
            stmt.setString(2, type);
            stmt.setDouble(3, amount);
            stmt.setTimestamp(4, Timestamp.valueOf(LocalDateTime.now()));
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error inserting transaction: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Transaction> getTransactionsByAccountId(int accountId) {
        List<Transaction> list = new ArrayList<>();
        String sql = "SELECT * FROM Transactions WHERE account_id = ?";
        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, accountId);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    list.add(mapTransaction(rs));
                }
            }
        } catch (SQLException e) {
            System.err.println("Error fetching transactions: " + e.getMessage());
            throw new RuntimeException(e);
        }
        return list;
    }

    private Transaction mapTransaction(ResultSet rs) throws SQLException {
        Transaction tx = new Transaction();
        tx.setTransactionId(rs.getInt("transaction_id"));
        tx.setAccountId(rs.getInt("account_id"));
        tx.setTransactionType(rs.getString("transaction_type"));
        tx.setAmount(rs.getDouble("amount"));
        Timestamp ts = rs.getTimestamp("transaction_date");
        if (ts != null) tx.setTransactionDate(ts.toLocalDateTime());
        return tx;
    }
}
