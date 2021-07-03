import axios from 'axios'

const baseUrl = 'http://localhost:3001'

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/anecdotes`)
  return response.data
}

const createNew = async (content) => {
  const anecdote = {content, votes: 0}
  const response = await axios.post(`${baseUrl}/anecdotes`, anecdote)
  return response.data
}

const anecdoteService = { getAll, createNew }

export default anecdoteService