import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://gutendex.com',
});

export default instance;