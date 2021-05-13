package com.sjsu.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
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

  @Column(name = "isSameBank")
  private boolean isSameBank;

  @Column(name ="company_name")
  private String companyName;
}
