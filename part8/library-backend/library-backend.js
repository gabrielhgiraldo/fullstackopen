const { ApolloServer, gql } = require('apollo-server')
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
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      // let returnedBooks = await Book.find({})
      // if (args.author) {
      //   returnedBooks = returnedBooks.filter(book => book.author === args.author)
      // }
      // if (args.genre) {
      //   returnedBooks = returnedBooks.filter(book => book.genres.includes(args.genre))
      // }
      return Book.find({}).populate('author', { 'name': 1, 'born': 1 })
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    // bookCount: (root) => books.filter(book => book.author === root.name).length
  },
  Mutation: {
    addBook: async (root, args) => {
      // add author to database if author doesn't exist
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }

      const book = new Book({ ...args })
      return book.save()
    },
    editAuthor: async (root, args) => {
      return await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo })
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
