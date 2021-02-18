const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { orderOne, orderTwo, insertOrders } = require('../fixtures/orders.fixture');
const { insertUsers, admin } = require('../fixtures/user.fixture');

setupTestDB();

async function adminAccessToken() {
  await insertUsers([admin]);
  const loginCredentials = {
    email: admin.email,
    password: admin.password,
  };
  const res = await request(app).post('/api/v1/users/login').send(loginCredentials);
  return res.body.token;
}

describe('Orders routes', () => {
  describe('GET /api/v1/orders', () => {
    test('should return 200 for order create with valid data', async () => {
      const orderData = { itemName: orderOne.itemName, categoryId: orderOne.categoryId };
      const res = await request(app)
        .post('/api/v1/orders')
        .set('Authorization', `Bearer ${await adminAccessToken()}`)
        .send(orderData)
        .expect(httpStatus.CREATED);
      expect(res.body).toEqual({
        id: expect.anything(),
        itemName: orderOne.itemName,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });

    test('should return 400 for order create with invalid categoryid', async () => {
      const orderData = { itemName: orderOne.itemName, categoryId: 'invalidObjId' };
      await request(app)
        .post('/api/v1/orders')
        .set('Authorization', `Bearer ${await adminAccessToken()}`)
        .send(orderData)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 for order create with invalid itemName', async () => {
      const orderData = { itemName: '', categoryId: 'invalidObjId' };
      await request(app)
        .post('/api/v1/orders')
        .set('Authorization', `Bearer ${await adminAccessToken()}`)
        .send(orderData)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
});
