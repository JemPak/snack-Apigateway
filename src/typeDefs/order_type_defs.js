const { gql } = require("apollo-server");

const orderTypeDefs = gql `
  input order{
    userEmail: String!
    products: [String!]
    dateCreate: String
    balanceOrder: Int!
    idMachine: Int!
  }
  
  type orderDetails{
    id: String!
    userEmail: String!
    products: [String!]
    dateCreate: String!
    balanceOrder: Int!
    idMachine: Int!
  }

  type Query {
    getOrderById(orderId: String!): orderDetails
    getOrdersByEmail(email: String!): [orderDetails]
    getOrdersByMachine(machineId: Int!): [orderDetails]
  }

  type Mutation {
    createOrder(order: order!): String!
  }
`;

module.exports = orderTypeDefs;