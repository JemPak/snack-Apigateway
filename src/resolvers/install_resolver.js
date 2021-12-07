const installResolver = {
  Query: {
    getInstallationById: async (_, { installId }, { dataSources }) => {
      return await dataSources.installAPI.getInstallationById(installId);
    },
    getInstallUnaccepted: async (_, {}, { dataSources, userIdToken }) => {
      // validate if Query is create by Admin
      if ((await dataSources.authAPI.getUser(userIdToken)).is_admin)
        return await dataSources.installAPI.getInstallationUnaccepted();
      else return null;
    },
    getInstallByUser: async (
      _,
      { email, accepted },
      { dataSources, userIdToken }) => {
      if (email == (await dataSources.authAPI.getUser(userIdToken)).email) {
        return await dataSources.installAPI.getInstallationByUser(
          userIdToken,
          accepted
        );
      } else return null;
    }
  },
  Mutation: {
    createInstallation: async (
      _,
      { installation },
      { dataSources, userIdToken }
    ) => {
      if (installation.email == (await dataSources.authAPI.getUser(userIdToken)).email) {
        installation.user_id = userIdToken;
        delete installation.email;
        return await dataSources.installAPI.createInstallation(installation);
      } else return null;
    },
    updateIntallation: async (
      _,
      { installId, installation },
      { dataSources, userIdToken }
      ) => {
      if (installation.email == (await dataSources.authAPI.getUser(userIdToken)).email) {
        installation.user_id = userIdToken;
        delete installation.email;
        return await dataSources.installAPI.updateInstallation(installId,installation);
      } else return null;
    },
    deleteInstallation: async (_, { installId }, { dataSources, userIdToken }) => {
      // comprobar que la instalacion a borrar sea del mismo usuario del token
      if (userIdToken == (await dataSources.installAPI.getInstallationById(installId)).user_id){
        if ( installId == (await dataSources.installAPI.getInstallationById(installId)).installation_id){
          return await dataSources.installAPI.deleteInstallation(installId);
        }
        else{
          return null;
        }
      }
      return null;
    }
  }
};

module.exports = installResolver;
