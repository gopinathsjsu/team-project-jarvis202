package com.sjsu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
	
	@GetMapping("getCustomer/{id}")
	public Customer getCustomerById(@PathVariable int id) {
		Customer customer = customerService.getCustomerById(id);
		return customer;
		
	}
	

}
