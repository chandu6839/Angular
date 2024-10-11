const { gql } = require('apollo-server-express');

//Define schema
const typeDefs = gql`
    type User {
        id : ID!,
        name : String!,
        email : String!
    }
    type Query {
        users : [User]
    }

    type Mutation {
        addUser(name: String!, email: String!): User
    }
    `;

    //Define resolvers
    const resolvers = {
        Query: {
            users: () => [
                { id: '1', name:'chandu1', email: "ag.cha@gmail.com"},
                { id: '2', name:'chandu2', email: "ag.cha@gmail.com"}
            ]
        },
        Mutation: {
            addUser: (_,{name,email}) => {
                const newUser = { id: Math.random().toString(), name, email}
                return newUser;
            }
        }
    }

    module.exports = { typeDefs, resolvers };