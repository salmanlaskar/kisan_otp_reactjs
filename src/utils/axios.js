import axios from 'axios';
import {Base64} from 'js-base64';
const instance = axios.create({
  baseURL: 'https://grej.skillstepacademy.com:9000/api',
  timeout: 60000,
  headers: {
    Authorization:
      'Basic ' + Base64.encode('salmanlaskar@123456:123456@salmanlaskar'),
  },
});
export default instance;
