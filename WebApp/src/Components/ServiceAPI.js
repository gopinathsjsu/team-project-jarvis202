import axios from 'axios';

const apiUrl = 'http://cmpe202bankingapp-env.eba-26h39t2w.us-east-1.elasticbeanstalk.com/';
// const apiUrl = 'http://localhost:8080/';
class ServiceAPI {
  addCustomer(customer) {
    return axios.post(apiUrl + 'add/customer', customer);
  }

  addRecepient(recepient) {
    return axios.post(apiUrl + 'addRecepient', recepient);
  }

  sendOTP(phoneNum) {
    return axios.get(apiUrl + 'sendSMSMessage/' + phoneNum);
  }

  getCustomerDetailsByUserName(userName) {
    return axios.get(apiUrl + 'getCustomerByUserName/' + userName);
  }

  getCustContactDetails(userName) {
    return axios.get(apiUrl + 'getCustContactDetails/' + userName);
  }

  // TO:DO- implement the api in springboot
  addAccount(accDetails) {
    return axios.post(apiUrl + 'addAccount/', accDetails);
  }

  getRecepientsByCustId(custUserName) {
    return axios.get(apiUrl + 'getRecepientsByCustId/' + custUserName);
  }

  getAllCustomers() {
    return axios.get(apiUrl + 'getAllCustomers');
  }

  sendEmail(mailDetails) {
    return axios.post(apiUrl + 'api/v1/email', mailDetails);
  }

  subscribeCustomerByPhone(phoneNumber) {
    return axios.get(apiUrl + 'subscribeByPhone/' + phoneNumber);
  }

  getCustomerIdByAccountNum(accountNum) {
    return axios.get(apiUrl + 'getCustomerIdByAccountNum/' + accountNum);
  }

  getTansByAccountId(accountNum) {
    return axios.get(apiUrl + 'getTransByAccount/' + accountNum);
  }
}

export default new ServiceAPI();