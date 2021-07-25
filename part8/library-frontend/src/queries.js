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