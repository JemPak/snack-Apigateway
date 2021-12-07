const { RESTDataSource } = require("apollo-datasource-rest");

const serverConfig = require("../server");

class OrderAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = serverConfig.order_api_url;
  }

  async createOrder(order){
    order = new Object(JSON.parse(JSON.stringify(order)));
    return await this.post(`/orders`, order);
  }
  
  async getAllOrders(){
    return await this.get(`/orders`);
  }
  
  async updateOrder(order){
    order = new Object(JSON.parse(JSON.stringify(order)));
    return await this.put(`/orders`, order);
  }
  
  async deleteOrder(orderId){
    return await this.delete(`/order/${orderId}`);
  }
  
  async getOrdersByEmail(email){
    return await this.get(`/ordersEmail/${email}`);
  }

  async getOrderById(id){
    try{
      return await this.get(`/order/${id}`);
    }catch (error) {
      return null;
    }
  }
  
  async getOrdersByMachine(machineId){
    return await this.get(`/ordersMachine/${machineId}`);
  }

}

module.exports = OrderAPI;