package com.sjsu.sns;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Getter
public class SnsDTO {

  private String phoneNumber;
  private String message;
}