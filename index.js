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
    categoryId: 1
  },
  {
    id: 2,
    description: 'Ei osanud',
    categoryId: 2
  },
  {
    id: 3,
    description: 'Ei viitsinud',
    categoryId: 3
  },
  {
    id: 4,
    description: 'Ei teadnud, et oleks vaja midagi teha',
    categoryId: 3
  },
];

const categories = [
  {
    id: 1,
    description: 'Home'
  },
  {
    id: 2,
    description: 'Work'
  },
  {
    id: 3,
    description: 'School'
  },
];

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
    categories: categories
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
  const id = parseInt(req.params.id);
  const category = findCategoryById(id);
  if (category) {
    res.status(200).json({
      category: category
    });
  } else {
    res.status(400).json({
      error: 'No category found'
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
  const description = req.body.description;
  if (description) {
    const category = {
      id: categories.length + 1,
      description: description
    };
    categories.push(category);
    res.status(201).json({
      id: category.id
    });
  } else {
    res.status(400).json({
      error: 'Description is missing'
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
  const id = parseInt(req.params.id);
  // Check if category exists
  const category = findCategoryById(id);
  if (category) {
    // Find category index
    const index = categories.findIndex(category => category.id === id);
    // Remove category from 'database'
    categories.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(400).json({
      error: `No category found with id: ${id}`
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
  const id = parseInt(req.params.id);
  const description = req.body.description;
  if (id && description) {
    const category = findCategoryById(id);
    if (category) {
      const index = categories.findIndex(category => category.id === id);
      categories[index].description = description;
      res.status(200).json({
        success: true
      });
    } else {
      res.status(400).json({
        error: `No excuse found with id: ${id}`
      });
    }
  } else {
    res.status(400).json({
      error: `No description provided`
    });
  }
});

/**
 * Categories related functions
 */

// Find category by id. Returns category or false.
const findCategoryById = (id) => {
  const category = categories.find(category => category.id === id);
  if (category) {
    return category
  } else {
    return false
  }
}

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
  const categoryId = parseInt(req.query.categoryId);
  if (categoryId) {
    const category = findCategoryById(categoryId);
    if (category) {
      const excusesInCategory = excuses.filter(excuse => excuse.categoryId === categoryId);
      if (excusesInCategory) {
        res.status(200).json({
          excuses: excusesInCategory
        });
      } else {
        res.status(400).json({
          error: `No excuse found with categoryId: ${categoryId}`
        });
      }
    } else {
      res.status(400).json({
        error: `No excuse found with categoryId: ${categoryId}`
      });
    }
  }
  res.status(200).json({
    excuses: excuses
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
  const id = parseInt(req.params.id);
  const excuse = excuses.find(excuse => excuse.id === id);
  if (excuse) {
    res.status(200).json({
      excuse: excuse
    });
  } else {
    res.status(400).json({
      error: 'No excuse found'
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
  const description = req.body.description;
  const categoryId = req.body.categoryId;
  if (description && categoryId) {
    const excuse = {
      id: excuses.length + 1,
      description: description,
      categoryId: categoryId
    };
    excuses.push(excuse);
    res.status(201).json({
      id: excuse.id
    });
  } else if (!description) {
    res.status(400).json({
      error: 'Description is missing'
    });
  } else if (!categoryId) {
    res.status(400).json({
      error: 'Category id is missing'
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
  const id = parseInt(req.params.id);
  // Check if index exists
  const index = excuses.findIndex(excuse => excuse.id === id);
  if (index !== -1) {
    excuses.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(400).json({
      error: `No excuse found with id: ${id}`
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
  const id = parseInt(req.params.id);
  const description = req.body.description;
  const categoryId = req.body.categoryId;
  // Check if excuse exists
  const index = excuses.findIndex(excuse => excuse.id === id);
  if (index !== -1 && (description || categoryId)) {
    if (description) {
      excuses[index].description = description;
    };
    if (categoryId) {
      excuses[index].categoryId = categoryId;
    };
    res.status(200).json({
      success: true
    });
  } else if (index === -1) {
    res.status(400).json({
      error: `No excuse found with id: ${id}`
    });
  } else {
    res.status(400).json({
      error: `No required data provided`
    });
  }
});

// Start listening
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});