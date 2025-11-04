package com.bank.model;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class Customer {

    private int customerId;

    @NotBlank(message = "Name cannot be blank")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Name must only contain alphabets")
    private String name;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[6-9][0-9]{9}$", message = "Phone number must be valid and start with 6/7/8/9")
    private String phoneNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Address is required")
    @Size(max = 200, message = "Address should not exceed 200 characters")
    private String address;

    @NotBlank(message = "Aadhar number is required")
    @Pattern(regexp = "^[0-9]{12}$", message = "Aadhar must be a 12 digit number")
    private String aadharNumber;

    @NotBlank(message = "Customer PIN is required")
    @Pattern(regexp = "^[0-9]{4,10}$", message = "Customer PIN must be 4-10 digits")
    private String customerPin;

    private LocalDate dob;

    private String status;


    public int getCustomerId() { return customerId; }
    public void setCustomerId(int customerId) { this.customerId = customerId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getAadharNumber() { return aadharNumber; }
    public void setAadharNumber(String aadharNumber) { this.aadharNumber = aadharNumber; }

    public String getCustomerPin() { return customerPin; }
    public void setCustomerPin(String customerPin) { this.customerPin = customerPin; }

    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
