package com.sjsu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sjsu.dto.RecepientDTO;
import com.sjsu.entity.Recepient;
import java.util.*;

@Repository
public interface RecepientRepository extends JpaRepository<Recepient, Integer> {

  @Query("SELECT new com.sjsu.dto.RecepientDTO(r.custAccountID, r.recepientID, r.firstName, r.lastName, r.zipCode, r.accountNum, r.nickName, r.routingNumber, r.isSameBank, r.companyName) from Recepient r where r.custAccountID =?1")
  public ArrayList<RecepientDTO> getRecepientsByCustAccountId(int custAccountId);

}
