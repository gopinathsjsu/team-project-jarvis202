package com.sjsu.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.sjsu.enums.AccountStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "Account")

public class Account {
	
	@Id
	private int accNumber;
	
	@Column(name = "coApplicant")
	private String coApplicant;
	
	@Column(name = "accountType", nullable = false)
	private String accountType;
	
	@Column(name = "routingNo", nullable = false)
	private int routingNumber;
	
	@Column(name="accountStatus")
	@Enumerated(EnumType.STRING)
	private AccountStatus accountStatus;
	//account.setAccountStatus(AccountStatus.ACTIVE);
	
	private double balance;
	
	
	
	
}
