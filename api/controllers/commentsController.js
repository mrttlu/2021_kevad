const { commentsService } = require('../services');

const commentsController = {};

/**
 * Get all comments
 * GET - /comments
 * Required values: none
 * Optional values: none
 * Success: status 200 - OK and list of comments
 */
commentsController.getComments = (req, res) => {
  const comments = commentsService.getComments();
  res.status(200).json({
    comments,
  });
};

/**
 * Get comment by comment id
 * GET - /comments/:id
 * Required values: id
 * Optional values: none
 * Success: status 200 - OK and comment with specified id
 * Error: status 400 - Bad Request and error message
 */
commentsController.getCommentById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const comment = commentsService.getCommentById(id);
  if (comment) {
    res.status(200).json({
      comment,
    });
  } else {
    res.status(400).json({
      error: `No comment found with id: ${id}`,
    });
  }
};

/**
 * Create new comment
 * POST - /comments
 * Required values: excuseId, createdById, content
 * Optional values: none
 * Success: status 201 - Created and id of created comment
 * Error: status 400 - Bad Request and error message
 */
commentsController.createComment = (req, res) => {
  const { excuseId, createdById, content } = req.body;
  if (excuseId && createdById && content) {
    const comment = {
      excuseId,
      createdById,
      content,
    };
    const id = commentsService.createComment(comment);
    res.status(201).json({
      id,
    });
  } else {
    res.status(400).json({
      error: 'Excuse id, creator id on content is missing',
    });
  }
};

/**
 * Delete comment
 * DELETE - /comments/:id
 * Required values: id
 * Optional values: none
 * Success: status 204 - No Content
 * Error: status 400 - Bad Request and error message
 */
commentsController.deleteComment = (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Check if comment exists
  const comment = commentsService.getCommentById(id);
  if (comment) {
    const success = commentsService.deleteComment(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(500).json({
        error: 'Something went wrong while deleting comment.',
      });
    }
  } else {
    res.status(400).json({
      error: `No comment found with id: ${id}`,
    });
  }
};

module.exports = commentsController;
