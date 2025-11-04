package com.bank.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bank.model.Account;
import com.bank.model.Transaction;
import com.bank.repository.AccountRepository;
import com.bank.repository.CustomerRepository;
import com.bank.repository.TransactionRepository;
import com.bank.repository.impl.AccountRepositoryImpl;
import com.bank.repository.impl.CustomerRepositoryImpl;
import com.bank.repository.impl.TransactionRepositoryImpl;
import com.bank.service.NotificationService;
import com.bank.service.TransactionService;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final AccountRepository accountRepo = new AccountRepositoryImpl();
    private final TransactionRepository transactionRepo = new TransactionRepositoryImpl();
    private final CustomerRepository customerRepo = new CustomerRepositoryImpl();
    private final NotificationService notificationService = new NotificationService();
    @Override
    public void transfer(String senderAccountNumber, String receiverAccountNumber, double amount, String pin) {
        if (senderAccountNumber.equals(receiverAccountNumber)) {
            throw new IllegalArgumentException("Sender and receiver account numbers must be different");
        }

        Account sender = accountRepo.getAccountByNumber(senderAccountNumber);
        Account receiver = accountRepo.getAccountByNumber(receiverAccountNumber);

        if (sender == null || receiver == null) {
            throw new IllegalArgumentException("Sender or receiver account not found");
        }

        String storedPin = customerRepo.getCustomerPinById(sender.getCustomerId());
        if (storedPin == null || !storedPin.equals(pin)) {
            throw new IllegalArgumentException("Invalid PIN for sender account");
        }

        if (sender.getAmount() < amount) {
            throw new IllegalArgumentException("Insufficient balance");
        }

        // Debit sender
        sender.setAmount(sender.getAmount() - amount);
        accountRepo.updateAccount(senderAccountNumber, sender);
        transactionRepo.insertTransaction(sender.getAccountId(), "DEBIT", amount);

        // Credit receiver
        receiver.setAmount(receiver.getAmount() + amount);
        accountRepo.updateAccount(receiverAccountNumber, receiver);
        transactionRepo.insertTransaction(receiver.getAccountId(), "CREDIT", amount);

        // Fetch sender and receiver emails and names
        String senderEmail = customerRepo.getCustomerEmailById(sender.getCustomerId());
        String senderName = customerRepo.getCustomerNameById(sender.getCustomerId());
        String receiverEmail = customerRepo.getCustomerEmailById(receiver.getCustomerId());
        String receiverName = customerRepo.getCustomerNameById(receiver.getCustomerId());

        // Send notifications
        notificationService.sendSenderTransactionAlert(senderEmail, amount, receiverName, receiverAccountNumber);
        notificationService.sendReceiverTransactionAlert(receiverEmail, amount, senderName, senderAccountNumber);
    }

    @Override
    public List<Transaction> getTransactionsByAccountNumber(String accountNumber) {
        Account account = accountRepo.getAccountByNumber(accountNumber);
        if (account == null) {
            throw new IllegalArgumentException("Account not found");
        }
        return transactionRepo.getTransactionsByAccountId(account.getAccountId());
    }
}
