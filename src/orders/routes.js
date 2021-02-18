const express = require('express');
const passport = require('passport');
const validate = require('../common/validate');
const { isAdmin } = require('../common/auth-middleware');
const orderValidation = require('./validations');
const orderController = require('./controller');

const router = express.Router();

router
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), isAdmin, validate(orderValidation.create), orderController.create)
  .get(passport.authenticate('jwt', { session: false }), isAdmin, orderController.find);

module.exports = router;
