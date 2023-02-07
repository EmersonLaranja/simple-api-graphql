import { ApolloServer, gql } from "apollo-server"; //the Apollo helps to create the server with graphql
import { randomUUID } from "node:crypto"; //to generate a random id
//defining what operations are available
/**
 * Under fetching
 * HTTP Route returning missing data
 *
 * Over fetching
 * HTTP Route returning more data than needed
 **/

/**
 * Schema first approach
 **/
const typeDefs = gql`
  type User {
    id: String!
    name: String!
  }

  type Query {
    users: [User!]!
  }
  type Mutation {
    createUser(name: String!): User!
  }
`;

interface User {
  id: string;
  name: string;
}

const users: User[] = [];

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      users: () => {
        return users;
      },
    },

    Mutation: {
      createUser: (_, args) => {
        const user = { id: randomUUID(), name: args.name };
        users.push(user);
        return user;
      },
    },
  }, //similar to the controllers
});

server.listen().then(({ url }) => {
  console.log(`HTTP Server running on ${url}`);
});
