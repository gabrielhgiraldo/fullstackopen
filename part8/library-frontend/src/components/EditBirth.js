import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { EDIT_AUTHOR } from '../queries'

const EditBirth = ({ authors }) => {
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  const submit = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo: parseInt(born) }})
    setBorn('')
  }

  return (
    <>
      <h3>set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({target}) => setName(target.value)}>
            {authors.map(author => 
              <option value={author.name}>{author.name}</option>
            )}
          </select>
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
    </>
  )
}

export default EditBirth