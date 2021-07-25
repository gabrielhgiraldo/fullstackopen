import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_DATA, EDIT_AUTHOR } from '../queries'

const Authors = ({ show, authors }) => {
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_DATA } ]
  })

  const submit = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo: parseInt(born) }})
    setName('')
    setBorn('')
  }

  if (!show) {
    return null
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name} 
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)
          }/>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
