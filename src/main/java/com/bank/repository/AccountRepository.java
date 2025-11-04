package com.bank.repository;

import java.util.List;

import com.bank.model.Account;

public interface AccountRepository {
    void createAccount(Account account);
    Account getAccountByNumber(String accountNumber);
    List<Account> getAccountsByCustomerId(int customerId);
    void updateAccount(String accountNumber, Account account);
    void deleteAccount(String accountNumber);
}
