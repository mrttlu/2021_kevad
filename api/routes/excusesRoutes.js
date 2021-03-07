const express = require('express');
const { excusesController } = require('../controllers');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

/**
 * Categories API endpoints
 */
router
  .get('/', excusesController.getExcuses)
  .get('/:id', excusesController.getExcuseById)
  .post('/', isLoggedIn, excusesController.createExcuse)
  .patch('/:id', isLoggedIn, excusesController.updateExcuse)
  .delete('/:id', isLoggedIn, excusesController.deleteExcuse);

module.exports = router;
