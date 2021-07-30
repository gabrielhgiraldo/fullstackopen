import React, { useState } from 'react'

const Books = ({ show, books }) => {
  const genres = [...new Set(books.map(book => book.genres).flat())]
  const [selectedGenre, setGenre] = useState(genres[0])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      in genre <b>{selectedGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.filter(book => book.genres.includes(selectedGenre)).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(genre => 
        <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
      )}
    </div>
  )
}

export default Books