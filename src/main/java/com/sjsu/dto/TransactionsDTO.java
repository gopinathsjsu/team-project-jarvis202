package com.sjsu.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.sjsu.enums.TransactionType;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.util.*;

@Data
@NoArgsConstructor
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class TransactionsDTO {

  Integer transactionId;
  String description;
  Double amount;
  Integer toAccount;
  TransactionType transactionType;
  Date transactionDate;
  Integer fromAccount;

  public TransactionsDTO(Integer transactionId, Integer fromAccount, Integer toAccount, String description, Double amount, TransactionType transactionType, Date transactionDate) {
    super();
    this.transactionId = transactionId;
    this.fromAccount = fromAccount;
    this.toAccount = toAccount;
    this.description = description;
    this.amount = amount;
    this.transactionType = transactionType;
    this.transactionDate = transactionDate;
  }
}
