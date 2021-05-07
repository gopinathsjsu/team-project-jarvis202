package com.sjsu.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class CustomerResponseDTO {

	private String userName;
	private String firstName;
	private int accNumber;
	private String accountType;
	private String accountStatus;
	private int routingNo;
	private String coApplicant;
	private double balance;
	private String emailId;
	private String phoneNumber;
	private Integer customerId;

	public CustomerResponseDTO(String userName, String firstName, int accNumber, String accountType) {
		super();
		this.userName = userName;
		this.firstName = firstName;
		this.accNumber = accNumber;
		this.accountType = accountType;
	}

	public CustomerResponseDTO(String userName, int accNumber, String accountType, int routingNo, String coApplicant,
			double balance) {
		super();
		this.userName = userName;
		this.accNumber = accNumber;
		this.accountType = accountType;
		this.routingNo = routingNo;
		this.coApplicant = coApplicant;
		this.balance = balance;
	}

	public CustomerResponseDTO(String userName, int accNumber, String accountType, double balance) {
		super();
		this.userName = userName;
		this.accNumber = accNumber;
		this.accountType = accountType;
		this.balance = balance;
	}

	public CustomerResponseDTO(String userName, Integer customerId, String emailId, String phoneNumber) {
		super();
		this.userName = userName;
		this.customerId = customerId;
		this.emailId = emailId;
		this.phoneNumber = phoneNumber;
	}

}
