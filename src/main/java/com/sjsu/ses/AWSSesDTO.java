package com.sjsu.ses;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Getter
public class AWSSesDTO {

    @Email(message = "Invalid Email address")
    private String fromAddress;
    @Email(message = "Invalid Email address")
    private String toAddress;
    @NotEmpty(message = "Email body cannot be Null")
    private String htmlBody;
    private String textBody;
    private String subject = "";
}