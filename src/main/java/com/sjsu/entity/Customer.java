package com.sjsu.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "customer")
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "customerId")
public class Customer implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "customerId")
	private Integer customerId;

	@Column(name = "userName", unique = true)
	private String userName;

	@Column(name = "firstName", nullable = false)
	private String firstName;

	@Column(name = "lastName")
	private String lastName;

	@Column(name = "middleName")
	private String middleName;

	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(name = "dob")
	private Date dateOfBirth;

	@Column(name = "address", nullable = false)
	private String fullAddress;

	@Column(name = "cityName", nullable = false)
	private String city;

	@Column(name = "state", nullable = false)
	private String state;

	@Column(name = "country", nullable = false)
	private String country;

	@Column(name = "zip", nullable = false)
	private String zipcode;

	@Column(name = "phoneNo", nullable = false)
	private String phoneNumber;

	@Column(name = "emailId", nullable = false)
	private String emailId;

	@Column(name = "occupation")
	private String occupation;

	@Column(name = "sourceOfIncome")
	private String sourceOfIncome;

	@Column(name = "citizenshipStatus")
	private String citizenshipStatus;

	@Column(name = "ssn")
	private String sSN;

	@Column(name = "resident")
	private String countryOfResidence;

	@OneToMany(targetEntity = Account.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "customerID_FK", referencedColumnName = "customerId")
	private Set<Account> account;

	@OneToMany(targetEntity = Transactions.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "customerID_FK", referencedColumnName = "customerId")
	private Set<Transactions> transactions;
}
