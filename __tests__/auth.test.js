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

describe('Auth router', () => {
  it('creates a user', async () => {
    let response = await request.post('/signup').send({
      username: 'testAdmin',
      password: 'pass123',
      role: 'admin',
    });
    //changed it to 201 from 200
    expect(response.status).toEqual(201);
    expect(response.body.user.username).toEqual('testAdmin');

  });

  it('logs in a user', async () => {
    let response = await request.post('/signin').auth('testAdmin', 'pass123');
    expect(response.status).toEqual(200);
    expect(response.body.user.username).toEqual('testAdmin');

  });

  it('fails to log in a user with the wrong password', async () => {
    let response = await request.post('/signin').auth('testAdmin', 'wrong');
    expect(response.status).toEqual(403);
  },
  );

  it('fails to log in a user with the wrong username', async () => {
    let response = await request.post('/signin').auth('nobody', 'wrong');
    expect(response.status).toEqual(403);
  },
  );

  it('fails to log in a user with no basic header', async () => {
    let response = await request.post('/signin');
    expect(response.status).toEqual(403);
  },
  );

  it('fails to log in a user with no basic header', async () => {
    let response = await request.post('/signin');
    expect(response.status).toEqual(403);
  },
  );

});