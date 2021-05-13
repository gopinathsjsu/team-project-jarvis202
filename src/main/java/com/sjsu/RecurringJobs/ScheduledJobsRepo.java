package com.sjsu.RecurringJobs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.*;

import com.sjsu.RecurringJobs.ScheduledJobs;

public interface ScheduledJobsRepo extends JpaRepository<ScheduledJobs, Integer> {
  
  // @Query("SELECT new com.sjsu.RecurringJobs.ScheduledJobsDTO(jobId, description, amount, toAccount, transactionType, nextTransactionDate, fromAccount, transDate, customerId) FROM ScheduledJobs where nextTransactionDate=?1")
  @Query("SELECT a from ScheduledJobs a where a.nextTransactionDate = :nextTransDate")
  public List<ScheduledJobs> getScheduledTodayJob(Date nextTransDate);

  @Query("SELECT a from ScheduledJobs a where a.customerId = :custId")
  public List<ScheduledJobs> getJobsOfCustomer(Integer custId);


}




