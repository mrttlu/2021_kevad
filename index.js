const express = require('express');

const app = express();
const port = 3000;

// Middleware for creating req.body in express app
app.use(express.json());

// Mock database
const excuses = [
  {
    id: 1,
    description: 'Ei tahtnud teha',
    categoryId: 1,
  },
  {
    id: 2,
    description: 'Ei osanud',
    categoryId: 2,
  },
  {
    id: 3,
    description: 'Ei viitsinud',
    categoryId: 3,
  },
  {
    id: 4,
    description: 'Ei teadnud, et oleks vaja midagi teha',
    categoryId: 3,
  },
];

const categories = [
  {
    id: 1,
    description: 'Home',
  },
  {
    id: 2,
    description: 'Work',
  },
  {
    id: 3,
    description: 'School',
  },
];

/**
 * Categories related functions
 */

// Find category by id. Returns category or false.
const findCategoryById = (id) => {
  const category = categories.find((element) => element.id === id);
  if (category) {
    return category;
  }
  return false;
};

/**
 * Categories API endpoints
 */

/**
 * Get all categories
 * GET - /categories
 * Required values: none
 * Optional values: none
 * Success: status 200 - OK and list of categories
 */
app.get('/categories', (req, res) => {
  res.status(200).json({
    categories,
  });
});

/**
 * Get category with specified id
 * GET - /categories/:id
 * Required values: id
 * Optional values: none
 * Success: status 200 - OK and category with specified id
 * Error: status 400 - Bad Request and error message
 */
app.get('/categories/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const category = findCategoryById(id);
  if (category) {
    res.status(200).json({
      category,
    });
  } else {
    res.status(400).json({
      error: 'No category found',
    });
  }
});

/**
 * Create new category
 * POST - /categories
 * Required values: description
 * Optional values: none
 * Success: status 201 - Created and id of created category
 * Error: status 400 - Bad Request and error message
 */
app.post('/categories', (req, res) => {
  const { description } = req.body;
  if (description) {
    const category = {
      id: categories.length + 1,
      description,
    };
    categories.push(category);
    res.status(201).json({
      id: category.id,
    });
  } else {
    res.status(400).json({
      error: 'Description is missing',
    });
  }
});

/**
 * Delete category
 * DELETE - /categories/:id
 * Required values: id
 * Optional values: none
 * Success: status 204 - No Content
 * Error: status 400 - Bad Request and error message
 */
app.delete('/categories/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Check if category exists
  const category = findCategoryById(id);
  if (category) {
    // Find category index
    const index = categories.findIndex((element) => element.id === id);
    // Remove category from 'database'
    categories.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(400).json({
      error: `No category found with id: ${id}`,
    });
  }
});

/**
 * Update category
 * DELETE - /categories/:id
 * Required values: id, description
 * Optional values: none
 * Success: status 200 - OK and success message
 * Error: status 400 - Bad Request and error message
 */
app.patch('/categories/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { description } = req.body;
  if (id && description) {
    const category = findCategoryById(id);
    if (category) {
      const index = categories.findIndex((element) => element.id === id);
      categories[index].description = description;
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(400).json({
        error: `No excuse found with id: ${id}`,
      });
    }
  } else {
    res.status(400).json({
      error: 'No description provided',
    });
  }
});

/**
 * Excuses
 */

/**
 * Get all excuses
 * GET - /excuses
 * Required values: none
 * Optional values: none
 * Success: status 200 - OK and list of excuses
 */
app.get('/excuses', (req, res) => {
  const categoryId = parseInt(req.query.categoryId, 10);
  if (categoryId) {
    const category = findCategoryById(categoryId);
    if (category) {
      const excusesInCategory = excuses.filter((element) => element.categoryId === categoryId);
      if (excusesInCategory) {
        res.status(200).json({
          excuses: excusesInCategory,
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
  res.status(200).json({
    excuses,
  });
});

/**
 * Get ecxuse with specified id
 * GET - /excuses/:id
 * Required values: id
 * Optional values: none
 * Success: status 200 - OK and excuse with specified id
 * Error: status 400 - Bad Request and error message
 */
app.get('/excuses/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const excuse = excuses.find((element) => element.id === id);
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
      id: excuses.length + 1,
      description,
      categoryId,
    };
    excuses.push(excuse);
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
  const index = excuses.findIndex((element) => element.id === id);
  if (index !== -1) {
    excuses.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(400).json({
      error: `No excuse found with id: ${id}`,
    });
  }
});

/**
 * Update excuse
 * DELETE - /excuses/:id
 * Required values: id, description OR categoryId
 * Optional values: description OR categoryId
 * Success: status 200 - OK and success message
 * Error: status 400 - Bad Request and error message
 */
app.patch('/excuses/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { description, categoryId } = req.body.description;
  // Check if excuse exists
  const index = excuses.findIndex((element) => element.id === id);
  if (index !== -1 && (description || categoryId)) {
    if (description) {
      excuses[index].description = description;
    }
    if (categoryId) {
      excuses[index].categoryId = categoryId;
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
