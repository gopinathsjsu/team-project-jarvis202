package com.sjsu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sjsu.dto.RecepientDTO;
import com.sjsu.entity.Recepient;
import com.sjsu.services.RecepientService;
import java.util.*;

@RestController
@CrossOrigin("*")
public class RecepientController {

  @Autowired
  private RecepientService recepientService;

  @PostMapping(path = "addRecepient")
  public String addRecepient(@RequestBody Recepient recepient) {
    if (recepient.getRoutingNumber() == 0 && recepient.getCompanyName() == null){
      recepient.setSameBank(true);
    }
    String res = recepientService.addRecepient(recepient);
    return res;
  }

  @GetMapping("getRecepient/{id}")
  public Recepient getRecepientById(@PathVariable int id) {
    Recepient recepient = recepientService.getRecepientById(id);
    return recepient;
  }

  @GetMapping("getRecepientsByCustId/{userName}")
  public List<RecepientDTO> getRecepientsByCustId(@PathVariable String userName) {
    List<RecepientDTO> rec = recepientService.getRecepientsByCustId(userName);
    return rec;
  }
}
