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

const update = async blog => {
  const config = {
    headers: { Authorization: token }
  }

  const { id, user } = blog
  const { id: userId } = user
 
  const response = await axios
    .put(`${BASE_URL}/${id}`, {
      ...blog,
      user: userId
    }, config)

  return response.data
}

const remove = id => {
  const config = {
    headers: { Authorization: token }
  }

  return axios.delete(`${BASE_URL}/${id}`, config)
}

export default {
  setToken,
  getAll,
  create,
  update,
  delete: remove
}
