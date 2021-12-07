const accountResolver = {
  Query: {
    accountByUserId: async (_, { userEmail }, { dataSources, userIdToken }) => {
      if (userEmail == (await dataSources.authAPI.getUser(userIdToken)).email)
        return await dataSources.accountAPI.accountByUserId(userIdToken);
      else return null;
    },
  },
  Mutation: {
    accountUpdateFields: async (_, { user}, { dataSources, userIdToken}) =>{
      if (user.email == (await dataSources.authAPI.getUser(userIdToken)).email) {
        user.id_client = userIdToken;
        delete user.email;
        console.log("salto aqui");
        return await dataSources.accountAPI.accountUpdate("fields", user);
      } else return null;
    },
    accountUpdateBalance: async (_, { user}, { dataSources, userIdToken}) =>{
      if (user.email == (await dataSources.authAPI.getUser(userIdToken)).email) {
        user.id_client = userIdToken;
        delete user.email;
        return await dataSources.accountAPI.accountUpdate("balance", user);
      } else return null;
    },

  },
};

module.exports = accountResolver;
