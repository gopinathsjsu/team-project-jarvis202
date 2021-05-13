package com.sjsu.RecurringJobs;

import com.sjsu.RecurringJobs.ScheduledJobsDTO;
import com.sjsu.dto.CustomerResponseDTO;
import com.sjsu.entity.Account;
import com.sjsu.entity.Customer;
import com.sjsu.entity.Transactions;
import com.sjsu.enums.TransactionType;
import com.sjsu.repository.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ScheduledJobsService {
  @Autowired
  private ScheduledJobsRepo scheduledJobsRepo;

  @Autowired
  private CustomerRepository customerRepository;

  @Autowired
  private ScheduledJobsService jobsService;


  // @Scheduled(cron = "0/15 * * * * *")
  public void addTransaction() throws ParseException {
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    LocalDateTime now = LocalDateTime.now();
    String nextTransDate = dtf.format(now).toString().substring(0,10);
  
    List<ScheduledJobs> jobs = jobsService.getScheduledTodayJob(nextTransDate);
     Calendar calendar = Calendar.getInstance();
      SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
      Date t = calendar.getTime();
    try {
      if (jobs.size() > 0) {
        
        for (ScheduledJobs sj : jobs) {
         
          calendar.add(Calendar.MONTH, 1);
         
          String date1 = format1.format(calendar.getTime());
          Date d = format1.parse(date1);
          java.sql.Date sqlDate = new java.sql.Date(d.getTime());
          sj.setNextTransactionDate(sqlDate);
          scheduledJobsRepo.save(sj);

          String userName = customerRepository.getCustIdByAccount(sj.getFromAccount()).get(0).getUserName();
          // Customer c = customerRepository.findById(sj.getCustomerId()).get();
          Customer c = customerRepository.findByUserName(userName).get((0));
          System.out.println(c);
          if (c != null) {
            Transactions tr = new Transactions();
            tr.setAmount(sj.getAmount());
            tr.setDescription(sj.getDescription());
            tr.setFromAccount(sj.getFromAccount());
            tr.setToAccount(sj.getToAccount());
            tr.setTransactionType(sj.getTransactionType());
            tr.setTransactionDate(t);
            tr.setTransactionId(1);
            Set<Transactions> tSet = c.getTransactions();
            System.out.println("Customer trans c \n" + tSet);
            c.getTransactions().add(tr);

            Set<Account> a = c.getAccount();
            Set<Account> updatedAcc = new HashSet<>();
            for (Account acc : a) {
              if (acc.getAccNumber() == sj.getFromAccount() && acc.getBalance() >= sj.getAmount()) {
                acc.setBalance(acc.getBalance() - sj.getAmount());
              }
              updatedAcc.add(acc);
            }
            c.setAccount(updatedAcc);
            customerRepository.save(c);
            System.out.println("from Account updated");
          }
          // update To Account , if the account belongs to the same bank 
          String uName = customerRepository.getCustIdByAccount(sj.getToAccount()).get(0).getUserName();
          // Customer c = customerRepository.findById(sj.getCustomerId()).get();
          Customer c1 = customerRepository.findByUserName(uName).get((0));
          System.out.println(c1);
          if (c1 != null) {
            Transactions tr = new Transactions();
            tr.setAmount(sj.getAmount());
            tr.setDescription(sj.getDescription());
            tr.setFromAccount(sj.getFromAccount());
            tr.setToAccount(sj.getToAccount());
            tr.setTransactionType(TransactionType.CREDIT);
            tr.setTransactionDate(t);
            tr.setTransactionId(1);
            Set<Transactions> tSet = c1.getTransactions();
            System.out.println("Customer trans c \n" + tSet);
            c1.getTransactions().add(tr);

            Set<Account> a = c1.getAccount();
            Set<Account> updatedAcc = new HashSet<>();
            for (Account acc : a) {
              if (acc.getAccNumber() == sj.getFromAccount() && acc.getBalance() >= sj.getAmount()) {
                acc.setBalance(acc.getBalance() - sj.getAmount());
              }
              updatedAcc.add(acc);
            }
            c1.setAccount(updatedAcc);
            customerRepository.save(c1);
            System.out.println("to Account updated");
          }
        
          
          System.out.println("job executed");
        }
      }
    } catch (RuntimeException e) {
      System.out.println(e.getLocalizedMessage());
      //TODO: handle exception
    }

    System.out.println("Transaction created");

  }

  public List<ScheduledJobs> getScheduledTodayJob(String nextTransDate) throws ParseException {
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
    java.util.Date transactionDate = format.parse(nextTransDate);
    return scheduledJobsRepo.getScheduledTodayJob(transactionDate);
  }

  public String setRecurringPayment(ScheduledJobs scheduledJob) throws ParseException {
    try {
      if (scheduledJob != null) {
        SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
        Date d = format1.parse(scheduledJob.getTransDate().toString());
        java.sql.Date sqlDate = new java.sql.Date(d.getTime());
        scheduledJob.setNextTransactionDate(sqlDate);
      }
      scheduledJobsRepo.save(scheduledJob);
    } catch (Exception e) {
      return "Unable to setup recurring payment";
    }
    return "Recurring payment setup successfully";
  }

  public List<ScheduledJobs> getJobsOfCustomer(Integer custId) {
    return scheduledJobsRepo.getJobsOfCustomer(custId);
  }

}
