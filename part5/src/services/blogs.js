import axios from 'axios'
const BASE_URL = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => axios.get(BASE_URL)
  .then(response => response.data)

const create = async blog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios
    .post(BASE_URL, blog, config)

  return response.data
}

export default {
  setToken,
  getAll,
  create
}
