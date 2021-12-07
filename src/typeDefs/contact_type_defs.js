const { gql } = require("apollo-server");

const contactTypeDefs = gql `
  type contactDetails{
    contact_id: Int!
    user_id: Int!
    assesory: Int!
    comment: String!
    is_active: Boolean!
    response: String
    date_create: String!
    date_response: String
  }
    
  input contact {
    email: String!
    assesory: Int!
    comment: String!
  }
  
  input contactUpdate{
    email: String!
    assesory: Int
    comment: String
    is_active: Boolean
    response: String
    date_response: String      
  }

  type Query {
    getContactById(userEmail: String!): contactDetails
    getAllContactActive: [contactDetails]
    getContactsByUser(userEmail: String!,active: String!): [contactDetails]
  }

  type Mutation {
    createContact(contact: contact!): contactDetails
    updateContact(contactId: Int!,contact: contactUpdate!): contactDetails
    deleteContact(contactId: Int!): String
  }
`;

module.exports = contactTypeDefs;