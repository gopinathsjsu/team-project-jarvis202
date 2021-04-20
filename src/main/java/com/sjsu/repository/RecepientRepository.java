package com.sjsu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sjsu.entity.Recepient;

@Repository
public interface RecepientRepository extends JpaRepository<Recepient, Integer> {

}
