const express = require('express');
const excusesController = require('../controllers/excusesController');

const router = express.Router();

/**
 * Categories API endpoints
 */
router.get('/', excusesController.getExcuses)
  .get('/:id', excusesController.getExcuseById)
  .post('/', excusesController.createExcuse)
  .patch('/:id', excusesController.updateExcuse)
  .delete('/:id', excusesController.deleteExcuse);

module.exports = router;
