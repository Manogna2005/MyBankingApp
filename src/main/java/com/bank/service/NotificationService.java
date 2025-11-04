package com.bank.service;

import java.util.Properties;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

private final JavaMailSender mailSender = createMailSender();

private JavaMailSender createMailSender() {
JavaMailSenderImpl sender = new JavaMailSenderImpl();
sender.setHost("smtp.gmail.com");
sender.setPort(587);
sender.setUsername("manognasankar@gmail.com");     // <-- Your full Gmail address
sender.setPassword("sxtezjkiapuxqstk");        // <-- Paste the app password here (no spaces

    Properties props = sender.getJavaMailProperties();
    props.put("mail.transport.protocol", "smtp");
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.starttls.enable", "true");
    props.put("mail.debug", "true");
    return sender;
}


    public void sendNotification(String toEmail, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(content);
        mailSender.send(message);
    }

    public void sendSenderTransactionAlert(String senderEmail, double amount, String receiverName, String receiverAcc) {
        String subject = "Transaction Alert: Amount Debited";
        String body = "Hi,\n\nYou have sent ₹" + amount + " to " + receiverName +
                      " (Account: " + receiverAcc + ").\nThank you for using our bank.";
        sendNotification(senderEmail, subject, body);
    }

    public void sendReceiverTransactionAlert(String receiverEmail, double amount, String senderName, String senderAcc) {
        String subject = "Transaction Alert: Amount Credited";
        String body = "Hi,\n\nYou have received ₹" + amount + " from " + senderName +
                      " (Account: " + senderAcc + ").\nThank you for using our bank.";
        sendNotification(receiverEmail, subject, body);
    }
}
