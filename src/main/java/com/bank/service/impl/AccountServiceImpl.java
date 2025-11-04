package com.bank.service.impl;

import java.util.List;

import com.bank.model.Account;
import com.bank.repository.AccountRepository;
import com.bank.repository.impl.AccountRepositoryImpl;
import com.bank.service.AccountService;

public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository = new AccountRepositoryImpl();

    @Override
    public void createAccount(Account account) {
        accountRepository.createAccount(account);
    }

    @Override
    public Account getAccountByNumber(String accountNumber) {
        return accountRepository.getAccountByNumber(accountNumber);
    }

    @Override
    public List<Account> getAccountsByCustomerId(int customerId) {
        return accountRepository.getAccountsByCustomerId(customerId);
    }

    @Override
    public void updateAccount(String accountNumber, Account account) {
        accountRepository.updateAccount(accountNumber, account);
    }

    @Override
    public void deleteAccount(String accountNumber) {
        accountRepository.deleteAccount(accountNumber);
    }
}
