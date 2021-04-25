package com.sjsu.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjsu.dto.CustomerResponseDTO;
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

	public Optional<Customer> getCustomerDetailsById(int id) {
		// TODO Auto-generated method stub
		return customerRepository.findById(id);
	}

	public List<Customer> getAllCustomers() {
		// TODO Auto-generated method stub
		return customerRepository.findAll();
	}

	public List<CustomerResponseDTO> getJoinData() {
		// TODO Auto-generated method stub
		return customerRepository.getJoinInformation();
	}

	public List<CustomerResponseDTO> getJoinData(String userName) {
		// TODO Auto-generated method stub
		return customerRepository.getJoinInformation(userName);
	}

	public List<CustomerResponseDTO> showCustomerDetailsOnLogin(String userName) {
		// TODO Auto-generated method stub
		return  customerRepository.showCustomerDetailsOnLogin(userName);
	}

}
