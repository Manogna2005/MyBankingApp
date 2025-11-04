package com.bank.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bank.service.NotificationService;

@RestController
@RequestMapping("/notifications")
public class NotificationResource {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/send/sender")
public String sendSenderNotification(@RequestParam String toEmail,
                                     @RequestParam double amount,
                                     @RequestParam String receiverName,
                                     @RequestParam String receiverAccount) {
    notificationService.sendSenderTransactionAlert(toEmail, amount, receiverName, receiverAccount);
    return "Sender notification sent!";
}

@PostMapping("/send/receiver")
public String sendReceiverNotification(@RequestParam String toEmail,
                                       @RequestParam double amount,
                                       @RequestParam String senderName,
                                       @RequestParam String senderAccount) {
    notificationService.sendReceiverTransactionAlert(toEmail, amount, senderName, senderAccount);
    return "Receiver notification sent!";
}

}
