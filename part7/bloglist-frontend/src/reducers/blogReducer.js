import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INITIALIZE':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    default:
      return state
  }
}

export const createBlog = (newBlog, userToken) => {
  return async (dispatch) => {
    const createdBlog = await blogService.createBlog(newBlog, userToken)

    dispatch({
      type: 'NEW_BLOG',
      data: createdBlog
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: blogs
    })
  }
}

export default blogReducer