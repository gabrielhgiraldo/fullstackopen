
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { ALL_DATA, BOOK_ADDED } from './queries'
import FavoriteBooks from './components/FavoriteBooks'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [error, setError] = useState('')

  const result = useQuery(ALL_DATA)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(p => p.id).includes(object.id)  
    const dataInStore = client.readQuery({ query: ALL_DATA })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_DATA,
        data: {
          ...dataInStore,
          ALL_BOOKS: [...dataInStore.allBooks, addedBook]
        }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`new book ${addedBook.title} by ${addedBook.author.name}`)
      updateCacheWith(addedBook)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    const savedToken = localStorage.getItem('library-user-token')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [setToken])



  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && 
          <button onClick={() => setPage('login')}>login</button>
        }
        {token &&
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        }
      </div>

      <Authors
        show={page === 'authors'}
        authors={result.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        books={result.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
      />
      {page === 'recommend' &&
        <FavoriteBooks/>
      }

      {page === 'login' &&
        <>
          {error}
          <LoginForm setToken={setToken} setError={setError}/>
        </>
      }

    </div>
  )
}

export default App