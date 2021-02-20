const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

/**
 * Users API endpoints
 */
router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.createUser);
router.patch('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
