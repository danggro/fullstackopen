const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('./models/Book')
const User = require('./models/User')
const Author = require('./models/Author')

const resolvers = {
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
  Query: {
    bookCount: async () => {
      const books = await Book.find({})
      return books.length
    },
    authorCount: async () => {
      const authors = await Author.find({})
      return authors.length
    },
    allBook: async (root, args) => {
      const books = await Book.find({}).populate('author')
      let authorId
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        authorId = author._id.toString()
      }
      if (args.author && args.genre)
        return books.filter(
          (book) =>
            book.author.toString() === authorId &&
            book.genres.includes(args.genre)
        )
      if (args.author) {
        return books.filter((book) => book.author.toString() === authorId)
      }
      if (args.genre)
        return books.filter((book) => book.genres.includes(args.genre))
      return books
    },

    allAuthor: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id })
      return books.length
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      let book
      let author
      if (!currentUser) {
        throw new GraphQLError('no authorizaiton', {
          extensions: { code: 'NO_AUTHORIZATION' },
        })
      }
      try {
        let newAuthor
        author = await Author.findOne({ name: args.author })
        if (!author) {
          newAuthor = new Author({ name: args.author })
          await newAuthor.save()
        }
        author = author ? author : newAuthor
        book = new Book({ ...args, author: author.id })

        await book.save()
      } catch (error) {
        const { errors } = error
        const key = Object.keys(errors)[0]
        if (errors[key].kind === 'unique') {
          throw new GraphQLError('title must be unique', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error,
            },
          })
        }
        if (errors[key].kind === 'minlength') {
          const keyName = key === 'title' ? 'title' : 'author'
          throw new GraphQLError(`${keyName} too short`, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          })
        }
      }

      const bookAdded = await Book.findOne({ title: book.title }).populate(
        'author'
      )

      pubsub.publish('BOOK_ADDED', { bookAdded })

      return bookAdded
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('no authorizaiton', {
          extensions: { code: 'NO_AUTHORIZATION' },
        })
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      return author.save()
    },
    createUser: async (root, args) => {
      const newUser = new User({ ...args })
      try {
        await newUser.save()
      } catch (error) {
        throw new GraphQLError('username not available', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      }
      return newUser
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || user.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }
      const userForToken = { username: user.username, id: user._id }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

module.exports = resolvers
