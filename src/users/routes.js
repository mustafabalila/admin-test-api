const express = require('express');
const passport = require('passport');
const validate = require('../common/validate');
const { isAdmin } = require('../common/auth-middleware');
const userValidation = require('./validations');
const userController = require('./controller');

const router = express.Router();

router.post('/register', validate(userValidation.register), userController.signup);
router.post('/login', validate(userValidation.login), userController.login);
router.post(
  '/promote',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  validate(userValidation.promote),
  userController.promote
);

module.exports = router;
