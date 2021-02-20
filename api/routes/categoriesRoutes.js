const express = require('express');
const categoriesController = require('../controllers/categoriesController');

const router = express.Router();

/**
 * Categories API endpoints
 */
router.get('/', categoriesController.getCategories);
router.get('/:id', categoriesController.getCategoryById);
router.post('/', categoriesController.createCategory);
router.patch('/:id', categoriesController.updateCategory);
router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;
