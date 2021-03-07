const express = require('express');
const { categoriesController } = require('../controllers');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

/**
 * Categories API endpoints
 */
router
  .get('/', categoriesController.getCategories)
  .get('/:id', categoriesController.getCategoryById)
  .post('/', isLoggedIn, categoriesController.createCategory)
  .patch('/:id', isLoggedIn, categoriesController.updateCategory)
  .delete('/:id', isLoggedIn, categoriesController.deleteCategory);

module.exports = router;
