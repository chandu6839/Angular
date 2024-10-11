const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { graphqlHTTP } = require("express-graphql");

//const { typeDefs, resolvers } = require("./schema");
const schema = require("./mogooseSchema");

require("./db");

async function startServer() {
  const app = express();
  //   const server = new ApolloServer({ typeDefs, resolvers });
  //   await server.start();
  //   server.applyMiddleware({ app });

  //   app.get("/", (req, res) => {
  //     res.send("welcome");
  //   });
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true, // Enable GraphiQL interface
    })
  );
  app.listen({ port: 4000 }, () => {
    console.log(
      //`server is ready at http://localhost:4000${server.graphqlPath}`
      `server is ready at http://localhost:4000/graphql`
    );
  });
}
startServer();
