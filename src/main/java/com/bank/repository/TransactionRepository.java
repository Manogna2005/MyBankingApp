package com.bank.repository;

import java.util.List;

import com.bank.model.Transaction;

public interface TransactionRepository {
    void insertTransaction(int accountId, String type, double amount);
    List<Transaction> getTransactionsByAccountId(int accountId);
}
