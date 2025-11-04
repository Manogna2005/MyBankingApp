package com.bank.model;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class Account {

    private int accountId;

    @NotNull(message = "Customer ID cannot be null")
    private Integer customerId;

    @NotBlank(message = "Account number is required")
    private String accountNumber;

    @NotBlank(message = "Aadhar number is required")
    @Pattern(regexp = "^[0-9]{12}$", message = "Aadhar number must be exactly 12 digits")
    private String aadharNumber;

    @NotBlank(message = "IFSC code is required")
    private String ifscCode;

    @NotBlank(message = "Linked phone number is required")
    @Pattern(regexp = "^[6-9][0-9]{9}$", message = "Phone number must be 10 digits and start with 6-9")
    private String phoneNumberLinked;

    @Min(value = 0, message = "Initial amount must be zero or positive")
    private double amount = 600.0;

    @NotBlank(message = "Bank name is required")
    private String bankName;

    @NotBlank(message = "Name on account is required")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Name on account must only contain alphabets and spaces")
    private String nameOnAccount;

    private String status = "ACTIVE";
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime modifiedAt = LocalDateTime.now();

    public int getAccountId() { return accountId; }
    public void setAccountId(int accountId) { this.accountId = accountId; }
    public Integer getCustomerId() { return customerId; }
    public void setCustomerId(Integer customerId) { this.customerId = customerId; }
    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }
    public String getAadharNumber() { return aadharNumber; }
    public void setAadharNumber(String aadharNumber) { this.aadharNumber = aadharNumber; }
    public String getIfscCode() { return ifscCode; }
    public void setIfscCode(String ifscCode) { this.ifscCode = ifscCode; }
    public String getPhoneNumberLinked() { return phoneNumberLinked; }
    public void setPhoneNumberLinked(String phoneNumberLinked) { this.phoneNumberLinked = phoneNumberLinked; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }
    public String getNameOnAccount() { return nameOnAccount; }
    public void setNameOnAccount(String nameOnAccount) { this.nameOnAccount = nameOnAccount; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getModifiedAt() { return modifiedAt; }
    public void setModifiedAt(LocalDateTime modifiedAt) { this.modifiedAt = modifiedAt; }
}
