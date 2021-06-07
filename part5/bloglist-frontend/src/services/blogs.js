import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (blog, token) => {
  const response = await axios.post(baseUrl, blog,
    { headers: { Authorization: `bearer ${token}` } }
  )
  return response.data
}

const updateBlog = async (blogId, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, updatedBlog)
  return response.data
}

export default { getAll, createBlog, updateBlog }