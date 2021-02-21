const express = require('express');
const { commentsController } = require('../controllers');

const router = express.Router();

/**
 * Comments API endpoints
 */
router
  .get('/', commentsController.getComments)
  .get('/:id', commentsController.getCommentById)
  .post('/', commentsController.createComment)
  .delete('/:id', commentsController.deleteComment);

module.exports = router;
