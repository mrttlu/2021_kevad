const express = require('express');
const config = require('./config');
const commentsRoutes = require('./api/routes/commentsRoutes');
const usersRoutes = require('./api/routes/usersRoutes');
const categoriesRoutes = require('./api/routes/categoriesRoutes');
const excusesRoutes = require('./api/routes/excusesRoutes');
const logger = require('./api/middlewares/logger');

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
