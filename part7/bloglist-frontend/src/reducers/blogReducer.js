import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INITIALIZE':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG': {
      const blog = action.data
      const blogIndex = state.findIndex(currentBlog => currentBlog.id === blog.id)
      return [
        ...state.slice(0, blogIndex),
        blog,
        ...state.slice(blogIndex + 1)
      ]
    }
    case 'DELETE_BLOG':{
      const blog = action.data
      const blogIndex = state.findIndex(currentBlog => currentBlog.id === blog.id)
      return [
        ...state.slice(0, blogIndex),
        ...state.slice(blogIndex + 1)
      ]
    }
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

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const blogUpdate = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      user: blog.user ? blog.user.id : undefined,
      likes: blog.likes + 1
    }
    const updatedBlog = await blogService.updateBlog(blog.id, blogUpdate)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (blog, userToken) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog.id, userToken)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog
    })
  }
}

export default blogReducer