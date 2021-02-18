const Category = require('./model');
const Serivce = require('../utils/base-service');
const safeRegex = require('../utils/safe-regex');

class CategoryService extends Serivce {
  constructor() {
    super(Category);
  }

  async search(text) {
    const name = safeRegex(text);
    const categories = await Category.find({ name });
    return categories;
  }
}

module.exports = CategoryService;
