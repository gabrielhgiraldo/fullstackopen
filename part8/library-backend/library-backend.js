const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const { MONGODB_URI } = require('./config')

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
  type Author {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int
  }

  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    id: ID!,
    genres: [String!]!
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!,
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook (
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!
    ): Book,
    editAuthor (
      name: String!,
      setBornTo: Int!
    ): Author
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
        return Book.find({ genres: args.genre }).populate('author', { name: 1, born: 1 })
      }
      return Book.find({}).populate('author', { name: 1, born: 1 })
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount:  (root) => Book.countDocuments({ "author": root._id })
  },
  Mutation: {
    addBook: async (root, args) => {
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

      const book = new Book({ ...args })
      try {
        await book.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return book
    },
    editAuthor: (root, args) => {
      return Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo })
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
