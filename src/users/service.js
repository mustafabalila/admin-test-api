const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('./model');
const Serivce = require('../utils/base-service');

class UserService extends Serivce {
  constructor() {
    super(User);
  }

  async create(fields) {
    const isEmailTaken = await User.isEmailTaken(fields.email);
    if (isEmailTaken) {
      return { message: 'Email address is already in use' };
    }
    return super.create(fields);
  }

  async promote(userId) {
    const user = await this.findOne({ _id: userId });
    if (!user) {
      return { message: 'User does not exsist' };
    }
    return super.updateOne({ _id: userId }, { role: 'admin' });
  }

  async authenticate({ email, password }) {
    try {
      const user = await this.findOne({ email });
      if (!user) {
        return { message: 'Incorrect email or password' };
      }
      const isPasswordMatch = user.isPasswordMatch(password);
      if (!isPasswordMatch) {
        return { message: 'Incorrect email or password' };
      }

      const token = jwt.sign({ id: user.id, role: user.role }, config.jwt.secret, {
        expiresIn: config.jwt.accessExpirationHours,
      });
      return { user, token };
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = UserService;
