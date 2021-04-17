package com.sjsu.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjsu.entity.Customer;
import com.sjsu.repository.CustomerRepository;

@Service
public class CustomerService {
	
	@Autowired
	private CustomerRepository customerRepository;
	
	public Customer addCustomerDetails(Customer customer) {
		customer = customerRepository.save(customer);
		return customer;
	}

	public Customer getCustomerById(int id) {
		// TODO Auto-generated method stub
		return customerRepository.getOne(id);
	}

}
