import axios from 'axios'

const BASE_URL = 'http://localhost:3001/persons'

const getAll = () => axios.get(BASE_URL)
  .then(response => response.data)

const create = person => {
  return axios.post(BASE_URL, person)
    .then(response => response.data)
}

const remove = id => axios.delete(`${BASE_URL}/${id}`)

const personService = {
  getAll,
  create,
  delete: remove
}

export default personService