'use strict';

const { app } = require('../src/server');
const superTest = require('supertest');
const request = superTest(app);

describe('validator', () => {
  let errorResponse = {
    status: 500,
    message: 'Invalid request body',
  };
  let obj;
  it('should get 500 status error on invalid body content', async () => {
    obj = {
      name: 'knafa',
    };
    const response = await request.post('/api/v1/food').send(obj);
    expect(response.status).toBe(500);
    expect(response.body).toEqual(errorResponse);
  });
});
