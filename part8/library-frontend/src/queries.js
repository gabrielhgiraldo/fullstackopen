import { gql } from '@apollo/client'

export const ALL_DATA = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
    allBooks {
      title
      published
      author
      id
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
      id
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!){
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ){
      name
      born
      id
    }
  }
`