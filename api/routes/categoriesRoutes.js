const express = require('express');
const { categoriesController } = require('../controllers');
const { isLoggedIn, isAdmin } = require('../middlewares');

const router = express.Router();

/**
 * Categories API endpoints
 */
router
  .use(isLoggedIn)
  .get('/', categoriesController.getCategories)
  .get('/:id', categoriesController.getCategoryById)
  .post('/', categoriesController.createCategory)
  .patch('/:id', categoriesController.updateCategory)
  .delete('/:id', isAdmin, categoriesController.deleteCategory);

module.exports = router;
