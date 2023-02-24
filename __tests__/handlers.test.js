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

describe('handlers routes', () => {
  it('creates a books item', async () => {
    let response = await request.post('/api/handlers/books').send({
      name: 'testbooks',
      category:'fiction',
      author: 'smith',
    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('testbooks');
  });

  it('gets all books items', async () => {
    let response = await request.get('/api/handlers/books');
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('testbooks');
  },
  );

  it('updates a books item', async () => {
    let response = await request.put('/api/handlers/books/1').send({
      name: 'testbooks',
      category:'fiction',
      author: 'smith',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('testbooks');
  },
  );


});