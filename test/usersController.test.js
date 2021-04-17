/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

const adminUser = {
  email: 'mrt@mrt.ee',
  password: 'mrt',
};

const newUser = {
  firstName: 'Tiina',
  lastName: 'Tina',
  email: 'tiina2@tiina.ee',
  password: 'tina',
};

let newUserId;
let adminToken;

describe('Users controller', function () {
  describe('GET /users', function () {
    it('responds with error message in json and statusCode 403', async function () {
      const response = await request(app).get('/users');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(403);
      expect(response.body.error).to.equal('No authorization header');
    });
  });
  describe('POST /users', function () {
    it('responds with error message in json and statusCode 400 because of missing data', async function () {
      const response = await request(app).post('/users');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body.error).to.equal('Required data is missing.');
    });
    it('responds with id of created user', async function () {
      const response = await request(app).post('/users').send(newUser);
      newUserId = response.body.id;
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body.id).to.be.a('number');
    });
    it('responds with error', async function () {
      const response = await request(app).post('/users').send(adminUser);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
    });
  });
  describe('POST /users/login', function () {
    it('responds with token', async function () {
      const response = await request(app).post('/users/login').send(adminUser);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.token).to.be.a('string');
      adminToken = response.body.token;
    });
  });
  describe('DELETE /users', function () {
    it('responds with id of created user', async function () {
      const response = await request(app).delete(`/users/${newUserId}`).set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).to.equal(204);
    });
  });
});
