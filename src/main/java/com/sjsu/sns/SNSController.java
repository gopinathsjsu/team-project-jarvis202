package com.sjsu.sns;

import com.amazonaws.services.sns.AmazonSNSClient;
import com.amazonaws.services.sns.model.PublishRequest;
import com.amazonaws.services.sns.model.PublishResult;
import com.amazonaws.services.sns.model.SubscribeRequest;
import com.amazonaws.services.sns.model.MessageAttributeValue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

import javax.validation.Valid;

@RestController
@CrossOrigin("*")
public class SNSController {

  @Autowired
  private AmazonSNSClient snsClient;

  String topic_arn = "arn:aws:sns:us-east-1:311335242921:cmpe202-topic";

  @GetMapping("/subscribeByEmail/{emailid}")
  public String addCustomerByEmail(@PathVariable String emailid) {
    // snsService.
    try {
      SubscribeRequest sr = new SubscribeRequest(topic_arn, "email", emailid);
      snsClient.subscribe(sr);
    } catch (Exception e) {
      // TODO: handle exception
      System.out.println(e.getLocalizedMessage());
    }
    return "Subscription pending , To confirm subscription check email ";
  }

  @GetMapping("/subscribeByPhone/{phone}")
  public String addCustomerByPhone(@PathVariable String phone) {
    // snsService.
    try {
      SubscribeRequest sr = new SubscribeRequest(topic_arn, "SMS", phone);
      snsClient.subscribe(sr);
    } catch (Exception e) {
      // TODO: handle exception
      System.out.println(e.getLocalizedMessage());
    }
    return "Subscription successful for phone number " + phone;
  }

  @GetMapping("/sendMail")
  public String sendMessage() {
    try {
      PublishRequest pr = new PublishRequest(topic_arn, emailMessage(), "CMPE202 New Bank Account");
      snsClient.publish(pr);
    } catch (Exception e) {

    }
    return "Mail sent successfully";
  }

  @GetMapping("/sendSMSMessage/{phoneNum}")
  public int sendSMSMessage(@PathVariable String phoneNum) {
    int otpCode = 0;
    try {
      Map<String, MessageAttributeValue> smsAttributes = new HashMap<String, MessageAttributeValue>();
      smsAttributes.put("AWS.SNS.SMS.SenderID",
          new MessageAttributeValue().withStringValue("mySenderID").withDataType("String"));
      smsAttributes.put("AWS.SNS.SMS.SMSType",
          new MessageAttributeValue().withStringValue("Promotional").withDataType("String"));

      otpCode = (int) Math.floor(1000 + Math.random() * 9000);
      String message = "[CMPE202] Verification Code: " + otpCode + "\n" + "Please verify within 5 minutes.";
      snsClient.publish(
          new PublishRequest().withMessage(message).withPhoneNumber(phoneNum).withMessageAttributes(smsAttributes));

    } catch (Exception e) {
      System.out.println(e.getLocalizedMessage());
    }
    return otpCode;
  }


  @PostMapping(path ="/sendMessage", consumes = MediaType.APPLICATION_JSON_VALUE)
  public String sendMessage(@Valid @RequestBody SnsDTO details) {
    String res = "SMS sent successfully";
    try {
      Map<String, MessageAttributeValue> smsAttributes = new HashMap<String, MessageAttributeValue>();
      smsAttributes.put("AWS.SNS.SMS.SenderID",
          new MessageAttributeValue().withStringValue("mySenderID").withDataType("String"));
      smsAttributes.put("AWS.SNS.SMS.SMSType",
          new MessageAttributeValue().withStringValue("Promotional").withDataType("String"));

      snsClient.publish(
          new PublishRequest().withMessage(details.getMessage()).withPhoneNumber(details.getPhoneNumber()).withMessageAttributes(smsAttributes));

    } catch (Exception e) {
      System.out.println(e.getLocalizedMessage());
      res = "SMS sending Failure";
    }
    return res;
  }

  private String emailMessage() {
    return "Dear Customer, \n" + "\n" + "n" + "Thank you for opening account in this bank." + "\n"
        + "Kindly signup to proceed with online access";
  }
}
