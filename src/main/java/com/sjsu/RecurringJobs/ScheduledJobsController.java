package com.sjsu.RecurringJobs;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@CrossOrigin("*")
public class ScheduledJobsController {
  
  @Autowired
  private ScheduledJobsService scheduledJobsService;

  @GetMapping("/getJobsForTransDate/{transDate}")
  public List<ScheduledJobs> getJobsForTransDate(@PathVariable String transDate) throws ParseException {

    return scheduledJobsService.getScheduledTodayJob(transDate);

  }

  @GetMapping("/getJobsOfCustomer/{custId}")
  public List<ScheduledJobs> getJobsOfCustomer(@PathVariable Integer custId) throws ParseException {
    return scheduledJobsService.getJobsOfCustomer(custId);

  }
  
  @PostMapping(path = "/updateNextTrans")
  public String setRecurringPayment(@RequestBody ScheduledJobs scheduledJob) throws ParseException {
    return scheduledJobsService.setRecurringPayment(scheduledJob);
  }
  // @PostMapping("/updateNextTrans")
}
