package com.bank.service;

import java.util.List;

import com.bank.model.Transaction;

public interface TransactionService {
    void transfer(String senderAccountNumber, String receiverAccountNumber, double amount, String pin);
    List<Transaction> getTransactionsByAccountNumber(String accountNumber);
}
