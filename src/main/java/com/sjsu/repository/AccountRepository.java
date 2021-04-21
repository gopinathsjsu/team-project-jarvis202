package com.sjsu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sjsu.entity.Customer;

public interface AccountRepository extends JpaRepository<Customer, Integer >{

}
