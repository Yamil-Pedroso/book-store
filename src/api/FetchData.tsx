import axios from 'axios'
const baseURL = 'https://www.googleapis.com/books/v1'

const axiosInstance = axios.create({
  baseURL,
})

export default axiosInstance
