package com.sjsu.services;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjsu.entity.Recepient;
import com.sjsu.repository.RecepientRepository;

@Service
public class RecepientService {

  @Autowired
  private RecepientRepository recepientRepository;

  public String addRecepient(Recepient recepient) {
    String message = "Recepient Added successfully";
    try {
      recepient = recepientRepository.save(recepient);
    } catch (Exception e) {
      message = "Recepient already exists. Please check once !";
    }
    return message;
  }

  public Recepient getRecepientById(int id) {
    return recepientRepository.getOne(id);
  }
}
