package com.sjsu.ses;

import java.io.IOException;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClientBuilder;
import com.amazonaws.services.simpleemail.model.Body;
import com.amazonaws.services.simpleemail.model.Content;
import com.amazonaws.services.simpleemail.model.Destination;
import com.amazonaws.services.simpleemail.model.Message;
import com.amazonaws.services.simpleemail.model.SendEmailRequest;

import org.springframework.stereotype.Service;

@Service
public class AWSSesService {

        public void sendEmail(String fromAddress, String toAddress, String htmlBody, String textBody, String subject)
                        throws IOException {

                try {
                        AmazonSimpleEmailService client = AmazonSimpleEmailServiceClientBuilder.standard()
                                        .withRegion(Regions.US_EAST_1).build();

                        SendEmailRequest request = new SendEmailRequest()
                                        .withDestination(new Destination().withToAddresses(toAddress))
                                        .withMessage(new Message()
                                                        .withBody(new Body()
                                                                        .withHtml(new Content().withCharset("UTF-8")
                                                                                        .withData(htmlBody))
                                                                        .withText(new Content().withCharset("UTF-8")
                                                                                        .withData(textBody)))
                                                        .withSubject(new Content().withCharset("UTF-8")
                                                                        .withData(subject)))
                                        .withSource(fromAddress);

                        client.sendEmail(request);
                        System.out.println("Email sent!");
                } catch (Exception ex) {
                        System.out.println("The email was not sent. Error message: " + ex.getMessage());
                }
        }
}