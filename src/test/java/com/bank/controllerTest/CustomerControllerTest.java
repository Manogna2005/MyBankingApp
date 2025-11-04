package com.bank.controllerTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.bank.api.CustomerResource;
import com.bank.model.Customer;
import com.bank.service.CustomerService;

import jakarta.validation.ConstraintViolationException;

@ExtendWith(MockitoExtension.class)
public class CustomerControllerTest {

    @Mock
    private CustomerService customerService;

    @InjectMocks
    private CustomerResource customerResource;

    private Customer validCustomer;

    @BeforeEach
    void setup() {
        validCustomer = new Customer();
        validCustomer.setName("Alice");
        validCustomer.setPhoneNumber("9123456789");
        validCustomer.setEmail("alice@example.com");
        validCustomer.setAddress("123 Street");
        validCustomer.setAadharNumber("123456789012");
        validCustomer.setCustomerPin("1234");
    }

    @Test
    void testCreateCustomerSuccess() {
        doNothing().when(customerService).createCustomer(any(Customer.class));
        assertDoesNotThrow(() -> customerResource.createCustomer(validCustomer));
        verify(customerService, times(1)).createCustomer(any(Customer.class));
    }

    @Test
    void testCreateCustomerInvalidPhone() {
        Customer invalidCustomer = new Customer();
        invalidCustomer.setName("Alice");
        invalidCustomer.setPhoneNumber("abc123"); // invalid phone
        invalidCustomer.setEmail("alice@example.com");
        invalidCustomer.setAddress("123 Street");
        invalidCustomer.setAadharNumber("123456789012");
        invalidCustomer.setCustomerPin("1234");
        assertThrows(ConstraintViolationException.class, () -> customerResource.createCustomer(invalidCustomer));
    }

    @Test
    void testCreateCustomerInvalidAadhar() {
        Customer invalidCustomer = new Customer();
        invalidCustomer.setName("Alice");
        invalidCustomer.setPhoneNumber("9123456789");
        invalidCustomer.setEmail("alice@example.com");
        invalidCustomer.setAddress("123 Street");
        invalidCustomer.setAadharNumber("abc"); // invalid aadhar
        invalidCustomer.setCustomerPin("1234");
        assertThrows(ConstraintViolationException.class, () -> customerResource.createCustomer(invalidCustomer));
    }

    @Test
    void testCreateCustomerInvalidName() {
        Customer invalidCustomer = new Customer();
        invalidCustomer.setName("Alice123"); // invalid name
        invalidCustomer.setPhoneNumber("9123456789");
        invalidCustomer.setEmail("alice@example.com");
        invalidCustomer.setAddress("123 Street");
        invalidCustomer.setAadharNumber("123456789012");
        invalidCustomer.setCustomerPin("1234");
        assertThrows(ConstraintViolationException.class, () -> customerResource.createCustomer(invalidCustomer));
    }

    @Test
    void testGetCustomerSuccess() {
        when(customerService.getCustomerById(1)).thenReturn(validCustomer);
        assertEquals(200, customerResource.getCustomer(1).getStatus());
        verify(customerService).getCustomerById(1);
    }

    @Test
    void testGetCustomerNotFound() {
        when(customerService.getCustomerById(999)).thenReturn(null);
        assertEquals(404, customerResource.getCustomer(999).getStatus());
    }

    @Test
    void testUpdateCustomerSuccess() {
        Customer updateCustomer = new Customer();
        updateCustomer.setName("Updated Name");
        updateCustomer.setPhoneNumber("9876543210");
        updateCustomer.setEmail("updated@example.com");
        updateCustomer.setAddress("321 New Ave");
        updateCustomer.setAadharNumber("987654321012");
        updateCustomer.setCustomerPin("4321");

        when(customerService.getCustomerById(1)).thenReturn(validCustomer);
        doNothing().when(customerService).updateCustomer(eq(1), any(Customer.class));
        assertEquals(200, customerResource.updateCustomer(1, updateCustomer).getStatus());
    }

    @Test
    void testUpdateCustomerNotFound() {
        Customer updateCustomer = new Customer();
        updateCustomer.setName("Updated Name");
        updateCustomer.setPhoneNumber("9876543210");
        updateCustomer.setEmail("updated@example.com");
        updateCustomer.setAddress("321 New Ave");
        updateCustomer.setAadharNumber("987654321012");
        updateCustomer.setCustomerPin("4321");

        when(customerService.getCustomerById(999)).thenReturn(null);
        assertEquals(404, customerResource.updateCustomer(999, updateCustomer).getStatus());
    }

    @Test
    void testDeleteCustomerSuccess() {
        when(customerService.getCustomerById(1)).thenReturn(validCustomer);
        doNothing().when(customerService).deleteCustomer(1);
        assertEquals(200, customerResource.deleteCustomer(1).getStatus());
    }

    @Test
    void testDeleteCustomerNotFound() {
        when(customerService.getCustomerById(999)).thenReturn(null);
        assertEquals(404, customerResource.deleteCustomer(999).getStatus());
    }

    @Test
    void testGetAllCustomers() {
        when(customerService.getAllCustomers()).thenReturn(List.of(validCustomer));
        assertEquals(200, customerResource.getAllCustomers().getStatus());
    }

    @Test
    void testCreateCustomerMaxLengthName() {
        Customer maxNameCustomer = new Customer();
        maxNameCustomer.setName("A".repeat(100));
        maxNameCustomer.setPhoneNumber("9123456789");
        maxNameCustomer.setEmail("max@example.com");
        maxNameCustomer.setAddress("123 Street");
        maxNameCustomer.setAadharNumber("123456789012");
        maxNameCustomer.setCustomerPin("1234");
        assertDoesNotThrow(() -> customerResource.createCustomer(maxNameCustomer));
    }

    @Test
    void testCreateCustomerBlankFields() {
        Customer blankCustomer = new Customer();
        blankCustomer.setName("");
        blankCustomer.setPhoneNumber("");
        blankCustomer.setEmail("test@example.com");
        blankCustomer.setAddress("Some Address");
        blankCustomer.setAadharNumber("123456789012");
        blankCustomer.setCustomerPin("1234");
        assertThrows(ConstraintViolationException.class, () -> customerResource.createCustomer(blankCustomer));
    }
}
