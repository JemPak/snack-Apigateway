const { RESTDataSource } = require("apollo-datasource-rest");

const serverConfig = require("../server");

class ContactAPI extends RESTDataSource{
  
  constructor(){
    super();
    this.baseURL = serverConfig.gestion_api_url;
  }
  
  async createContact(contact){
    contact = new Object(JSON.parse(JSON.stringify(contact)));
    return await this.post(`/contact/`, contact);
  }
  
  async updateContact(contactId, contact){
    contact = new Object(JSON.parse(JSON.stringify(contact)));
    return await this.put(`/contact/${contactId}`, contact);
  }
  
  async deleteContact(contactId){
    // captura de error por si no existe contactId
    await this.delete(`/contact/${contactId}`);
    return "borrado exitoso!";      
  }
  
  async getContactById(contactId){
    try {
      return await this.get(`/contact/${contactId}`)
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getContactActive(){
    return await this.get(`/contact/active`)
  }

  async getContactByUser(userId, active){
    return await this.get(`/contact/user/${userId}/${active}`)
  }
}

module.exports = ContactAPI;