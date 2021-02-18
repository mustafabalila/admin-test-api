const httpStatus = require('http-status');

const isAdmin = (req, res, next) => {
  const { user } = req;
  if (user.role === 'admin') {
    return next();
  }
  return res.status(httpStatus.UNAUTHORIZED).send('Only admins');
};

module.exports = { isAdmin };
