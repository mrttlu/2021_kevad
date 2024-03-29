const db = require('../../db');

const excusesService = {};

const formatOutput = async (results) => {
  const formatted = await results.map((excuse) => ({
    id: excuse.id,
    description: excuse.description,
    createdBy: {
      id: excuse.createdById,
      firstName: excuse.firstName,
      lastName: excuse.lastName,
      email: excuse.email,
    },
    category: {
      id: excuse.categoryId,
      description: excuse.categoryDescription,
    },
  }));
  return formatted;
};

// Returns excuses
excusesService.getExcuses = async () => {
  const excuses = await db.query(
    `SELECT
      E.id, E.description, E.categoryId,
      U.id AS createdById, U.firstName, U.lastName, U.email,
      C.id AS categoryId, C.description AS categoryDescription
    FROM
      excuses E
    INNER JOIN
      users U ON E.createdById = U.id
    INNER JOIN
      categories C ON E.categoryId = C.id
    WHERE
      E.deleted = 0`,
  );
  const formattedOutput = await formatOutput(excuses);
  return formattedOutput;
};

// Returns excuses in category specified by categoryId
excusesService.getExcusesInCategory = async (categoryId) => {
  const excuses = await db.query(
    `SELECT
    E.id, E.description, E.categoryId, U.id AS createdById, U.firstName, U.lastName, U.email, C.id AS categoryId, C.description AS categoryDescription
    FROM
      excuses E
    INNER JOIN
      users U ON E.createdById = U.id
    INNER JOIN
      categories C ON E.categoryId = C.id
    WHERE
      E.deleted = 0 AND categoryId = ?`, [categoryId],
  );
  const formattedOutput = await formatOutput(excuses);
  return formattedOutput;
};

// Find excuse by id. Returns excuse if found or false.
excusesService.getExcuseById = async (id) => {
  const excuse = await db.query(
    `SELECT
    E.id, E.description, E.categoryId, U.id AS createdById, U.firstName, U.lastName, U.email, C.id AS categoryId, C.description AS categoryDescription
    FROM
      excuses E
    INNER JOIN
      users U ON E.createdById = U.id
    INNER JOIN
      categories C ON E.categoryId = C.id
    WHERE
      E.id = ? AND E.deleted = 0`, [id],
  );
  if (!excuse) {
    return false;
  }
  const formattedOutput = await formatOutput(excuse);
  return formattedOutput[0];
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
