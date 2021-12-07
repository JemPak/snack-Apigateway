const { RESTDataSource } = require("apollo-datasource-rest");

const serverConfig = require('../server');

class AccountAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = serverConfig.auth_api_url;
  }

  async createAccount(account) {
    account = new Object(JSON.parse(JSON.stringify(account)));
    return await this.post(`/account/`, account);
  }

  async accountByUserId(userId) {
    return await this.get(`/account/${userId}`);
  }

  async accountUpdate(type, account) {
    const accountCredentials = new Object(JSON.parse(JSON.stringify(account)));
    return await this.put(`/account/update/${type}`, accountCredentials);
  }
}

module.exports = AccountAPI;