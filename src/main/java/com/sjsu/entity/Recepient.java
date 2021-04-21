package com.sjsu.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "Recepient", uniqueConstraints = @UniqueConstraint(columnNames = { "AccountNum", "CustAccountID" }))
public class Recepient {

  @Id
  @GeneratedValue
  @Column(name = "RecepientID")
  private Integer recepientID;

  @Column(name = "CustAccountID", nullable = false)
  private Integer custAccountID;

  @Column(name = "FirstName")
  private String firstName;

  @Column(name = "LastName", nullable = false)
  private String lastName;

  @Column(name = "ZipCode", nullable = false)
  private Integer zipCode;

  @Column(name = "AccountNum", nullable = false, unique = true)
  private Integer accountNum;

  @Column(name = "NickName")
  private String nickName;

  @Column(name = "RoutingNumber", nullable = false)
  private Integer routingNumber;

  @Column(name = "IsSameBank", columnDefinition = "TINYINT", length = 1)
  private boolean isSameBank;

  public Recepient() {

  }

  public Recepient(Integer customerID, String firstName, String lastName, Integer zipCode, Integer accountNum,
      String nickName, Integer routingNumber, boolean isSameBank) {
    this.custAccountID = customerID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.zipCode = zipCode;
    this.accountNum = accountNum;
    this.nickName = nickName;
    this.routingNumber = routingNumber;
    this.isSameBank = isSameBank;
  }

  /**
   * @return Integer return the recepientID
   */
  public Integer getRecepientID() {
    return recepientID;
  }

  /**
   * @param recepientID the recepientID to set
   */
  public void setRecepientID(Integer recepientID) {
    this.recepientID = recepientID;
  }

  /**
   * @return Integer return the custAccountID
   */
  public Integer getCustAccountID() {
    return custAccountID;
  }

  /**
   * @param custAccountID the custAccountID to set
   */
  public void setCustAccountID(Integer custAccountID) {
    this.custAccountID = custAccountID;
  }

  /**
   * @return String return the firstName
   */
  public String getFirstName() {
    return firstName;
  }

  /**
   * @param firstName the firstName to set
   */
  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  /**
   * @return String return the lastName
   */
  public String getLastName() {
    return lastName;
  }

  /**
   * @param lastName the lastName to set
   */
  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  /**
   * @return Integer return the zipCode
   */
  public Integer getZipCode() {
    return zipCode;
  }

  /**
   * @param zipCode the zipCode to set
   */
  public void setZipCode(Integer zipCode) {
    this.zipCode = zipCode;
  }

  /**
   * @return Integer return the accountNum
   */
  public Integer getAccountNum() {
    return accountNum;
  }

  /**
   * @param accountNum the accountNum to set
   */
  public void setAccountNum(Integer accountNum) {
    this.accountNum = accountNum;
  }

  /**
   * @return String return the nickName
   */
  public String getNickName() {
    return nickName;
  }

  /**
   * @param nickName the nickName to set
   */
  public void setNickName(String nickName) {
    this.nickName = nickName;
  }

  /**
   * @return Integer return the routingNumber
   */
  public Integer getRoutingNumber() {
    return routingNumber;
  }

  /**
   * @param routingNumber the routingNumber to set
   */
  public void setRoutingNumber(Integer routingNumber) {
    this.routingNumber = routingNumber;
  }

  /**
   * @return boolean return the isSameBank
   */
  public boolean isIsSameBank() {
    return isSameBank;
  }

  /**
   * @param isSameBank the isSameBank to set
   */
  public void setIsSameBank(boolean isSameBank) {
    this.isSameBank = isSameBank;
  }

}
