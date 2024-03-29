import axios from 'axios'

const BASE_URL = 'http://localhost:3001/anecdotes'

const instance = axios.create({
  baseURL: BASE_URL
})

export const getAll = async () => {
  const { data } = await instance.get()
  return data
}

export const create = async (content, votes = 0) => {
  const { data } = await instance.post('', { content, votes })
  return data
}

export const update = async ({ id, content, votes }) => {
  const { data } = await instance.put(`/${id}`, { content, votes })
  return data
}

const anecdoteService = { getAll, create, update }

export default anecdoteService
