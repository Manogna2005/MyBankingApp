package com.bank.api;

import java.util.List;
import java.util.Set;

import com.bank.model.Account;
import com.bank.service.AccountService;
import com.bank.service.impl.AccountServiceImpl;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
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

@Path("/accounts")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AccountResource {

    private AccountService accountService;
    private Validator validator;

    // Default constructor using real implementation
    public AccountResource() {
        this.accountService = new AccountServiceImpl();
        this.validator = Validation.buildDefaultValidatorFactory().getValidator();
    }

    // Constructor for injecting mock service in tests
    public AccountResource(AccountService accountService) {
        this.accountService = accountService;
        this.validator = Validation.buildDefaultValidatorFactory().getValidator();
    }

    @POST
    public Response createAccount(Account account) {
        Set<ConstraintViolation<Account>> violations = validator.validate(account);
        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }
        accountService.createAccount(account);
        return Response.status(Response.Status.CREATED).entity(account).build();
    }

    @GET
    @Path("/{accountNumber}")
    public Response getAccountByNumber(@PathParam("accountNumber") String accountNumber) {
        Account account = accountService.getAccountByNumber(accountNumber);
        if (account == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(account).build();
    }

    @GET
    @Path("/customer/{customerId}")
    public Response getAccountsByCustomerId(@PathParam("customerId") int customerId) {
        List<Account> accounts = accountService.getAccountsByCustomerId(customerId);
        return Response.ok(accounts).build();
    }

    @PUT
    @Path("/{accountNumber}")
    public Response updateAccount(@PathParam("accountNumber") String accountNumber, Account account) {
        Set<ConstraintViolation<Account>> violations = validator.validate(account);
        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }
        accountService.updateAccount(accountNumber, account);
        return Response.ok(account).build();
    }

    
    @DELETE
    @Path("/{accountNumber}")
    public Response deleteAccount(@PathParam("accountNumber") String accountNumber) {
        accountService.deleteAccount(accountNumber);
        return Response.noContent().build();
    }
}
