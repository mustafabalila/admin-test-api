const mongoose = require('mongoose');
const faker = require('faker');
const Order = require('../../src/orders/model');
const { categoryOne, insertCategories } = require('./categories.fixture');

const orderOne = {
  _id: mongoose.Types.ObjectId(),
  itemName: faker.name.title(),
  categoryId: categoryOne._id,
};

const orderTwo = {
  _id: mongoose.Types.ObjectId(),
  itemName: faker.name.title(),
  categoryId: categoryOne._id,
};

const insertOrders = async (orders) => {
  await insertCategories([categoryOne]);
  await Order.insertMany(orders);
};

module.exports = {
  orderOne,
  orderTwo,
  insertOrders,
};
