package com.sjsu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomerResponseDTO {
	
	private String userName;
	private String firstName;
	private int accNumber;
	private String accounttType;
	
}
