import axios from 'axios'
import fakeAuth from './fakeAuth'
// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {'Authorization': 'Bearer '+fakeAuth.getAccessToken()}
})

export default api
