const excusesService = require('../services/excusesService');
const categoriesService = require('../services/categoriesService');

const excusesController = {};
/**
 * Excuses
 */

/**
 * Get all excuses
 * GET - /excuses
 * Required values: none
 * Optional values: parameter categoryId=:id - returns excuses with category specified by categoryId
 * Success: status 200 - OK and list of excuses
 */
excusesController.getExcuses = (req, res) => {
  const categoryId = parseInt(req.query.categoryId, 10);
  if (categoryId) {
    const category = categoriesService.getCategoryById(categoryId);
    if (category) {
      const excusesInCategory = excusesService.getExcusesInCategory(categoryId);
      if (excusesInCategory) {
        const excusesInCategoryWithCreator = excusesService
          .getExcusesWithCreator(excusesInCategory);
        const excusesWithComments = excusesService
          .getExcusesWithComments(excusesInCategoryWithCreator);
        const excusesWithCategory = excusesService
          .getExcusesWithCategory(excusesWithComments);
        res.status(200).json({
          excuses: excusesWithCategory,
        });
      } else {
        res.status(400).json({
          error: `No excuse found with categoryId: ${categoryId}`,
        });
      }
    } else {
      res.status(400).json({
        error: `No excuse found with categoryId: ${categoryId}`,
      });
    }
  }
  const excusesWithCreator = excusesService
    .getExcusesWithCreator(excusesService.getExcuses());
  const excusesWithComments = excusesService
    .getExcusesWithComments(excusesWithCreator);
  const excusesWithCategory = excusesService
    .getExcusesWithCategory(excusesWithComments);
  res.status(200).json({
    excuses: excusesWithCategory,
  });
};

/**
 * Get ecxuse by specified id
 * GET - /excuses/:id
 * Required values: id
 * Optional values: none
 * Success: status 200 - OK and excuse with specified id
 * Error: status 400 - Bad Request and error message
 */
excusesController.getExcuseById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const excuse = excusesService.getExcuseById(id);
  if (excuse) {
    res.status(200).json({
      excuse,
    });
  } else {
    res.status(400).json({
      error: 'No excuse found',
    });
  }
};

/**
 * Create new excuse
 * POST - /excuses
 * Required values: description, categoryId
 * Optional values: none
 * Success: status 201 - Created and id of created excuse
 * Error: status 400 - Bad Request and error message
 */
excusesController.createExcuse = (req, res) => {
  const { description, categoryId } = req.body;
  if (description && categoryId) {
    const excuse = {
      description,
      categoryId,
    };
    const id = excusesService.createExcuse(excuse);
    if (id) {
      res.status(201).json({
        id: excuse.id,
      });
    } else {
      res.status(500).json({
        error: 'Something went wrong while updating excuse',
      });
    }
  } else if (!description) {
    res.status(400).json({
      error: 'Description is missing',
    });
  } else if (!categoryId) {
    res.status(400).json({
      error: 'Category id is missing',
    });
  }
};

/**
 * Delete excuse
 * DELETE - /excuses/:id
 * Required values: id
 * Optional values: none
 * Success: status 204 - No Content
 * Error: status 400 - Bad Request and error message
 */
excusesController.deleteExcuse = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const excuse = excusesService.getExcuseById(id);
  if (excuse) {
    const success = excusesService.deleteExcuse(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(500).json({
        error: 'Something went wrong while deleting excuse',
      });
    }
  } else {
    res.status(400).json({
      error: `No excuse found with id: ${id}`,
    });
  }
};

/**
 * Update excuse
 * PATCH - /excuses/:id
 * Required values: id, description OR categoryId
 * Optional values: description OR categoryId
 * Success: status 200 - OK and success message
 * Error: status 400 - Bad Request and error message
 */
excusesController.updateExcuse = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { description, categoryId } = req.body;
  if (id && (description || categoryId)) {
    // Check if excuse exists
    const excuse = excusesService.getExcuseById(id);
    if (excuse) {
      const excuseToUpdate = {
        id,
        description,
        categoryId,
      };
      const success = excusesService.updateExcuse(excuseToUpdate);
      if (success) {
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(500).json({
          error: 'Something went wrong while updating excuse',
        });
      }
    } else {
      res.status(400).json({
        error: `No excuse found with id: ${id}`,
      });
    }
  } else {
    res.status(400).json({
      error: 'No required data provided',
    });
  }
};

module.exports = excusesController;
