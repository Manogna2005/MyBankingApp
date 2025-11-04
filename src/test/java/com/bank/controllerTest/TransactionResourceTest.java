package com.bank.controllerTest;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.anyDouble;
import static org.mockito.ArgumentMatchers.anyString;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.bank.api.TransactionResource;
import com.bank.dto.TransferRequest;
import com.bank.model.Transaction;
import com.bank.service.TransactionService;

import jakarta.ws.rs.core.Response;

@ExtendWith(MockitoExtension.class)
public class TransactionResourceTest {

    @Mock
    private TransactionService transactionService;

    @InjectMocks
    private TransactionResource transactionResource;

    @Test
    void testTransferFundsSuccess() {
        // Setup for success scenario
        TransferRequest req = new TransferRequest();
        req.setSenderAccountNumber("100000000120");
        req.setReceiverAccountNumber("200000000201");
        req.setTransferAmount(500.0);
        req.setPin("1234");

        doNothing().when(transactionService)
            .transfer(anyString(), anyString(), anyDouble(), anyString());

        Response response = transactionResource.transferFunds(req);
        assertEquals(201, response.getStatus(), "Transaction should succeed with status 201");
    }

    @Test
    void testTransferFundsInsufficientBalance() {
        // Setup for insufficient balance
        TransferRequest req = new TransferRequest();
        req.setSenderAccountNumber("100000000120");
        req.setReceiverAccountNumber("200000000201");
        req.setTransferAmount(10000.0);
        req.setPin("1234");

        doThrow(new IllegalArgumentException("Insufficient balance"))
            .when(transactionService)
            .transfer(anyString(), anyString(), anyDouble(), anyString());

        Response response = transactionResource.transferFunds(req);
        assertEquals(400, response.getStatus());
        assertTrue(response.getEntity().toString().contains("Insufficient balance"));
    }

    @Test
    void testTransferFundsSameAccount() {
        // Setup for same account error
        TransferRequest req = new TransferRequest();
        req.setSenderAccountNumber("100000000120");
        req.setReceiverAccountNumber("100000000120");
        req.setTransferAmount(100.0);
        req.setPin("1234");

        doThrow(new IllegalArgumentException("Sender and receiver account numbers must be different"))
            .when(transactionService)
            .transfer(anyString(), anyString(), anyDouble(), anyString());

        Response response = transactionResource.transferFunds(req);
        assertEquals(400, response.getStatus());
        assertTrue(response.getEntity().toString().contains("must be different"));
    }

    @Test
    void testTransferFundsAccountNotFound() {
        // Setup for account not found
        TransferRequest req = new TransferRequest();
        req.setSenderAccountNumber("nonexistent");
        req.setReceiverAccountNumber("200000000201");
        req.setTransferAmount(100.0);
        req.setPin("1234");

        doThrow(new IllegalArgumentException("Sender or receiver account not found"))
            .when(transactionService)
            .transfer(anyString(), anyString(), anyDouble(), anyString());

        Response response = transactionResource.transferFunds(req);
        assertEquals(400, response.getStatus());
        assertTrue(response.getEntity().toString().contains("account not found"));
    }

   @Test
void testGetTransactionsSuccess() throws IOException {
    Transaction t = new Transaction();
    t.setTransactionId(1);
    t.setAccountId(1001);                  // Example account ID
    t.setTransactionType("CREDIT");        // or "DEBIT"
    t.setAmount(500.0);
    t.setTransactionDate(LocalDateTime.now()); // <-- Set a valid date!

    List<Transaction> txs = List.of(t);
    when(transactionService.getTransactionsByAccountNumber("100000000120")).thenReturn(txs);

    Response response = transactionResource.getTransactions("100000000120", null);
    assertEquals(200, response.getStatus());
}

}
