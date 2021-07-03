
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

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

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: asObject(content)
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INITIALIZE',
    data: anecdotes
  }
}

export default anecdoteReducer