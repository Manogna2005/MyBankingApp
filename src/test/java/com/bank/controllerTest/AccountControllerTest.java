package com.bank.controllerTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.bank.api.AccountResource;
import com.bank.model.Account;
import com.bank.service.AccountService;

import jakarta.validation.ConstraintViolationException;

@ExtendWith(MockitoExtension.class)
public class AccountControllerTest {

    @Mock
    private AccountService accountService;

    @InjectMocks
    private AccountResource accountResource;

    private Account validAccount;

    @BeforeEach
    void setup() {
        validAccount = new Account();
        validAccount.setAccountId(1);
        validAccount.setCustomerId(1);
        validAccount.setAccountNumber("ACC123456");
        validAccount.setAadharNumber("123456789012");
        validAccount.setIfscCode("BANK0012");
        validAccount.setPhoneNumberLinked("9876543210");
        validAccount.setAmount(1000.0);
        validAccount.setBankName("Simulated Bank");
        validAccount.setNameOnAccount("Alice");
        validAccount.setStatus("ACTIVE");
    }

    @Test
    void testCreateAccountSuccess() {
        doNothing().when(accountService).createAccount(any(Account.class));
        assertDoesNotThrow(() -> accountResource.createAccount(validAccount));
        verify(accountService, times(1)).createAccount(any(Account.class));
    }

    @Test
    void testCreateAccountInvalidAccountNumber() {
        Account invalid = copy(validAccount); invalid.setAccountNumber("");
        assertThrows(ConstraintViolationException.class, () -> accountResource.createAccount(invalid));
    }

    @Test
    void testCreateAccountInvalidAadhar() {
        Account invalid = copy(validAccount); invalid.setAadharNumber("abc");
        assertThrows(ConstraintViolationException.class, () -> accountResource.createAccount(invalid));
    }

    @Test
    void testCreateAccountInvalidIfsc() {
        Account invalid = copy(validAccount); invalid.setIfscCode("");
        assertThrows(ConstraintViolationException.class, () -> accountResource.createAccount(invalid));
    }

    @Test
    void testCreateAccountInvalidPhone() {
        Account invalid = copy(validAccount); invalid.setPhoneNumberLinked("222");
        assertThrows(ConstraintViolationException.class, () -> accountResource.createAccount(invalid));
    }

    @Test
    void testCreateAccountNegativeAmount() {
        Account invalid = copy(validAccount); invalid.setAmount(-50.0);
        assertThrows(ConstraintViolationException.class, () -> accountResource.createAccount(invalid));
    }

    @Test
    void testCreateAccountInvalidNameOnAccount() {
        Account invalid = copy(validAccount); invalid.setNameOnAccount("Alice123");
        assertThrows(ConstraintViolationException.class, () -> accountResource.createAccount(invalid));
    }

    @Test
    void testCreateAccountBlankBankName() {
        Account invalid = copy(validAccount); invalid.setBankName("");
        assertThrows(ConstraintViolationException.class, () -> accountResource.createAccount(invalid));
    }

    @Test
    void testCreateAccountNullCustomerId() {
        Account invalid = copy(validAccount); invalid.setCustomerId(null);
        assertThrows(ConstraintViolationException.class, () -> accountResource.createAccount(invalid));
    }

    @Test
    void testCreateAccountBlankFields() {
        Account blank = new Account();
        assertThrows(ConstraintViolationException.class, () -> accountResource.createAccount(blank));
    }

    @Test
    void testGetAccountByNumberSuccess() {
        when(accountService.getAccountByNumber("ACC123456")).thenReturn(validAccount);
        assertEquals(200, accountResource.getAccountByNumber("ACC123456").getStatus());
        verify(accountService).getAccountByNumber("ACC123456");
    }

    @Test
    void testGetAccountByNumberNotFound() {
        when(accountService.getAccountByNumber("UNKNOWN")).thenReturn(null);
        assertEquals(404, accountResource.getAccountByNumber("UNKNOWN").getStatus());
    }

    @Test
    void testGetAccountsByCustomerId() {
        when(accountService.getAccountsByCustomerId(1)).thenReturn(List.of(validAccount));
        assertEquals(200, accountResource.getAccountsByCustomerId(1).getStatus());
    }

    // Utility method to clone Account for each test case
    private Account copy(Account orig) {
        Account a = new Account();
        a.setAccountId(orig.getAccountId());
        a.setCustomerId(orig.getCustomerId());
        a.setAccountNumber(orig.getAccountNumber());
        a.setAadharNumber(orig.getAadharNumber());
        a.setIfscCode(orig.getIfscCode());
        a.setPhoneNumberLinked(orig.getPhoneNumberLinked());
        a.setAmount(orig.getAmount());
        a.setBankName(orig.getBankName());
        a.setNameOnAccount(orig.getNameOnAccount());
        a.setStatus(orig.getStatus());
        a.setCreatedAt(orig.getCreatedAt());
        a.setModifiedAt(orig.getModifiedAt());
        return a;
    }
}
