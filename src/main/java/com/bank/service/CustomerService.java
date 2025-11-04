package com.bank.service;

import java.util.List;

import com.bank.model.Customer;

public interface CustomerService {
    void createCustomer(Customer customer);
    Customer getCustomerById(int id);
    List<Customer> getAllCustomers();
    Customer getCustomerByAadhar(String aadharNumber);
    void updateCustomer(int id, Customer customer);
    void deleteCustomer(int id);
}
