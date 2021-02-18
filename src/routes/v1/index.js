const express = require('express');
const usersRoute = require('../../users/routes');
const categoriesRoute = require('../../categories/routes');
const ordersRoute = require('../../orders/routes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: usersRoute,
  },
  {
    path: '/categories',
    route: categoriesRoute,
  },
  {
    path: '/orders',
    route: ordersRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
