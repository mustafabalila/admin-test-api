const Order = require('./model');
const Serivce = require('../utils/base-service');

class OrderService extends Serivce {
  constructor() {
    super(Order);
  }
}

module.exports = OrderService;
