package com.sjsu.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class RecepientDTO {
  private Integer custAccountID;
  private String firstName;
  private String lastName;
  private Integer zipCode;
  private Integer accountNum;
  private String nickName;
  private Integer routingNumber;
  private boolean isSameBank;

  public RecepientDTO(Integer custAccountID, String firstName, String lastName, Integer zipCode, Integer accountNum,
      String nickName, Integer routingNumber, boolean isSameBank) {
    this.custAccountID = custAccountID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.zipCode = zipCode;
    this.accountNum = accountNum;
    this.nickName = nickName;
    this.routingNumber = routingNumber;
    this.isSameBank = isSameBank;
  }

}
