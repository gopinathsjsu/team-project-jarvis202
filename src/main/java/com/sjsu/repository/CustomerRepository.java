package com.sjsu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sjsu.dto.CustomerResponseDTO;
import com.sjsu.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer >{
	
	 @Query("SELECT new com.sjsu.dto.CustomerResponseDTO(c.userName, c.firstName , a.accNumber, a.accountType) FROM Customer c JOIN c.account a")
	    public List<CustomerResponseDTO> getJoinInformation();

}
