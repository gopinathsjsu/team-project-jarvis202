package com.sjsu.RecurringJobs;

import java.io.Serializable;
// import java.util.Date;
import java.sql.*;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.sjsu.enums.TransactionType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "ScheduledJobs")
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "jobId")
public class ScheduledJobs implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "job_id")
	private Integer jobId;

	@Column(name = "description")
	private String description;

	@Column(name = "amount")
	private Double amount;

	@Column(name = "to_account")
	private Integer toAccount;

	@Enumerated(EnumType.STRING)
	@Column(name = "transaction_type")
	private TransactionType transactionType;

	// @Column(name = "next_transaction_date")
	// private String nextTransactionDate;

	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(name = "next_transaction_date")
	private Date nextTransactionDate;

	@Column(name = "from_account")
    private Integer fromAccount;
  
  // @Column(name="trans_date")
	// private String transDate;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(name="trans_date")
	private Date transDate;

  @Column(name = "customer_id")
  private Integer customerId;
}
