const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server-express')
const express = require('express')
const { createServer } = require('http')
const { execute, subscribe } = require('graphql')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { PubSub } = require('graphql-subscriptions')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { MONGODB_URI, JWT_SECRET } = require('./config')

const pubsub = new PubSub()

mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true 
})
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connection to MongoDB:', error.message)
})

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook (
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor (
      name: String!
      setBornTo: Int!
    ): Author
    createUser (
      username: String!
      favoriteGenre: String!
    ): User
    login (
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments(),
    authorCount: () => Author.countDocuments(),
    allBooks: (root, args) => {
      // if (args.author) {
      //   returnedBooks = returnedBooks.filter(book => book.author === args.author)
      // }
      if (args.genre) {
        return Book.find({ genres: args.genre }).populate('author')
      }
      return Book.find({}).populate('author')
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Author: {
    bookCount:  (root) => Book.countDocuments({ "author": root._id })
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
      try {
        await user.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }
      return {
        value: jwt.sign(userForToken, JWT_SECRET)
      }
    },
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      // add author to database if author doesn't exist
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        }
        catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      }

      const book = new Book({ ...args, author: author._id })
      try {
        await book.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      const bookResponse = { ...book.toObject(), author, id: book._id }
      pubsub.publish('BOOK_ADDED', { bookAdded: bookResponse })
      return bookResponse
    },
    editAuthor: (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      return Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo })
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
};

(async function () {
  const app = express();

  const httpServer = createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7),
          JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    }
  })
  await server.start()
  server.applyMiddleware({ app })
  SubscriptionServer.create({
    schema,
    execute,
    subscribe
  }, {
    server: httpServer,
    path: server.graphqlPath
  })
  const PORT = 4000;
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}/graphql`)
  )
})()