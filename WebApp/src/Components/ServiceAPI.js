import axios from 'axios';

const apiUrl = 'http://localhost:8080/';

class ServiceAPI {
  addRecepient(recepient) {
    return axios.post(apiUrl + 'addRecepient', recepient);
  }
}

export default new ServiceAPI();