const express = require('express');
const categoriesController = require('../controllers/categoriesController');

const router = express.Router();

/**
 * Categories API endpoints
 */
router.get('/', categoriesController.getCategories)
  .get('/:id', categoriesController.getCategoryById)
  .post('/', categoriesController.createCategory)
  .patch('/:id', categoriesController.updateCategory)
  .delete('/:id', categoriesController.deleteCategory);

module.exports = router;
