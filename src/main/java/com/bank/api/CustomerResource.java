package com.bank.api;

import java.util.List;
import java.util.Set;

import com.bank.model.Customer;
import com.bank.service.CustomerService;
import com.bank.service.impl.CustomerServiceImpl;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/customers")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CustomerResource { 

    private CustomerService customerService = new CustomerServiceImpl();
    private Validator validator;

    public CustomerResource() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createCustomer(Customer customer) {
        Set<ConstraintViolation<Customer>> violations = validator.validate(customer);
        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }
        customerService.createCustomer(customer);
        return Response.status(Response.Status.CREATED).entity(customer).build();
    }

    @GET
    @Path("/{id}")
    public Response getCustomer(@PathParam("id") int id) {
        Customer customer = customerService.getCustomerById(id);
        if (customer == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\":\"Customer not found\"}")
                    .build();
        }
        return Response.ok(customer).build();
    }
    
    @GET
    @Path("/aadhar/{aadharNumber}")
    public Response getCustomerByAadhar(@PathParam("aadharNumber") String aadharNumber) {
        Customer customer = customerService.getCustomerByAadhar(aadharNumber);
        if (customer == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\":\"Customer not found\"}")
                    .build();
        }
        return Response.ok(customer).build();
    }

    @GET
    public Response getAllCustomers() {
        List<Customer> list = customerService.getAllCustomers();
        return Response.ok(list).build();
    }

    @PUT
    @Path("/{id}")
    public Response updateCustomer(@PathParam("id") int id, Customer customer) {
        Set<ConstraintViolation<Customer>> violations = validator.validate(customer);
        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }
        Customer existing = customerService.getCustomerById(id);
        if (existing == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\":\"Customer not found\"}")
                    .build();
        }
        customerService.updateCustomer(id, customer);
        return Response.ok(customer).build();
    }
   

    @DELETE
    @Path("/{id}")
    public Response deleteCustomer(@PathParam("id") int id) {
        Customer existing = customerService.getCustomerById(id);
        if (existing == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\":\"Customer not found\"}")
                    .build();
        }
        customerService.deleteCustomer(id);
        return Response.ok("{\"message\":\"Customer deleted successfully\"}").build();
    }
}
