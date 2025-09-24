import axios from 'axios';

const client = axios.create({
  baseURL: 'http://192.168.43.128:3000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'your_api_key_here',
  },
});

export default client;
