package com.sjsu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sjsu.entity.Recepient;
import com.sjsu.services.RecepientService;

@RestController
public class RecepientController {

  @Autowired
  private RecepientService recepientService;

  @PostMapping(path = "addRecepient")
  public Recepient addRecepient(@RequestBody Recepient recepient) {
    recepient = recepientService.addRecepient(recepient);
    return recepient;
  }

  @GetMapping("getRecepient/{id}")
  public Recepient getRecepientById(@PathVariable int id) {
    Recepient recepient = recepientService.getRecepientById(id);
    return recepient;
  }
}
