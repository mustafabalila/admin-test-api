const Joi = require('joi');
const { objectId } = require('../common/custom-validators');

const create = {
  body: Joi.object().keys({
    itemName: Joi.string().required(),
    categoryId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  create,
};
