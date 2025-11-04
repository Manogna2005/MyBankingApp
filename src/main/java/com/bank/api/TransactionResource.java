package com.bank.api;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.bank.dto.TransferRequest;
import com.bank.model.Transaction;
import com.bank.service.TransactionService;
import com.bank.service.impl.TransactionServiceImpl;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/transactions")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class TransactionResource {

    // Do NOT construct service directly, allow injection
    private final TransactionService transactionService;

    // Production constructor: new TransactionResource() uses real service
    public TransactionResource() {
        this.transactionService = new TransactionServiceImpl();
    }

    // Testing constructor: allows mock injection from @InjectMocks
    public TransactionResource(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @POST
    @Path("/transfer")
    public Response transferFunds(TransferRequest request) {
        try {
            transactionService.transfer(
                request.getSenderAccountNumber(),
                request.getReceiverAccountNumber(),
                request.getTransferAmount(),
                request.getPin()
            );
            return Response.status(Response.Status.CREATED)
                .entity("{\"message\":\"Transaction successful\"}").build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                .entity("{\"error\":\"" + e.getMessage() + "\"}").build();
        }
    }

    @GET
@Path("/{accountNumber}")
@Produces({MediaType.APPLICATION_JSON, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})
public Response getTransactions(@PathParam("accountNumber") String accountNumber, @HeaderParam("Accept") String acceptHeader) throws IOException {
    List<Transaction> txs = transactionService.getTransactionsByAccountNumber(accountNumber);

    // If download is requested via Accept header, return Excel
    if (acceptHeader != null && acceptHeader.contains("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Transactions");

        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("Transaction ID");
        header.createCell(1).setCellValue("Date");
        header.createCell(2).setCellValue("Type");
        header.createCell(3).setCellValue("Amount");

        int rowIdx = 1;
        for (Transaction t : txs) {
            Row row = sheet.createRow(rowIdx++);
            row.createCell(0).setCellValue(t.getTransactionId());
            row.createCell(1).setCellValue(t.getTransactionDate().toString());
            row.createCell(2).setCellValue(t.getTransactionType());
            row.createCell(3).setCellValue(t.getAmount());
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        return Response.ok(new ByteArrayInputStream(out.toByteArray()))
                .header("Content-Disposition", "attachment; filename=transaction-history.xlsx")
                .build();
    }

    // Default: return JSON as before
    return Response.ok(txs).build();
}
}
