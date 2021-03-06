const express = require('express');
const { commentsController } = require('../controllers');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

/**
 * Comments API endpoints
 */
router
  .get('/', commentsController.getComments)
  .get('/:id', commentsController.getCommentById)
  .post('/', isLoggedIn, commentsController.createComment)
  .delete('/:id', commentsController.deleteComment);

module.exports = router;
