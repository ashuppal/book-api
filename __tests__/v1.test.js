'use strict';

//changed it to sevral from app
const { server } = require('../src/auth/server');
const supertest = require('supertest');
const { db } = require('../src/auth/models');
const request = supertest(server);

beforeAll(async () => {
 
  await db.sync();
 
});

afterAll(async () => {
  await db.drop();
});

describe('v1 routes', () => {
  it('creates a books item', async () => {
    let response = await request.post('/api/v1/books').send({
      name: 'testbooks',
      calories: 100,
      type: 'protein',
    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('testbooks');
  });

  it('gets all books items', async () => {
    let response = await request.get('/api/v1/books');
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('testbooks');
  },
  );

  it('updates a books item', async () => {
    let response = await request.put('/api/v1/books/1').send({
      name: 'testbooks',
      calories: 100,
      type: 'protein',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('testbooks');
  },
  );


});