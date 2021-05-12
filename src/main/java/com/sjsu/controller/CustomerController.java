package com.sjsu.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sjsu.dto.CustomerDTO;
import com.sjsu.dto.CustomerResponseDTO;
import com.sjsu.dto.TransactionsDTO;
import com.sjsu.entity.Customer;
import com.sjsu.services.CustomerService;

@RestController
@CrossOrigin("*")
public class CustomerController {

	@Autowired
	private CustomerService customerService;

	/*
	 * Post API - To Add a new Customer
	 */
	@PostMapping(path = "add/customer")
	public Customer addMember(@RequestBody Customer customer) {
		if (customer.getCustomerId() == null) {
			customer.setCustomerId(customerService.getLastCustId() + 1);
		}
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

	@GetMapping("/getCustomerIdByAccountNum/{accountNum}")
	public List<Customer> getCustomerIdByAccountNum(@PathVariable Integer accountNum) {
		return customerService.getCustomerIdByAccountNum(accountNum);
	}

	/*
	 * Input - Customer user name Output - userName , accNumber, accountType,
	 * balance
	 */
	@GetMapping("/showCustomerDetails/{userName}")
	public List<CustomerResponseDTO> showCustomerDetailsOnLogin(@PathVariable String userName) {
		return customerService.showCustomerDetailsOnLogin(userName);
	}

	// Adding an account to existing customer
	public List<Customer> addAccounts(@RequestBody Customer customer) {
		return null;

	}

	@GetMapping("/getCustContactDetails/{userName}")
	public List<CustomerResponseDTO> getCustContactDetailsByUname(@PathVariable String userName) {
		return customerService.getCustContactDetails(userName);
	}

	// TODO
	@GetMapping("/getDetailsByUserName/{uname}")
	public Customer findByUserNameIs(@PathVariable String uname) {
		Customer customer = customerService.findByUserNameIs(uname);
		return customer;
	}

	@GetMapping("/getTransByAccount/{accountNum}")
	public List<TransactionsDTO> getTransByAccount(@PathVariable Integer accountNum) {
		List<TransactionsDTO> trans = customerService.getTransByAccount(accountNum);
		return trans;
	}

}
