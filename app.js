const express = require('express');
const {
  categoriesRoutes,
  commentsRoutes,
  excusesRoutes,
  usersRoutes,
} = require('./api/routes');
const { logger } = require('./api/middlewares');

const app = express();

// Middleware for creating req.body in express app
app.use(express.json());
// Logger middleware
app.use(logger);
// Routes
app.use('/comments', commentsRoutes);
app.use('/users', usersRoutes);
app.use('/categories', categoriesRoutes);
app.use('/excuses', excusesRoutes);

module.exports = app;
