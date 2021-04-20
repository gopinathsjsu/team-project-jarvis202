package com.sjsu.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjsu.entity.Recepient;
import com.sjsu.repository.RecepientRepository;

@Service
public class RecepientService {

  @Autowired
  private RecepientRepository recepientRepository;

  public Recepient addRecepient(Recepient recepient) {
    recepient = recepientRepository.save(recepient);
    return recepient;
  }

  public Recepient getRecepientById(int id) {
    return recepientRepository.getOne(id);
  }
}
