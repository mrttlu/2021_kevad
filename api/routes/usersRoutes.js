const express = require('express');
const { usersController } = require('../controllers');

const router = express.Router();
const { validators } = require('../middlewares');
const isLoggedIn = require('../middlewares/isLoggedIn');
const isAdmin = require('../middlewares/isAdmin');

/**
 * Users API endpoints
 */
router
  .get('/', isLoggedIn, isAdmin, usersController.getUsers)
  .get('/:id', isLoggedIn, validators.getUserById, usersController.getUserById)
  .post('/', usersController.createUser)
  .post('/login', usersController.login)
  .patch('/:id', usersController.updateUser)
  .delete('/:id', usersController.deleteUser);

module.exports = router;
