const typeDefs = `
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author{
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type User{
    username: String!
    favoriteGenre: String!
    id: ID!  
  }

  type Token{
    value: String!
  }

  type Subscription{
    bookAdded: Book!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBook(author: String, genre: String): [Book!]!
    allAuthor: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

`

module.exports = typeDefs
