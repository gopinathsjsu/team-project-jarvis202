package com.sjsu.controller;

import java.util.List;
import java.util.Optional;

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

	/*
	 * Post API - To Add a new Customer
	 */
	@PostMapping(path = "add/customer")
	public Customer addMember(@RequestBody Customer customer) {
		customer = customerService.addCustomerDetails(customer);
		return customer;
	}

	/*
	 * Get Customer Details by its Id
	 */
	@GetMapping("/getCustomerDetails/{id}")
	public Optional<Customer> getCustomerById(@PathVariable int id) {
		Optional<Customer> customer = customerService.getCustomerDetailsById(id);
		return customer;
	}

	@GetMapping("/getCustomerByUserName/{uname}")
	public List<Customer> getCustomerByUserName(@PathVariable String uname) {
		List<Customer> customer = customerService.findByCustomerUserName(uname);
		return customer;
	}

	/*
	 * Get list of all Customers
	 */
	@GetMapping("/getAllCustomers")
	public List<Customer> getAllCustomers() {
		return customerService.getAllCustomers();
	}

	@GetMapping("/getJoinData")
	public List<CustomerResponseDTO> getJoinData() {
		return customerService.getJoinData();
	}

	/*
	 * Input - User name Output - All account details of input user name
	 */
	@GetMapping("/getJoinData/{userName}")
	public List<CustomerResponseDTO> getJoinData(@PathVariable String userName) {
		return customerService.getJoinData(userName);
	}

	/*
	 * Input - Customer user name Output - userName , accNumber, accountType,
	 * balance
	 */
	@GetMapping("/showCustomerDetails/{userName}")
	public List<CustomerResponseDTO> showCustomerDetailsOnLogin(@PathVariable String userName) {
		return customerService.showCustomerDetailsOnLogin(userName);
	}

}
