package com.sjsu.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
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
@SequenceGenerator(name = "seq", initialValue = 22222, allocationSize = 100)
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
	private int accNumber;

	@Column(name = "coApplicant")
	private String coApplicant;

	@Column(name = "accountType", nullable = false)
	private String accountType;

	@Column(name = "routingNo", nullable = false)
	private int routingNumber = 9736527;

	@Column(name = "accountStatus")
	@Enumerated(EnumType.STRING)
	private AccountStatus accountStatus;
	// account.setAccountStatus(AccountStatus.ACTIVE);

	private double balance;

}
