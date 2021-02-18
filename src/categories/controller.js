const _ = require('lodash');
const httpStatus = require('http-status');
const CategoryService = require('./service');

exports.create = async (req, res) => {
  const service = new CategoryService();
  const fields = _.pick(req.body, ['name']);
  const data = await service.create(fields);
  if (data.message) {
    return res.status(httpStatus.BAD_REQUEST).json(data);
  }
  return res.status(httpStatus.CREATED).json(data);
};

exports.find = async (req, res) => {
  const service = new CategoryService();
  const data = await service.findMany();
  return res.status(httpStatus.OK).json(data);
};

exports.search = async (req, res) => {
  const { search } = req.query;
  const service = new CategoryService();
  const data = await service.search(search);
  return res.status(httpStatus.OK).json(data);
};
