import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTE':
      const anecdoteIndex = state.findIndex(anecdote => anecdote.id === action.data.id)
      state =  [
        ...state.slice(0, anecdoteIndex),
        { ...state[anecdoteIndex], votes: state[anecdoteIndex].votes + 1 },
        ...state.slice(anecdoteIndex + 1)
      ]
      break
    case 'NEW_ANECDOTE':
      state = [...state, action.data]
      break
    case 'INITIALIZE':
      state = action.data
      break
    default:
  }
  return state.sort((a, b) => b.votes - a.votes)
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    await anecdoteService.update(updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data: { id: anecdote.id }
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes
    })
  }
}

export default anecdoteReducer