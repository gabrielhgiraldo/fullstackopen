import { useQuery } from '@apollo/client'
import React from 'react'
import { ME } from '../queries'
import BookTable from './BookTable'

const FavoriteBooks = ({ books }) => {
  const result = useQuery(ME)
  if (result.loading) {
    return <div>loading...</div>
  }
  const genre = result.data.me.favoriteGenre
  return (
    <>
      <h2>recommendations</h2>
      books in your favorite genre {genre}
      <BookTable books={books.filter(book => book.genres.includes(genre))}></BookTable>
    </>
  )
}

export default FavoriteBooks