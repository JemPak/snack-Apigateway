const { RESTDataSource } = require("apollo-datasource-rest");

const serverConfig = require("../server");

class InstallAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = serverConfig.gestion_api_url;
  }

  async createInstallation(installation) {
    installation = new Object(JSON.parse(JSON.stringify(installation)));
    return await this.post(`/installation/`, installation);
  }

  async getInstallationById(installId) {
    try {
      return await this.get(`/installation/${installId}`);
    } catch (error) {
      return null;
    }
  }

  async getInstallationUnaccepted() {
    return await this.get(`/installation/unaccepted`);
  }

  async getInstallationByUser(userId, accepted) {
    return await this.get(`/installation/user/${userId}/${accepted}`);
  }

  async updateInstallation(installId, installation) {
    installation = new Object(JSON.parse(JSON.stringify(installation)));
    return await this.put(`/installation/${installId}`, installation);
  }

  async deleteInstallation(installId) {
    await this.delete(`/installation/${installId}`);
    return "Borrado Exitoso!";
  }
}

module.exports = InstallAPI;