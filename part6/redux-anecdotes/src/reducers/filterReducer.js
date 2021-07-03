const filterReducer = (state, action) => {
  if (action.type === 'FILTER'){
    return action.filter
  }
  return ''
}

export const setFilter = (filter) => {
  return {
    type: 'FILTER',
    filter
  }
}

export default filterReducer