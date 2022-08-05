import axios from 'axios'

const BASE_URL = 'http://localhost:3001/persons'

const getAll = () => axios.get(BASE_URL)
  .then(response => response.data)

const create = person => axios.post(BASE_URL, person)
  .then(response => response.data)

const update = person => axios.put(`${BASE_URL}/${person.id}`, person)
  .then(response => response.data)

const remove = id => axios.delete(`${BASE_URL}/${id}`)

const personService = {
  getAll,
  create,
  update,
  delete: remove
}

export default personService