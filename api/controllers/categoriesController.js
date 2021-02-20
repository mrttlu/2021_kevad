const categoriesService = require('../services/categoriesServices');

const categoriesController = {};

/**
 * Get all categories
 * GET - /categories
 * Required values: none
 * Optional values: none
 * Success: status 200 - OK and list of categories
 */
categoriesController.getCategories = (req, res) => {
  const categories = categoriesService.getCategories();
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
categoriesController.getCategoryById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const category = categoriesService.getCategoryById(id);
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
categoriesController.createCategory = (req, res) => {
  const { description } = req.body;
  if (description) {
    const category = {
      description,
    };
    const id = categoriesService.createCategory(category);
    if (id) {
      res.status(201).json({
        id,
      });
    } else {
      res.status(500).json({
        error: 'Something went wrong while creating category',
      });
    }
  } else {
    res.status(400).json({
      error: 'Description is missing',
    });
  }
};

/**
 * Delete category
 * DELETE - /categories/:id
 * Required values: id
 * Optional values: none
 * Success: status 204 - No Content
 * Error: status 400 - Bad Request and error message
 */
categoriesController.deleteCategory = (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Check if category exists
  const category = categoriesService.getCategoryById(id);
  if (category) {
    const success = categoriesService.deleteCategory(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(500).json({
        error: 'Something went wrong while deleting category',
      });
    }
  } else {
    res.status(400).json({
      error: `No category found with id: ${id}`,
    });
  }
};

/**
 * Update category
 * PATCH - /categories/:id
 * Required values: id, description
 * Optional values: none
 * Success: status 200 - OK and success message
 * Error: status 400 - Bad Request and error message
 */
categoriesController.updateCategory = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { description } = req.body;
  if (id && description) {
    const category = categoriesService.getCategoryById(id);
    if (category) {
      const categoryToUpdate = {
        id,
        description,
      };
      const success = categoriesService.updateCategory(categoryToUpdate);
      if (success) {
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(500).json({
          error: 'Something went wrong while updating category',
        });
      }
    } else {
      res.status(400).json({
        error: `No category found with id: ${id}`,
      });
    }
  } else {
    res.status(400).json({
      error: 'No description provided',
    });
  }
};

module.exports = categoriesController;
