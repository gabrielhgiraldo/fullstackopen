import { gql } from '@apollo/client'

export const ALL_DATA = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
    allBooks {
      title
      published
      author
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ){
      title
      author
      published
      genres
    }
  }
`