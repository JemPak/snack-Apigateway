const { gql } = require('apollo-server');

const authTypeDefs = gql `
  type Tokens {
    refresh: String!
    access: String!
  }

  type Access {
    access: String!
  }

  input CredentialsInput {
    email: String!
    password: String!
  }

  input SignUpInput {
    email: String!
    password: String!
    name: String!
    nit: Int!
    city: String!
    ages: Int!
    phone: Int!
  }

  type UserDetail {
    id_client: Int!
    name: String!
    email: String!
    nit: Int!
    is_admin: Boolean!
  }

  extend type Mutation {
    signUpUser(userInput: SignUpInput): Tokens!
    logIn(credentials: CredentialsInput!): Tokens!
    refreshToken(refresh: String!): Access!
  }

  extend type Query {
    userDetailById(userId: Int!): UserDetail
  }
`;

module.exports = authTypeDefs;