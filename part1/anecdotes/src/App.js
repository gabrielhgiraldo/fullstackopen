import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [highestAnecdote, setHighestAnecdote] = useState(0)

  const getRandomAnecdote = () => {
    setSelected(Math.round(Math.random()*(anecdotes.length-1)))
  }

  const incrementVotes = () => {
    let votes_copy = [...votes]
    votes_copy[selected] += 1
    if (votes_copy[selected] > votes_copy[highestAnecdote]){
      setHighestAnecdote(selected)
    }
    setVotes(votes_copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <div>
        <button onClick={incrementVotes}>vote</button>
        <button onClick={getRandomAnecdote}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[highestAnecdote]}</div>
      <div>has {votes[highestAnecdote]} votes</div>
    </div>
  )
}

export default App