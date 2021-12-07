const { RESTDataSource } = require('apollo-datasource-rest');

const serverConfig = require("../server");

class ProductAPI extends RESTDataSource{

  constructor() {
    super();
    this.baseURL = serverConfig.dataview_api_url;
  }

  async createProduct(product){
    product = new Object(JSON.parse(JSON.stringify(product)));
    return await this.post(`/product/`, product);
  }

  async getProductById(productId){
    try{
      return await this.get(`/product/${productId}`);
    }catch (error) {
      return null
    }
  }

  async getAllProducts(){
    return await this.get(`/product/`);
  }

  async updateProduct(productId, product){
    product = new Object(JSON.parse(JSON.stringify(product)));
    return await this.put(`/product/${productId}`, product);
  }

  async deleteProduct(productId){
    await this.delete(`/product/${productId}`)
    return "Borrado Exitoso!"; 
  }

}

module.exports = ProductAPI;