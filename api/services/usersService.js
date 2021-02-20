const database = require('../../database');

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
usersService.createUser = (newUser) => {
  const id = database.users.length + 1;
  const user = {
    id,
    ...newUser,
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

module.exports = usersService;
