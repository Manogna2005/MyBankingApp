package com.bank.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class TransferRequest {
    private String senderAccountNumber;
    private String receiverAccountNumber;
    private double transferAmount;

    @NotBlank(message = "PIN is required")
    @Pattern(regexp = "^[0-9]{4,10}$", message = "PIN must be 4-10 digits")
    private String pin;

    public String getSenderAccountNumber() { return senderAccountNumber; }
    public void setSenderAccountNumber(String senderAccountNumber) { this.senderAccountNumber = senderAccountNumber; }

    public String getReceiverAccountNumber() { return receiverAccountNumber; }
    public void setReceiverAccountNumber(String receiverAccountNumber) { this.receiverAccountNumber = receiverAccountNumber; }

    public double getTransferAmount() { return transferAmount; }
    public void setTransferAmount(double transferAmount) { this.transferAmount = transferAmount; }

    public String getPin() { return pin; }
    public void setPin(String pin) { this.pin = pin; }
}
