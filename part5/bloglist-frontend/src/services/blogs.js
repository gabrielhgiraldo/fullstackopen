import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (title, author, url, token) => {
  const response = await axios.post(baseUrl,
    { title, author, url },
    { headers: { Authorization: `bearer ${token}` } }
  )
  return response.data
}

export default { getAll, createBlog }