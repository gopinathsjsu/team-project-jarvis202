package com.sjsu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sjsu.dto.CustomerResponseDTO;
import com.sjsu.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

	@Query("SELECT new com.sjsu.dto.CustomerResponseDTO(c.userName, c.firstName , a.accNumber, a.accountType) FROM Customer c JOIN c.account a")
	public List<CustomerResponseDTO> getJoinInformation();

	@Query("SELECT new com.sjsu.dto.CustomerResponseDTO(c.userName, a.accNumber, a.accountType, a.routingNumber,a.coApplicant, a.balance) FROM Customer c JOIN c.account a where c.userName=?1")
	public List<CustomerResponseDTO> getJoinInformation(String userName);

	@Query("SELECT new com.sjsu.dto.CustomerResponseDTO(c.userName, a.accNumber, a.accountType,a.balance) FROM Customer c JOIN c.account a where c.userName=?1")
	public List<CustomerResponseDTO> showCustomerDetailsOnLogin(String userName);

}
