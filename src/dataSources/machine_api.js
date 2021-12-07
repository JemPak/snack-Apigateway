const { RESTDataSource } = require('apollo-datasource-rest');

const serverConfig = require('../server');

class MachineAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = serverConfig.dataview_api_url;
  }

  async createMachine(machine) {
    machine = new Object(JSON.parse(JSON.stringify(machine)));
    return await this.post(`/create/machine/`, machine);
  }

  async getMachineById(userId) {
    try {
      return await this.get(`/machine/${userId}`);
    } catch (error) {
      return null;
    }
  }

  async getMachinesByCity(city) {
    try {
      return await this.get(`/machine/bycity/${city}`);
    } catch (error) {
      return null;
    }
  }

  async getAllMachines() {
    return await this.get("/machine/");
  }

  async getMachinesByUser(userId) {
    return await this.get(`/machine/user/${userId}`);
  }

  async AllActiveMachines() {
    return await this.get(`/machine/allactive`);
  }

  async updateMachine(machineId, machine) {
    machine = new Object(JSON.parse(JSON.stringify(machine)));
    return await this.put(`/machine/${machineId}`, machine);
  }
}

module.exports = MachineAPI;