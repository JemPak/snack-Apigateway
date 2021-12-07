const { gql } = require("apollo-server");

const productsTypeDefs = gql `

  type productDetails{
    id_producto: Int!
 	  name: String!
    cantidad: Int!
    price: Int!
 	  description: String!
    url_image: String!
  }
  
  input product{
    name: String!
    cantidad: Int!
    price: Int!
    description: String!
    url_image: String!
  }
  
  input productUpdate{
    name: String
    cantidad: Int
    price: Int
    description: String
    url_image: String
  }

  type Query {
    getAllProducts: [productDetails]
    getProductById(productId: Int!): productDetails
  }

  type Mutation {
    createProduct(product: product!): productDetails!
    updateProduct(productId: Int!,product: productUpdate!): productDetails
    deleteProduct(productId: Int!): String
  }

`;

module.exports = productsTypeDefs;