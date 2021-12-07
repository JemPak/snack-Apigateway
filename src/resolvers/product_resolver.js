const productResolver = {
  Query: {
    getProductById: async (_, { productId }, { dataSources }) => {
      return await dataSources.productAPI.getProductById(productId);
    },
    getAllProducts: async (_, {}, { dataSources }) => {
      return await dataSources.productAPI.getAllProducts();
    },
  },
  Mutation: {
    createProduct: async (_, { product }, { dataSources, userIdToken }) => {
      if ((await dataSources.authAPI.getUser(userIdToken)).is_admin) {
        return await dataSources.productAPI.createProduct(product);
      } else return null;
    },
    updateProduct: async (_, { productId, product }, {dataSources, userIdToken}) => {
      if ((await dataSources.authAPI.getUser(userIdToken)).is_admin) {
        return await dataSources.productAPI.updateProduct(productId, product);
      } else return null;
    },
    deleteProduct: async (_, { productId }, { dataSources, userIdToken}) => {
      if ((await dataSources.authAPI.getUser(userIdToken)).is_admin) {
        return await dataSources.productAPI.deleteProduct(productId);
      } else return null;
    }
  },
};

module.exports = productResolver;