import { gql } from '@apollo/client'

const DETAILS_BOOK = gql`
  fragment DetailsBook on Book {
    title
    author {
      name
      born
    }
    published
    genres
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthor {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBook {
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`
export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const FIND_BOOKS_BY_GENRE = gql`
  query findBooksByGenre($genre: String!) {
    allBook(genre: $genre) {
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`

export const CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...DetailsBook
    }
  }
  ${DETAILS_BOOK}
`
