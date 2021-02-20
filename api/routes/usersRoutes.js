const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

/**
 * Users API endpoints
 */
router.get('/', usersController.getUsers)
  .get('/:id', usersController.getUserById)
  .post('/', usersController.createUser)
  .patch('/:id', usersController.updateUser)
  .delete('/:id', usersController.deleteUser);

module.exports = router;
