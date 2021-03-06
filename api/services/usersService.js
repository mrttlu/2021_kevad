const bcrypt = require('bcrypt');
const database = require('../../database');
const jwtService = require('./jwtService');
const { saltRounds } = require('../../config');

const usersService = {};

// Returns list of users
usersService.getUsers = () => {
  const { users } = database;
  return users;
};

// Find user by id. Returns user if found or false.
usersService.getUserById = (id) => {
  const user = database.users.find((element) => element.id === id);
  if (user) {
    return user;
  }
  return false;
};

// Creates new user, returns id on new user
usersService.createUser = async (newUser) => {
  const id = database.users.length + 1;
  const hash = await bcrypt.hash(newUser.password, saltRounds);
  const user = {
    id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    password: hash,
    role: 'User',
  };
  database.users.push(user);
  return id;
};

// Deletes user
usersService.deleteUser = (id) => {
  // Find user index
  const index = database.users.findIndex((element) => element.id === id);
  // Remove user from 'database'
  database.users.splice(index, 1);
  return true;
};

// Updates user
usersService.updateUser = (user) => {
  const index = database.users.findIndex((element) => element.id === user.id);
  if (user.firstName) {
    database.users[index].firstName = user.firstName;
  }
  if (user.lastName) {
    database.users[index].lastName = user.lastName;
  }
  return true;
};

usersService.getUserByEmail = (email) => {
  const user = database.users.find((element) => element.email === email);
  if (user) return user;
  return false;
};

// User login
usersService.login = async (login) => {
  const { email, password } = login;
  const user = usersService.getUserByEmail(email);
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = await jwtService.sign(user);
      return token;
    }
  }
  return false;
};

module.exports = usersService;
