const orderResolver = {
  Query: {
    getOrderById: async (_, { orderId }, { dataSources, userIdToken }) => {
      if ((await dataSources.authAPI.getUser(userIdToken)).is_admin) {
        return await dataSources.orderAPI.getOrderById(orderId);
      }
      else return null;
    },
    getOrdersByEmail: async (_, { email }, { dataSources, userIdToken }) => {
      if (email == (await dataSources.authAPI.getUser(userIdToken)).email)
        return await dataSources.orderAPI.getOrdersByEmail(email);
      else return null;
    },
    getOrdersByMachine: async (_, { machineId }, { dataSources, userIdToken }) => {
        return await dataSources.orderAPI.getOrdersByMachine(machineId);
    }
  },
  Mutation: {
    createOrder: async (_, { order }, { dataSources, userIdToken }) => {
      //if (order.userEmail == (await dataSources.authAPI.getUser(userIdToken)).email)
      if ((await dataSources.authAPI.getUser(userIdToken)).is_auth)
        return await dataSources.orderAPI.createOrder(order);
      else return null;
    }
  }
};

module.exports = orderResolver;
