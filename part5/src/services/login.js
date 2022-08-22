import axios from 'axios'

const BASE_URL = '/api/login'

export const login = credentrials => axios.post(BASE_URL, credentrials)
  .then(response => response.data)
