/* eslint-disable no-console */
const express = require('express');
const config = require('./config');
const {
  categoriesRoutes,
  commentsRoutes,
  excusesRoutes,
  usersRoutes,
} = require('./api/routes');
const { logger } = require('./api/middlewares');

const app = express();
const { port } = config || 3000;

// Middleware for creating req.body in express app
app.use(express.json());
// Logger middleware
app.use(logger);
// Routes
app.use('/comments', commentsRoutes);
app.use('/users', usersRoutes);
app.use('/categories', categoriesRoutes);
app.use('/excuses', excusesRoutes);

// Start listening
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
