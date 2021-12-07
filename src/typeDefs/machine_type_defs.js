const { gql } = require("apollo-server");

const machineTypeDefs = gql `
  input machine{
    user_id: Int!
    city: String!
    address: String!
    type_machine: Int!
  }

  type machineDetails{
    id_machine: Int!
    user_id: Int!
	  city: String!
	  address: String!
	  type_machine: Int!
	  is_activate: Boolean!
	  date_create: String!
	  balance_machine: Int!
  }
  
  input machineUpdate{
    user_id: Int!
    city: String
    address: String
    type_machine: Int
    is_activate: Boolean
    date_create: String
    balance_machine: Int
  }

  type Query {
    getMachineById(userId: Int!): machineDetails
    getMachinesActive: [machineDetails]
    getMachinesByUser(email: String!): [machineDetails]
    getMachinesByCity(city: String!): [machineDetails]
  }

  type Mutation {
    createMachine(machine: machine!): machineDetails!
    updateMachine(machineId: Int!,machine: machineUpdate!): machineDetails
  }
`;

module.exports = machineTypeDefs;