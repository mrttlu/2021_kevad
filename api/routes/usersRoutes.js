const express = require('express');
const { usersController } = require('../controllers');

const router = express.Router();
const { validators } = require('../middlewares');

/**
 * Users API endpoints
 */
router
  .get('/', usersController.getUsers)
  .get('/:id', validators.getUserById, usersController.getUserById)
  .post('/', validators.createUser, usersController.createUser)
  .patch('/:id', usersController.updateUser)
  .delete('/:id', usersController.deleteUser);

module.exports = router;
