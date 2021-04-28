package com.sjsu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sjsu.entity.Transactions;

public interface TransactionsRepository extends JpaRepository<Transactions, Integer >{

}