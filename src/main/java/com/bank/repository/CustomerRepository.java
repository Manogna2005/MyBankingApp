package com.bank.repository;

import java.util.List;

import com.bank.model.Customer;

public interface CustomerRepository {
    void createCustomer(Customer customer);
    Customer getCustomerById(int id);
    List<Customer> getAllCustomers();
    Customer getCustomerByAadhar(String aadharNumber);
    String getCustomerPinById(int customerId);
    void updateCustomer(int id, Customer customer);
    void deleteCustomer(int id);
    String getCustomerEmailById(int customerId);
    String getCustomerNameById(int customerId);
}
