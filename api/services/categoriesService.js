const database = require('../../database');
const db = require('../../db');

const categoriesService = {};

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
  return categories;
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
  return category;
};

// Creates new category
categoriesService.createCategory = (newCategory) => {
  const id = database.categories.length + 1;
  const category = {
    id,
    ...newCategory,
  };
  database.categories.push(category);
  return id;
};

// Deletes category
categoriesService.deleteCategory = (id) => {
  // Find category index
  const index = database.categories.findIndex((element) => element.id === id);
  // Remove category from 'database'
  database.categories.splice(index, 1);
  return true;
};

// Updates category
categoriesService.updateCategory = (category) => {
  // Find category index
  const index = database.categories.findIndex((element) => element.id === category.id);
  if (!category.description) return false;
  database.categories[index].description = category.description;
  return true;
};

module.exports = categoriesService;
