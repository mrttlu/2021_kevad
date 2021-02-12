const express = require('express');
const app = express();
const port = 3000;

// Middleware for creating req.body
app.use(express.json());

// Mock database
const excuses = [
  {
    id: 1,
    description: 'Ei tahtnud teha'
  },
  {
    id: 2,
    description: 'Ei osanud'
  },
  {
    id: 3,
    description: 'Ei viitsinud'
  },
  {
    id: 4,
    description: 'Ei teadnud, et oleks vaja midagi teha'
  },
];

/**
 * Get all excuses
 * GET - /excuses
 * Required values: none
 * Optional values: none
 * Success: status 200 - OK and list of excuses
 */
app.get('/excuses', (req, res) => {
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
 * Required values: description
 * Optional values: none
 * Success: status 201 - Created and id of created excuse
 * Error: status 400 - Bad Request and error message
 */
app.post('/excuses', (req, res) => {
  const description = req.body.description;
  if (description) {
    const excuse = {
      id: excuses.length + 1,
      description: description
    };
    excuses.push(excuse);
    res.status(201).json({
      id: excuse.id
    });
  } else {
    res.status(400).json({
      error: 'Description is missing'
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
 * Required values: id, description
 * Optional values: none
 * Success: status 200 - OK and success message
 * Error: status 400 - Bad Request and error message
 */
app.patch('/excuses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const description = req.body.description;
  const index = excuses.findIndex(excuse => excuse.id === id);
  if (index !== -1 && description) {
    excuses[index].description = description;
    res.status(200).json({
      success: true
    });
  } else if (index === -1) {
    res.status(400).json({
      error: `No excuse found with id: ${id}`
    });
  } else {
    res.status(400).json({
      error: `No description provided`
    });
  }
});

// Start listening
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});