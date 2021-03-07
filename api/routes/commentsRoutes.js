const express = require('express');
const { commentsController } = require('../controllers');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

/**
 * Comments API endpoints
 */
router
  .use(isLoggedIn)
  .get('/', commentsController.getComments)
  .get('/:id', commentsController.getCommentById)
  .post('/', commentsController.createComment)
  .delete('/:id', commentsController.deleteComment);

module.exports = router;
