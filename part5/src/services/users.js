import axios from 'axios'
const BASE_URL = '/api/users'

export const getAll = () => axios.get(BASE_URL)
  .then(response => response.data)

const usersService = { getAll }

export default usersService
