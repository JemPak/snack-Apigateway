const MachineResolver = {
  Query: {
    getMachineById: async (_, { machineId }, { dataSources }) => {
      return await dataSources.machineAPI.getMachineById(machineId);
    },
    getMachinesActive: async (_, {}, { dataSources, userIdToken }) => {
      if ((await dataSources.authAPI.getUser(userIdToken)).is_admin) {
        return await dataSources.machineAPI.getMachinesActive();
      } else return null;
    },
    getMachinesByUser: async (_, { userId }, { dataSources, userIdToken }) => {
      if (userId == userIdToken)
        return await dataSources.machineAPI.getMachinesByUser(userId);
      else return null;
    },
    getMachinesByCity: async (_, { city }, { dataSources, userIdToken }) => {
      if ((await dataSources.authAPI.getUser(userIdToken)).is_admin) {
        return await dataSources.machineAPI.getMachinesByCity(city);
      } else return null;
    },
  },
  Mutation: {
    createMachine: async (_, { machine }, { dataSources, userIdToken }) => {
      if ((await dataSources.authAPI.getUser(userIdToken)).is_admin) {
        return await dataSources.machineAPI.createMachine(machine);
      } else return null;
    },
    updateMachine: async (_, { machineId, machine }, { dataSources, userIdToken }) => {
      if ((await dataSources.authAPI.getUser(userIdToken)).is_admin) {
        return await dataSources.machineAPI.updateMachine(machineId, machine);
      } else return null;
    }
  }
};

module.exports = MachineResolver;