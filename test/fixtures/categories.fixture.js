const mongoose = require('mongoose');
const faker = require('faker');
const Category = require('../../src/categories/model');

const categoryOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.title(),
};

const categoryTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.title(),
};

const insertCategories = async (categories) => {
  await Category.insertMany(categories);
};

module.exports = {
  categoryOne,
  categoryTwo,
  insertCategories,
};
