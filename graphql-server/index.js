const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers } = require('./schema')

async function startServer() {
    const app = express();
    const server = new ApolloServer({typeDefs, resolvers});
    await server.start();
    server.applyMiddleware({ app })

    app.get('/', (req,res) => {
        res.send('welcome')
    })

    app.listen({port: 4000}, ()=>{
        console.log(`server is ready at http://localhost:4000${server.graphqlPath}`)
    })
}
startServer();