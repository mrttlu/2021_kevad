const express = require('express');
const config = require('./config');
const database = require('./database');
const commentsRoutes = require('./api/routes/commentsRoutes');
const usersRoutes = require('./api/routes/usersRoutes');
const categoriesRoutes = require('./api/routes/categoriesRoutes');
const logger = require('./api/middlewares/logger');

const app = express();
const { port } = config || 3000;

// Middleware for creating req.body in express app
app.use(express.json());
// Routes
app.use('/comments', commentsRoutes);
app.use('/users', usersRoutes);
app.use('/categories', categoriesRoutes);
// Logger middleware
app.use(logger);

// Find excuse by id. Returns excuse if found or false.
const findExcuseById = (id) => {
  const excuse = database.excuses.find((element) => element.id === id);
  if (excuse) {
    return excuse;
  }
  return false;
};

// Returns excuses with creator
const getExcusesWithCreator = (excuses) => {
  const excusesWithCreator = excuses.map((excuse) => {
    const createdBy = database.users.find((user) => user.id === excuse.createdById);
    return {
      ...excuse,
      createdBy,
    };
  });
  return excusesWithCreator;
};

// Returns excuses with comments
const getExcusesWithComments = (excuses) => {
  const excusesWithComments = excuses.map((excuse) => {
    const comments = database.comments.filter((comment) => comment.excuseId === excuse.id);
    return {
      ...excuse,
      comments,
    };
  });
  return excusesWithComments;
};

// Returns excuses with category
const getExcusesWithCategory = (excuses) => {
  const excusesWithCategory = excuses.map((excuse) => {
    const category = findCategoryById(excuse.categoryId);
    return {
      ...excuse,
      category,
    };
  });
  return excusesWithCategory;
};

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
app.get('/excuses', (req, res) => {
  const categoryId = parseInt(req.query.categoryId, 10);
  if (categoryId) {
    const category = findCategoryById(categoryId);
    if (category) {
      const excusesInCategory = database.excuses.filter(
        (element) => element.categoryId === categoryId,
      );
      if (excusesInCategory) {
        const excusesInCategoryWithCreator = getExcusesWithCreator(excusesInCategory);
        const excusesWithComments = getExcusesWithComments(excusesInCategoryWithCreator);
        const excusesWithCategory = getExcusesWithCategory(excusesWithComments);
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
  const excusesWithCreator = getExcusesWithCreator(database.excuses);
  const excusesWithComments = getExcusesWithComments(excusesWithCreator);
  const excusesWithCategory = getExcusesWithCategory(excusesWithComments);
  res.status(200).json({
    excuses: excusesWithCategory,
  });
});

/**
 * Get ecxuse by specified id
 * GET - /excuses/:id
 * Required values: id
 * Optional values: none
 * Success: status 200 - OK and excuse with specified id
 * Error: status 400 - Bad Request and error message
 */
app.get('/excuses/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const excuse = findExcuseById(id);
  if (excuse) {
    res.status(200).json({
      excuse,
    });
  } else {
    res.status(400).json({
      error: 'No excuse found',
    });
  }
});

/**
 * Create new excuse
 * POST - /excuses
 * Required values: description, categoryId
 * Optional values: none
 * Success: status 201 - Created and id of created excuse
 * Error: status 400 - Bad Request and error message
 */
app.post('/excuses', (req, res) => {
  const { description, categoryId } = req.body;
  if (description && categoryId) {
    const excuse = {
      id: database.excuses.length + 1,
      description,
      categoryId,
    };
    database.excuses.push(excuse);
    res.status(201).json({
      id: excuse.id,
    });
  } else if (!description) {
    res.status(400).json({
      error: 'Description is missing',
    });
  } else if (!categoryId) {
    res.status(400).json({
      error: 'Category id is missing',
    });
  }
});

/**
 * Delete excuse
 * DELETE - /excuses/:id
 * Required values: id
 * Optional values: none
 * Success: status 204 - No Content
 * Error: status 400 - Bad Request and error message
 */
app.delete('/excuses/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Check if index exists
  const index = database.excuses.findIndex((element) => element.id === id);
  if (index !== -1) {
    database.excuses.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(400).json({
      error: `No excuse found with id: ${id}`,
    });
  }
});

/**
 * Update excuse
 * PATCH - /excuses/:id
 * Required values: id, description OR categoryId
 * Optional values: description OR categoryId
 * Success: status 200 - OK and success message
 * Error: status 400 - Bad Request and error message
 */
app.patch('/excuses/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { description, categoryId } = req.body.description;
  // Check if excuse exists
  const index = database.excuses.findIndex((element) => element.id === id);
  if (index !== -1 && (description || categoryId)) {
    if (description) {
      database.excuses[index].description = description;
    }
    if (categoryId) {
      database.excuses[index].categoryId = categoryId;
    }
    res.status(200).json({
      success: true,
    });
  } else if (index === -1) {
    res.status(400).json({
      error: `No excuse found with id: ${id}`,
    });
  } else {
    res.status(400).json({
      error: 'No required data provided',
    });
  }
});

// Start listening
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
