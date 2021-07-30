import React, { useState } from 'react'
import BookTable from './BookTable'

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
      <BookTable books={books.filter(book => book.genres.includes(selectedGenre))}/>
      {genres.map(genre => 
        <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
      )}
    </div>
  )
}

export default Books