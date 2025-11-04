package com.bank.service.impl;

import java.util.List;

import com.bank.model.Customer;
import com.bank.repository.CustomerRepository;
import com.bank.repository.impl.CustomerRepositoryImpl;
import com.bank.service.CustomerService;

public class CustomerServiceImpl implements CustomerService {

    private CustomerRepository customerRepository = new CustomerRepositoryImpl();

    @Override
    public void createCustomer(Customer customer) {
        customerRepository.createCustomer(customer);
    }

    @Override
    public Customer getCustomerById(int id) {
        return customerRepository.getCustomerById(id);
    }

    @Override
    public Customer getCustomerByAadhar(String aadharNumber) {
        return customerRepository.getCustomerByAadhar(aadharNumber);
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.getAllCustomers();
    }

    @Override
    public void updateCustomer(int id, Customer customer) {
        customerRepository.updateCustomer(id, customer);
    }

    @Override
    public void deleteCustomer(int id) {
        customerRepository.deleteCustomer(id);
    }
}
