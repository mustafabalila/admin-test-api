const _ = require('lodash');
const httpStatus = require('http-status');
const UserService = require('./service');

exports.signup = async (req, res) => {
  const service = new UserService();
  const fields = _.pick(req.body, ['name', 'email', 'password']);
  const authData = await service.create(fields);
  if (authData.message) {
    return res.status(httpStatus.BAD_REQUEST).json(authData);
  }
  return res.status(httpStatus.CREATED).json(authData);
};

exports.login = async (req, res) => {
  const service = new UserService();
  const fields = _.pick(req.body, ['email', 'password']);
  const authData = await service.authenticate(fields);
  if (authData.message) {
    return res.status(httpStatus.UNAUTHORIZED).json(authData);
  }
  return res.status(httpStatus.OK).json(authData);
};

exports.promote = async (req, res) => {
  const service = new UserService();
  const fields = _.pick(req.body, ['userId']);
  const data = await service.promote(fields.userId);
  if (data.message) {
    return res.status(httpStatus.BAD_REQUEST).json(data);
  }
  return res.status(httpStatus.OK).json(data);
};
