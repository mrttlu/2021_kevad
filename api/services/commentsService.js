const db = require('../../db');

const commentsService = {};

// Returns all comments
commentsService.getAllComments = async () => {
  const comments = await db.query(
    `SELECT
      C.id, C.content, U.id AS createdById, U.firstName, U.lastName, U.email, E.id AS excuseId, E.description
    FROM
      comments C
    INNER JOIN
      users U ON C.createdById = U.id
    INNER JOIN
      excuses E ON C.excuseId = E.id
    WHERE
      C.deleted = 0`,
  );
  return comments;
};

// Returns users comments
commentsService.getUserComments = async (userId) => {
  const comments = await db.query(
    `SELECT
      C.id, C.content, E.id AS excuseId, E.description
    FROM
      comments C
    INNER JOIN
      users U ON C.createdById = U.id
    INNER JOIN
      excuses E ON C.excuseId = E.id
    WHERE
      U.id = ? AND C.deleted = 0`, [userId],
  );
  return comments;
};

// Find comment by id. Returns comment if found or false.
commentsService.getCommentById = async (id) => {
  const comments = await db.query(
    `SELECT
      C.id, C.content, U.id AS createdById, U.firstName, U.lastName, U.email, E.id AS excuseId, E.description
    FROM
      comments C
    INNER JOIN
      users U ON C.createdById = U.id
    INNER JOIN
      excuses E ON C.excuseId = E.id
    WHERE
      C.id = ? AND C.deleted = 0`, [id],
  );
  if (comments[0]) {
    return comments[0];
  }
  return false;
};

// Creates new comment
commentsService.createComment = async (comment) => {
  const result = await db.query('INSERT INTO comments SET ?', [comment]);
  const id = result.insertId;
  return id;
};

// Deletes comment
commentsService.deleteComment = async (id) => {
  await db.query('UPDATE comments SET deleted = 1 WHERE id = ?', [id]);
  return true;
};

module.exports = commentsService;
