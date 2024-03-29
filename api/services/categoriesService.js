const db = require('../../db');

const categoriesService = {};

const formatOutput = async (results) => {
  const formatted = await results.map((category) => ({
    id: category.id,
    description: category.description,
    createdBy: {
      id: category.createdById,
      firstName: category.firstName,
      lastName: category.lastName,
      email: category.email,
    },
  }));
  return formatted;
};

// Returns list of categories
categoriesService.getCategories = async () => {
  const categories = await db.query(
    `SELECT
      C.id, C.description, U.id AS createdById, U.firstName, U.lastName, U.email
    FROM
      categories C
    INNER JOIN
      users U ON C.createdById = U.id
    WHERE
    C.deleted = 0`,
  );
  const formattedOutput = await formatOutput(categories);
  return formattedOutput;
};

// Find category by id. Returns category if found or false.
categoriesService.getCategoryById = async (id) => {
  const category = await db.query(
    `SELECT
      C.id, C.description, U.id AS createdById, U.firstName, U.lastName, U.email
    FROM
      categories C
    INNER JOIN
      users U ON C.createdById = U.id
    WHERE
    C.id = ? AND C.deleted = 0`, [id],
  );
  if (!category) return false;
  const formattedOutput = await formatOutput(category);
  return formattedOutput[0];
};

// Creates new category
categoriesService.createCategory = async (newCategory) => {
  const result = await db.query('INSERT INTO categories SET ?', [newCategory]);
  return result.insertId;
};

// Deletes category
categoriesService.deleteCategory = async (id) => {
  await db.query('DELETE FROM categories WHERE id = ?', [id]);
  return true;
};

// Updates category
categoriesService.updateCategory = async (category) => {
  await db.query('UPDATE categories SET description = ? WHERE id = ?', [category.description, category.id]);
  return true;
};

module.exports = categoriesService;
