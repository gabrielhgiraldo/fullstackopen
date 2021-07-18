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

const deleteBlog = async (blogId, token) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`,
    { headers: { Authorization: `bearer ${token}` } }
  )
  return response.data
}

const addComment = async(blogId, comment, token) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, {
    content: comment
  },
  { headers: { Authorization: `bearer ${token}` } }
  )
  return response.data
}

export default { getAll, createBlog, updateBlog, deleteBlog, addComment }