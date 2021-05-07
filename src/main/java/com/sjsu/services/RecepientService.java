package com.sjsu.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

import com.sjsu.dto.RecepientDTO;
import com.sjsu.entity.Recepient;
import com.sjsu.entity.Customer;
import com.sjsu.repository.CustomerRepository;
import com.sjsu.repository.RecepientRepository;

@Service
public class RecepientService {

  @Autowired
  private RecepientRepository recepientRepository;

  @Autowired
  private CustomerRepository customerRepository;

  public String addRecepient(Recepient recepient) {
    String message = "Recepient Added successfully";
    try {
      recepient = recepientRepository.save(recepient);
    } catch (Exception e) {
      // message = "Recepient already exists. Please check once !";
      message = e.getLocalizedMessage();
    }
    return message;
  }

  public Recepient getRecepientById(int id) {
    return recepientRepository.getOne(id);
  }

  public List<RecepientDTO> getRecepientsByCustId(String userName) {
    List<Customer> c = customerRepository.findByUserName(userName);
    return recepientRepository.getRecepientsByCustAccountId(c.get(0).getCustomerId());
  }
}
