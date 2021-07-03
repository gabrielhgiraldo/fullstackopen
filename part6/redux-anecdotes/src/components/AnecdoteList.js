import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notifyMessage, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    const anecdote = anecdotes.find(anecdote => anecdote.id === id).content
    dispatch(notifyMessage(`you voted '${anecdote}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  return (
    <>
    {anecdotes.filter(anecdote => anecdote.content.includes(filter)).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList