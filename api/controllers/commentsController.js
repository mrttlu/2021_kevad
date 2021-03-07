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
  let comments;
  const createdById = req.userId;
  const role = req.userRole;
  if (role === 'Admin') {
    comments = commentsService.getAllComments();
  } else {
    comments = commentsService.getUserComments(createdById);
  }
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
  const createdById = req.userId;
  const isAdmin = req.userRole === 'Admin';
  const comment = commentsService.getCommentById(id);
  // Check if comment exists and user is creator of this comment or admin
  if (!(comment.createdById === createdById || isAdmin) || !comment) {
    return res.status(400).json({
      error: `No comment found with id: ${id}`,
    });
  }
  return res.status(200).json({
    comment,
  });
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
  const { excuseId, content } = req.body;
  const createdById = req.userId;
  if (!excuseId || !content) {
    return res.status(400).json({
      error: 'Excuse id, creator id on content is missing',
    });
  }
  const comment = {
    excuseId,
    createdById,
    content,
  };
  const id = commentsService.createComment(comment);
  return res.status(201).json({
    id,
  });
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
  const createdById = req.userId;
  const isAdmin = req.userRole === 'Admin';
  // Check if comment exists
  const comment = commentsService.getCommentById(id);
  if (!comment) {
    return res.status(400).json({
      error: `No comment found with id: ${id}`,
    });
  }
  // Check if user is creator of this comment or admin
  if (!(comment.createdById === createdById || isAdmin)) {
    return res.status(403).json({
      error: 'You have no rights to delete this comment',
    });
  }
  const success = commentsService.deleteComment(id);
  if (!success) {
    res.status(500).json({
      error: 'Something went wrong while deleting comment.',
    });
  }
  return res.status(204).end();
};

module.exports = commentsController;
