class Serivce {
  constructor(model) {
    this.model = model;
  }

  async create(fields) {
    try {
      const instance = await this.model.create(fields);
      return instance;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateOne(condition, fields) {
    try {
      const instance = await this.model.findOneAndUpdate(condition, fields, { new: true });
      return instance;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateMany(filter, fields) {
    try {
      const instances = await this.model.updateMany(filter, fields);
      const { nMatched, nModified } = instances;
      return { updated: true, nMatched, nModified };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(condition, fields = {}) {
    try {
      const instance = await this.model.findOne(condition, fields);
      return instance;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findMany(filter, fields = {}) {
    try {
      const instances = await this.model.find(filter, fields);
      return instances;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Serivce;
