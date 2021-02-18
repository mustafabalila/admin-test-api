const _ = require('lodash');
const httpStatus = require('http-status');
const OrderService = require('./service');

exports.create = async (req, res) => {
  const service = new OrderService();
  const fields = _.pick(req.body, ['itemName', 'categoryId']);
  const data = await service.create(fields);
  if (data.message) {
    return res.status(httpStatus.BAD_REQUEST).json(data);
  }
  return res.status(httpStatus.CREATED).json(data);
};

exports.find = async (req, res) => {
  const service = new OrderService();
  const data = await service.findMany();
  return res.status(httpStatus.OK).json(data);
};
