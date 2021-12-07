const { gql } = require('apollo-server');

const accountTypeDefs = gql `
    input CredentialsAccount{
        id_client: Int!
        city: String!
        ages: Int!
        phone: Int!
    }
    
    input AccountUpdateFields{
        email: String!
        city: String!
        ages: Int!
        phone: Int!
    }
    
    input AccountUpdateBalance{
        email: String!
        balance: Int!
    }

    type AccountDetails {
        id_account: Int!
        id_client: Int!
        city: String!
        ages: Int!
        phone: Int!
        balance: Int!
        register_date: String!
    }

    type Query {
        accountByUserId(userEmail: String!): AccountDetails
    }

    type Mutation {
      accountUpdateFields(user: AccountUpdateFields!): AccountDetails
      accountUpdateBalance(user: AccountUpdateBalance!): AccountDetails
      createAccount(account: CredentialsAccount!): AccountDetails!
    }
`;

module.exports = accountTypeDefs;