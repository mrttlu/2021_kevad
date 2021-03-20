const jwtService = require('./jwtService');
const hashService = require('./hashService');
const db = require('../../db');

const usersService = {};

// Returns list of users
usersService.getUsers = async () => {
  const users = await db.query('SELECT id, firstName, lastName, email, role FROM users WHERE deleted = 0');
  return users;
};

// Find user by id. Returns user if found or false.
usersService.getUserById = async (id) => {
  const user = await db.query('SELECT id, firstName, lastName, email, role FROM users WHERE id = ? AND deleted = 0', [id]);
  if (!user[0]) return false;
  return user[0];
};

// Creates new user, returns id on new user
usersService.createUser = async (newUser) => {
  const existingUser = await usersService.getUserByEmail(newUser.email);
  if (existingUser) {
    return { error: 'User already exists' };
  }
  const hash = await hashService.hash(newUser.password);
  const user = {
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    password: hash,
    role: 'User',
  };
  const result = await db.query('INSERT INTO users SET ?', [user]);
  return { id: result.insertId };
};

// Deletes user
usersService.deleteUser = async (id) => {
  const result = await db.query('UPDATE users SET deleted = 1 WHERE id = ?', [id]);
  return true;
};

// Updates user
usersService.updateUser = async (user) => {
  const userToUpdate = {};
  if (user.firstName) {
    userToUpdate.firstName = user.firstName;
  }
  if (user.lastName) {
    userToUpdate.lastName = user.lastName;
  }
  if (user.email) {
    userToUpdate.email = user.email;
  }
  if (user.password) {
    const hash = await hashService.hash(user.password);
    userToUpdate.password = hash;
  }
  const result = await db.query('UPDATE users SET ? WHERE id = ?', [userToUpdate, user.id]);
  return true;
};

// Find user by email. Returns user if found or undefined
usersService.getUserByEmail = async (email) => {
  const user = await db.query('SELECT * FROM users WHERE email = ? AND deleted = 0', [email]);
  return user[0];
};

// User login
usersService.login = async (login) => {
  const { email, password } = login;
  const user = await usersService.getUserByEmail(email);
  if (!user) return { error: 'No user found' };
  const match = await hashService.compare(password, user.password);
  if (!match) return { error: 'Wrong password' };
  const token = await jwtService.sign(user);
  return { token };
};

module.exports = usersService;
