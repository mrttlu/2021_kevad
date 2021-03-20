const { excusesService } = require('../services');
const { categoriesService } = require('../services');

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
excusesController.getExcuses = async (req, res) => {
  const categoryId = parseInt(req.query.categoryId, 10);
  // If category id is provided, search for excuses in category
  if (!categoryId) {
    // If no category id provided, search for all excuses
    const excuses = await excusesService.getExcuses();
    return res.status(200).json({
      excuses,
    });
  }
  const category = await categoriesService.getCategoryById(categoryId);
  if (!category) {
    return res.status(400).json({
      error: `No category found with id: ${categoryId}`,
    });
  }
  // If category exists
  const excuses = await excusesService.getExcusesInCategory(categoryId);
  if (!excuses) {
    return res.status(400).json({
      error: `No excuse found with categoryId: ${categoryId}`,
    });
  }
  return res.status(200).json({
    excuses,
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
excusesController.getExcuseById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const excuse = await excusesService.getExcuseById(id);
  if (!excuse) {
    return res.status(400).json({
      error: 'No excuse found',
    });
  }
  return res.status(200).json({
    excuse,
  });
};

/**
 * Create new excuse
 * POST - /excuses
 * Required values: description, categoryId
 * Optional values: none
 * Success: status 201 - Created and id of created excuse
 * Error: status 400 - Bad Request and error message
 */
excusesController.createExcuse = async (req, res) => {
  const { description, categoryId } = req.body;
  const createdById = req.userId;
  if (!description || !categoryId) {
    return res.status(400).json({
      error: 'Description or categoryId is missing',
    });
  }
  const excuse = {
    description,
    categoryId,
    createdById,
  };
  const id = await excusesService.createExcuse(excuse);
  if (!id) {
    return res.status(500).json({
      error: 'Something went wrong while updating excuse',
    });
  }
  return res.status(201).json({
    id: excuse.id,
  });
};

/**
 * Delete excuse
 * DELETE - /excuses/:id
 * Required values: id
 * Optional values: none
 * Success: status 204 - No Content
 * Error: status 400 - Bad Request and error message
 */
excusesController.deleteExcuse = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const createdById = req.userId;
  const isAdmin = req.userRole === 'Admin';
  const excuse = await excusesService.getExcuseById(id);
  if (!excuse) {
    return res.status(400).json({
      error: `No excuse found with id: ${id}`,
    });
  }
  if (!(excuse.createdById === createdById || isAdmin)) {
    return res.status(403).json({
      error: 'You have no rights to delete this excuse',
    });
  }
  const success = await excusesService.deleteExcuse(id);
  if (!success) {
    return res.status(500).json({
      error: 'Something went wrong while deleting excuse',
    });
  }
  return res.status(204).end();
};

/**
 * Update excuse
 * PATCH - /excuses/:id
 * Required values: id, description OR categoryId
 * Optional values: description OR categoryId
 * Success: status 200 - OK and success message
 * Error: status 400 - Bad Request and error message
 */
excusesController.updateExcuse = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { description, categoryId } = req.body;
  const createdById = req.userId;
  const isAdmin = req.userRole === 'Admin';
  // Check if excuse exists
  const excuse = await excusesService.getExcuseById(id);
  if (!excuse) {
    res.status(400).json({
      error: `No excuse found with id: ${id}`,
    });
  }
  if (!(excuse.createdById === createdById || isAdmin)) {
    return res.status(403).json({
      error: 'You have no rights to update this excuse',
    });
  }
  if (!(description || categoryId)) {
    return res.status(400).json({
      error: 'No required data provided',
    });
  }
  const excuseToUpdate = {
    id,
    description,
    categoryId,
  };
  const success = await excusesService.updateExcuse(excuseToUpdate);
  if (!success) {
    return res.status(500).json({
      error: 'Something went wrong while updating excuse',
    });
  }
  return res.status(200).json({
    success,
  });
};

module.exports = excusesController;
