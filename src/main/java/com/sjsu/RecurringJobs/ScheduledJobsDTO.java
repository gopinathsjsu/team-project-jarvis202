package com.sjsu.RecurringJobs;

import java.util.Date;

import com.sjsu.enums.TransactionType;

public class ScheduledJobsDTO {

  private Integer jobId;
  private String description;
  private Double amount;
  private Integer toAccount;
  private TransactionType transactionType;
  private String nextTransactionDate;
  private Integer fromAccount;
  private String transDate;
  private Integer customerId;

  public ScheduledJobsDTO(Integer jobId, String description,Double amount, 
      Integer toAccount, TransactionType transactionType, String nextTransactionDate, Integer fromAccount, String transDate,
      Integer customerId) {
    super();
    this.jobId = jobId;
    this.description = description;
    this.amount = amount;
    this.toAccount = toAccount;    
    this.transactionType = transactionType;    
    this.nextTransactionDate = nextTransactionDate;    
    this.fromAccount = fromAccount;    
    this.toAccount = toAccount;    
    this.transDate = transDate;
    this.customerId = customerId;

  }
  
}
