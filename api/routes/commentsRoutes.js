const express = require('express');
const { commentsController } = require('../controllers');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

/**
 * Comments API endpoints
 */
router
  .get('/', isLoggedIn, commentsController.getComments)
  .get('/:id', isLoggedIn, commentsController.getCommentById)
  .post('/', isLoggedIn, commentsController.createComment)
  .delete('/:id', isLoggedIn, commentsController.deleteComment);

module.exports = router;
