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

const update = async (updatedAnecdote) => {
  const response = await axios.put(`${baseUrl}/anecdotes/${updatedAnecdote.id}`, updatedAnecdote)
  return response.data
}

const anecdoteService = { getAll, createNew, update }

export default anecdoteService