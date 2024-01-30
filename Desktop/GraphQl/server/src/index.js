import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/typeDefs.js"
import { resolvers } from "./graphql/resolvers.js"
import startDbConnection from "./database/connectDb.js"
import { config } from "./config.js"

const port = process.env.PORT || 4000
startDbConnection()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // Extract the user from the Authorization header (JWT token)
        const token = req.headers.authorization || '';
        try {
          const user = jwt.verify(token, config.jwt_secret_key);
          return { user };
        } catch (error) {
          return {};
        }
      },
})

const { url } = await startStandaloneServer(server, { listen: port })
console.log(`Server is listening on port ${port}`)