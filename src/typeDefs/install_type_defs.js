const { gql} = require('apollo-server');

const installTypeDefs = gql`
  input install{
    email: String!
    address: String!
    city: String!
    machine_type: Int!
  }
  
  type installDetails{
    installation_id: Int!
    user_id: Int!
    address: String!
    city: String!
    machine_type: Int!
    accepted: Boolean!
    response: String
    date_create: String!
    date_response: String
  }
  
  input installUpdate{
    email: String!
    accepted: Boolean
    response: String
    date_response: String
  }

  extend type Query {
    getInstallationById(email: String!): installDetails
    getInstallUnaccepted: [installDetails] 
    getInstallByUser(email: String!,accepted: String!): [installDetails] 
  }
  
  type Mutation {
    createInstallation(installation: install!): installDetails!
    updateIntallation(installId: Int!,installation: installUpdate!): installDetails
    deleteInstallation(installId: Int!): String
  }

`;
module.exports = installTypeDefs;