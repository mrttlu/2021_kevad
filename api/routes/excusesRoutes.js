const express = require('express');
const { excusesController } = require('../controllers');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

/**
 * Categories API endpoints
 */
router
  .use(isLoggedIn)
  .get('/', excusesController.getExcuses)
  .get('/:id', excusesController.getExcuseById)
  .post('/', excusesController.createExcuse)
  .patch('/:id', excusesController.updateExcuse)
  .delete('/:id', excusesController.deleteExcuse);

module.exports = router;
