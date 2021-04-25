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

  getCustomerDetailsByUserName(username) {
    return axios.get(apiUrl + 'getCustomerByUserName/' + username);
  }
}

export default new ServiceAPI();