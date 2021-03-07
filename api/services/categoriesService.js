const database = require('../../database');

const categoriesService = {};

// Returns list of categories
categoriesService.getCategories = () => {
  const { categories } = database;
  return categories;
};

// Find category by id. Returns category if found or false.
categoriesService.getCategoryById = (id) => {
  const category = database.categories.find((element) => element.id === id);
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
