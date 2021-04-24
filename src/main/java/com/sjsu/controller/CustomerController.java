package com.sjsu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sjsu.dto.CustomerDTO;
import com.sjsu.dto.CustomerResponseDTO;
import com.sjsu.entity.Customer;
import com.sjsu.services.CustomerService;

@RestController
public class CustomerController {
	@Autowired
	private CustomerService customerService;

	@PostMapping(path = "add/customer")
	public Customer addMember(@RequestBody Customer customer) {
		customer = customerService.addCustomerDetails(customer);
		return customer;
	}

	@GetMapping("/getCustomer/{id}")
	public Customer getCustomerById(@PathVariable int id) {
		Customer customerRes = customerService.getCustomerById(id);
		System.out.println("customer details is " + customerRes);
		return customerRes;
	}

	@GetMapping("/getAllCustomers")
	public List<Customer> getAllCustomers() {
		return customerService.getAllCustomers();
	}

	@GetMapping("/getJoinData")
	public List<CustomerResponseDTO> getJoinData() {
		return customerService.getJoinData();
	}

	/*
	 * Input - User name
	 * Output - All account details of input user name
	 */
	@GetMapping("/getJoinData/{userName}")
	public List<CustomerResponseDTO> getJoinData(@PathVariable String userName) {
		return customerService.getJoinData(userName);
	}

	/*
	 * Input - Customer user name 
	 * Output - userName , accNumber, accountType, balance
	 */
	@GetMapping("/showCustomerDetails/{userName}")
	public List<CustomerResponseDTO> showCustomerDetailsOnLogin(@PathVariable String userName) {
		return customerService.showCustomerDetailsOnLogin(userName);
	}
}
