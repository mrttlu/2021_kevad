/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

const { expect } = require('chai');
const { usersService } = require('../api/services');

let users;

const existingUser = {
  id: 1,
  firstName: 'Martti',
  lastName: 'Raavel',
  email: 'mrt@mrt.ee',
};

describe('Users service', function () {
  describe('GetUsers', function () {
    it('should return array of users', async function () {
      users = await usersService.getUsers();
      expect(users).to.be.a('array');
    });
    it('should contain at least 1 user', async function () {
      expect(users.length).to.be.gt(1);
    });
  });
  describe('GetUser by ID', function () {
    it('should return user object with keys', async function () {
      const user = await usersService.getUserById(existingUser.id);
      expect(user).to.be.a('object');
      expect(user).to.have.keys(['id', 'firstName', 'lastName', 'email', 'role']);
    });
  });
  describe('GetUser by email', function () {
    it('should return user object with keys', async function () {
      const user = await usersService.getUserByEmail(existingUser.email);
      expect(user).to.be.a('object');
      expect(user).to.have.keys(['id', 'email', 'role', 'password']);
    });
  });
});
