package com.sjsu.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name ="customer")
public class Customer {

	@Id
	@GeneratedValue
	@Column(name = "customerId")
	private Integer customerId;

	@Column(name = "userName")
	private String userName;

	@Column(name = "firstName", nullable=false)
	private String firstName;

	@Column(name = "lastName")
	private String lastName;

	@Column(name = "middleName")
	private String middleName;

	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(name = "dob")
	private Date dateOfBirth;

	
	@Column(name = "address" , nullable=false)
	private String fullAddress;

	@Column(name = "cityName", nullable=false)
	private String city;

	@Column(name = "state", nullable=false)
	private String state;

	@Column(name = "country", nullable=false)
	private String country;

	@Column(name = "zip", nullable=false)
	private String zipcode;

	@Column(name = "phoneNo", nullable=false)
	private String phoneNumber;

	@Column(name = "emailId", nullable=false)
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

	public Customer() {
	}

	public Customer(String userName, String firstName, String lastName, String middleName, Date dateOfBirth,
			String fullAddress, String city, String state, String country, String zipcode, String phoneNumber,
			String emailId, String occupation, String sourceOfIncome, String citizenshipStatus, String sSN,
			String countryOfResidence) {
		super();
		this.userName = userName;
		this.firstName = firstName;
		this.lastName = lastName;
		this.middleName = middleName;
		this.dateOfBirth = dateOfBirth;
		this.fullAddress = fullAddress;
		this.city = city;
		this.state = state;
		this.country = country;
		this.zipcode = zipcode;
		this.phoneNumber = phoneNumber;
		this.emailId = emailId;
		this.occupation = occupation;
		this.sourceOfIncome = sourceOfIncome;
		this.citizenshipStatus = citizenshipStatus;
		this.sSN = sSN;
		this.countryOfResidence = countryOfResidence;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getFullAddress() {
		return fullAddress;
	}

	public void setFullAddress(String fullAddress) {
		this.fullAddress = fullAddress;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getZipcode() {
		return zipcode;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	public String getSourceOfIncome() {
		return sourceOfIncome;
	}

	public void setSourceOfIncome(String sourceOfIncome) {
		this.sourceOfIncome = sourceOfIncome;
	}

	public String getCitizenshipStatus() {
		return citizenshipStatus;
	}

	public void setCitizenshipStatus(String citizenshipStatus) {
		this.citizenshipStatus = citizenshipStatus;
	}

	public String getsSN() {
		return sSN;
	}

	public void setsSN(String sSN) {
		this.sSN = sSN;
	}

	public String getCountryOfResidence() {
		return countryOfResidence;
	}

	public void setCountryOfResidence(String countryOfResidence) {
		this.countryOfResidence = countryOfResidence;
	}

	@Override
	public String toString() {
		return "Customer [userName=" + userName + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", middleName=" + middleName + ", dateOfBirth=" + dateOfBirth + ", fullAddress=" + fullAddress
				+ ", city=" + city + ", state=" + state + ", country=" + country + ", zipcode=" + zipcode
				+ ", phoneNumber=" + phoneNumber + ", emailId=" + emailId + ", occupation=" + occupation
				+ ", sourceOfIncome=" + sourceOfIncome + ", citizenshipStatus=" + citizenshipStatus + ", sSN=" + sSN
				+ ", countryOfResidence=" + countryOfResidence + "]";
	}

}
