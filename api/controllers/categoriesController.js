const { categoriesService } = require('../services');

const categoriesController = {};

/**
 * Get all categories
 * GET - /categories
 * Required values: none
 * Optional values: none
 * Success: status 200 - OK and list of categories
 */
categoriesController.getCategories = async (req, res) => {
  const categories = await categoriesService.getCategories();
  res.status(200).json({
    categories,
  });
};

/**
 * Get category by specified id
 * GET - /categories/:id
 * Required values: id
 * Optional values: none
 * Success: status 200 - OK and category with specified id
 * Error: status 400 - Bad Request and error message
 */
categoriesController.getCategoryById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const category = await categoriesService.getCategoryById(id);
  if (category) {
    res.status(200).json({
      category,
    });
  } else {
    res.status(400).json({
      error: `No category found with id: ${id}`,
    });
  }
};

/**
 * Create new category
 * POST - /categories
 * Required values: description
 * Optional values: none
 * Success: status 201 - Created and id of created category
 * Error: status 400 - Bad Request and error message
 */
categoriesController.createCategory = async (req, res) => {
  const { description } = req.body;
  const createdById = req.userId;
  if (!description) {
    return res.status(400).json({
      error: 'Description is missing',
    });
  }
  const category = {
    description,
    createdById,
  };
  const id = await categoriesService.createCategory(category);
  if (!id) {
    return res.status(500).json({
      error: 'Something went wrong while creating category',
    });
  }
  return res.status(201).json({
    id,
  });
};

/**
 * Delete category
 * DELETE - /categories/:id
 * Required values: id
 * Optional values: none
 * Success: status 204 - No Content
 * Error: status 400 - Bad Request and error message
 */
categoriesController.deleteCategory = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Check if category exists
  const category = await categoriesService.getCategoryById(id);
  if (!category) {
    return res.status(400).json({
      error: `No category found with id: ${id}`,
    });
  }
  const success = await categoriesService.deleteCategory(id);
  if (!success) {
    res.status(500).json({
      error: 'Something went wrong while deleting category',
    });
  }
  return res.status(204).end();
};

/**
 * Update category
 * PATCH - /categories/:id
 * Required values: id, description
 * Optional values: none
 * Success: status 200 - OK and success message
 * Error: status 400 - Bad Request and error message
 */
categoriesController.updateCategory = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({
      error: 'No description provided',
    });
  }
  const category = await categoriesService.getCategoryById(id);
  if (!category) {
    return res.status(400).json({
      error: `No category found with id: ${id}`,
    });
  }
  const categoryToUpdate = {
    id,
    description,
  };
  const success = await categoriesService.updateCategory(categoryToUpdate);
  if (!success) {
    return res.status(500).json({
      error: 'Something went wrong while updating category',
    });
  }
  return res.status(200).json({
    success: true,
  });
};

module.exports = categoriesController;
