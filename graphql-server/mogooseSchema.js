const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const User = require("./userModel");

// Define User type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLString },
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return User.findById(args._id);
      },
    },
    deleteUser: {
      type: UserType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return User.findByIdAndDelete(args._id);
      },
    },
  },
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(parent, args) {
        // Ensure unique email
        return User.findOne({ email: args.email }).then((existingUser) => {
          if (existingUser) {
            throw new Error("Email already in use.");
          }
          const user = new User({
            name: args.name,
            email: args.email,
          });

          return user.save();
        });
      },
    },
    updateUser: {
      type: UserType,
      args: {
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      updateUser: (_, { _id, name, email }) => {
        const user = find(users, { id: _id });
        if (!user) {
          throw new Error(`Couldn’t find user with id ${_id}`);
        }
        user.name = name;
        user.email = email;
        return user;
      },
    },
  },
});

// Create and export schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
