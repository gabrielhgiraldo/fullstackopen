import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS_GENRE, ME } from '../queries'
import BookTable from './BookTable'

const FavoriteBooks = () => {
  const { data: userData, loading } = useQuery(ME)
  const genre = userData?.me?.favoriteGenre
  const { data: bookData, loading: loading2 } = useQuery(ALL_BOOKS_GENRE, {
    variables: { genre },
    skip: !userData
  })
  if (loading || loading2) {
    return <div>Loading...</div>
  }
  return (
    <>
      <h2>recommendations</h2>
      books in your favorite genre {genre}
      <BookTable books={bookData.allBooks}></BookTable>
    </>
  )
}

export default FavoriteBooks