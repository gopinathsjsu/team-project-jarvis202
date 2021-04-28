import axios from 'axios';

const apiUrl = 'http://localhost:8080/';

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

  getRecepientsByCustId(customerId) {
    return axios.get(apiUrl + 'getRecepientsByCustId/' + customerId);
  }

  getAllCustomers() {
    return axios.get(apiUrl + 'getAllCustomers');
  }
}

export default new ServiceAPI();