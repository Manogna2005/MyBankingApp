package com.bank.service;

import java.util.List;

import com.bank.model.Account;

public interface AccountService {
    void createAccount(Account account);
    Account getAccountByNumber(String accountNumber);
    List<Account> getAccountsByCustomerId(int customerId);
    void updateAccount(String accountNumber, Account account);
    void deleteAccount(String accountNumber);
}
