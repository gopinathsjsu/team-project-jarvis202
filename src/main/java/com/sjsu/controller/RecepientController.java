package com.sjsu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sjsu.entity.Recepient;
import com.sjsu.services.RecepientService;

@RestController
@CrossOrigin("*")
public class RecepientController {

  @Autowired
  private RecepientService recepientService;

  @PostMapping(path = "addRecepient")
  public String addRecepient(@RequestBody Recepient recepient) {
    String res = recepientService.addRecepient(recepient);
    return res;
  }

  @GetMapping("getRecepient/{id}")
  public Recepient getRecepientById(@PathVariable int id) {
    Recepient recepient = recepientService.getRecepientById(id);
    return recepient;
  }
}
