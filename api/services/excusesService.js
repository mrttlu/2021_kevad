const db = require('../../db');

const excusesService = {};

// Returns excuses
excusesService.getExcuses = async () => {
  const excuses = await db.query(
    `SELECT
      E.id, E.description, E.categoryId, U.id AS createdById, U.firstName, U.lastName, U.email
    FROM
      excuses E
    INNER JOIN
      users U ON E.createdById = U.id
    WHERE
      E.deleted = 0`,
  );
  return excuses;
};

// Returns excuses in category specified by categoryId
excusesService.getExcusesInCategory = async (categoryId) => {
  const excuses = await db.query(
    `SELECT
      E.id, E.description, E.categoryId, U.id AS createdById, U.firstName, U.lastName, U.email
    FROM
      excuses E
    INNER JOIN
      users U ON E.createdById = U.id
    WHERE
      E.deleted = 0 AND categoryId = ?`, [categoryId],
  );
  return excuses;
};

// Find excuse by id. Returns excuse if found or false.
excusesService.getExcuseById = async (id) => {
  const excuse = await db.query(
    `SELECT
      E.id, E.description, E.categoryId, U.id AS createdById, U.firstName, U.lastName, U.email
    FROM
      excuses E
    INNER JOIN
      users U ON E.createdById = U.id
    WHERE
      E.id = ? AND E.deleted = 0`, [id],
  );
  if (!excuse) {
    return false;
  }
  return excuse[0];
};

// Creates new excuse, returns id of created excuse
excusesService.createExcuse = async (newExcuse) => {
  const result = await db.query('INSERT INTO excuses SET ?', [newExcuse]);
  const id = result.insertId;
  return id;
};

// Deletes excuse specified by excuseId
excusesService.deleteExcuse = async (id) => {
  await db.query('UPDATE excuses SET deleted = 1 WHERE id = ?', [id]);
  return true;
};

// Updates excuse, returns true if successful
excusesService.updateExcuse = async (excuse) => {
  const excuseToUpdate = {};
  if (excuse.description) {
    excuseToUpdate.description = excuse.description;
  }
  if (excuse.categoryId) {
    excuseToUpdate.categoryId = excuse.categoryId;
  }
  await db.query('UPDATE excuses SET ? WHERE id = ?', [excuseToUpdate, excuse.id]);
  return true;
};

module.exports = excusesService;
