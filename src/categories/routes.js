const express = require('express');
const passport = require('passport');
const validate = require('../common/validate');
const { isAdmin } = require('../common/auth-middleware');
const categoryValidation = require('./validations');
const categoryController = require('./controller');

const router = express.Router();

router
  .route('/')
  .post(
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    validate(categoryValidation.create),
    categoryController.create
  )
  .get(passport.authenticate('jwt', { session: false }), isAdmin, categoryController.find);

router.get('/search', passport.authenticate('jwt', { session: false }), isAdmin, categoryController.search);

module.exports = router;
