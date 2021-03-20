const db = require('../../db');

const formatOutput = async (results) => {
  const formatted = await results.map((comment) => ({
    id: comment.id,
    content: comment.content,
    dateCreated: comment.dateCreated,
    createdBy: {
      id: comment.createdById,
      firstName: comment.firstName,
      lastName: comment.lastName,
      email: comment.email,
    },
    excuse: {
      id: comment.excuseId,
      description: comment.excuseDescription,
    },
  }));
  return formatted;
};

const commentsService = {};

// Returns all comments
commentsService.getAllComments = async () => {
  const comments = await db.query(
    `SELECT
      C.id, C.content, C.dateCreated, U.id AS createdById, U.firstName, U.lastName, U.email, E.id AS excuseId, E.description AS excuseDescription
    FROM
      comments C
    INNER JOIN
      users U ON C.createdById = U.id
    INNER JOIN
      excuses E ON C.excuseId = E.id
    WHERE
      C.deleted = 0`,
  );

  const formattedOutput = await formatOutput(comments);
  return formattedOutput;
};

// Returns users comments
commentsService.getUserComments = async (userId) => {
  const comments = await db.query(
    `SELECT
      C.id, C.content, C.dateCreated, E.id AS excuseId, E.description AS excuseDescription
    FROM
      comments C
    INNER JOIN
      users U ON C.createdById = U.id
    INNER JOIN
      excuses E ON C.excuseId = E.id
    WHERE
      U.id = ? AND C.deleted = 0`, [userId],
  );
  const formattedOutput = await formatOutput(comments);
  return formattedOutput;
};

// Find comment by id. Returns comment if found or false.
commentsService.getCommentById = async (id) => {
  const comments = await db.query(
    `SELECT
      C.id, C.content, C.dateCreated, U.id AS createdById, U.firstName, U.lastName, U.email, E.id AS excuseId, E.description AS excuseDescription
    FROM
      comments C
    INNER JOIN
      users U ON C.createdById = U.id
    INNER JOIN
      excuses E ON C.excuseId = E.id
    WHERE
      C.id = ? AND C.deleted = 0`, [id],
  );
  const formattedOutput = await formatOutput(comments);
  if (formattedOutput[0]) {
    return formattedOutput[0];
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
