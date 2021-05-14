package com.sjsu.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjsu.dto.CustomerResponseDTO;
import com.sjsu.dto.TransactionsDTO;
import com.sjsu.entity.Customer;
import com.sjsu.repository.CustomerRepository;
import com.sjsu.entity.Transactions;

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
		return customerRepository.showCustomerDetailsOnLogin(userName);
	}

	public List<Customer> findByCustomerUserName(String userName) {
		return customerRepository.findByUserName(userName);
	}

	public List<CustomerResponseDTO> getCustContactDetails(String userName) {
		return customerRepository.getCustomerContactDetails(userName);
	}

	public List<Customer> getCustomerIdByAccountNum(Integer accountNum) {
		List<CustomerResponseDTO> custDto = customerRepository.getCustIdByAccount(accountNum);
		List<Customer> custDetails = customerRepository.findByUserName(custDto.get(0).getUserName());
		return custDetails;
	}

	public Customer findByUserNameIs(String userName) {
		return customerRepository.findByUserName(userName).get(0);
	}

	public List<TransactionsDTO> getTransByAccount(Integer accountNum) {
		List<TransactionsDTO> trans = customerRepository.getTransByAccountId(accountNum);
		return trans;
	}

	public Integer getLastCustId(){
		return customerRepository.getLastCustomerId().getCustomerId();
	}
}
