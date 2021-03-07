const express = require('express');
const { usersController } = require('../controllers');

const router = express.Router();
const { validators, isLoggedIn, isAdmin } = require('../middlewares');

/**
 * Users API endpoints
 */
router
  .get('/', isLoggedIn, isAdmin, usersController.getUsers)
  .get('/:id', isLoggedIn, validators.getUserById, usersController.getUserById)
  .post('/', usersController.createUser)
  .post('/login', usersController.login)
  .patch('/:id', isLoggedIn, usersController.updateUser)
  .delete('/:id', isLoggedIn, usersController.deleteUser);

module.exports = router;
