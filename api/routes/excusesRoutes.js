const express = require('express');
const excusesController = require('../controllers/excusesController');

const router = express.Router();

/**
 * Categories API endpoints
 */
router.get('/', excusesController.getExcuses);
router.get('/:id', excusesController.getExcuseById);
router.post('/', excusesController.createExcuse);
router.patch('/:id', excusesController.updateExcuse);
router.delete('/:id', excusesController.deleteExcuse);

module.exports = router;
