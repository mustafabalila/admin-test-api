const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { categoryOne, categoryTwo, insertCategories } = require('../fixtures/categories.fixture');
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

describe('Categories routes', () => {
  describe('GET /api/v1/categories/seartch', () => {
    test('should return 200 for the categories search', async () => {
      await insertCategories([categoryOne, categoryTwo]);

      const res = await request(app)
        .get(`/api/v1/categories/search?search=${categoryOne.name}`)
        .set('Authorization', `Bearer ${await adminAccessToken()}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toEqual({
        id: categoryOne._id.toHexString(),
        name: categoryOne.name,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });
  });
});
