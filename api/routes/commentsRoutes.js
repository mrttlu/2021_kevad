const express = require('express');
const commentsController = require('../controllers/commentsController');

const router = express.Router();

/**
 * Comments API endpoints
 */
router.get('/', commentsController.getComments);
router.get('/:id', commentsController.getCommentById);
router.post('/', commentsController.createComment);
router.delete('/:id', commentsController.deleteComment);

module.exports = router;
