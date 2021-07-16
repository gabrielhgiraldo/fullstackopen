const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    default:
      return state
  }
}

const createBlog = (newBlog) => {
  const createdBlog = await blogService.createBlog(newBlog, user.token)

  return {

  }
}

export default blogReducer