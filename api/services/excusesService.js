const database = require('../../database');
const categoriesService = require('./categoriesService');
const usersService = require('./usersService');

const excusesService = {};

// Returns excuses
excusesService.getExcuses = () => {
  const { excuses } = database;
  return excuses;
};

// Find excuse by id. Returns excuse if found or false.
excusesService.getExcuseById = (id) => {
  const excuse = database.excuses.find((element) => element.id === id);
  if (excuse) {
    return excuse;
  }
  return false;
};

// Returns excuses with creator
excusesService.getExcusesWithCreator = (excuses) => {
  const excusesWithCreator = excuses.map((excuse) => {
    const createdBy = usersService.getUserById(excuse.createdById);
    return {
      ...excuse,
      createdBy,
    };
  });
  return excusesWithCreator;
};

// Returns excuses with comments
excusesService.getExcusesWithComments = (excuses) => {
  const excusesWithComments = excuses.map((excuse) => {
    const comments = database.comments.filter((comment) => comment.excuseId === excuse.id);
    return {
      ...excuse,
      comments,
    };
  });
  return excusesWithComments;
};

// Returns excuses with category
excusesService.getExcusesWithCategory = (excuses) => {
  const excusesWithCategory = excuses.map((excuse) => {
    const category = categoriesService.getCategoryById(excuse.categoryId);
    return {
      ...excuse,
      category,
    };
  });
  return excusesWithCategory;
};

// Returns excuses in category specified by categoryId
excusesService.getExcusesInCategory = (categoryId) => {
  const excuses = database.excuses.filter(
    (element) => element.categoryId === categoryId,
  );
  return excuses;
};

// Creates new excuse, returns id of created excuse
excusesService.createExcuse = (newExcuse) => {
  const id = database.excuses.length + 1;
  const excuse = {
    id,
    ...newExcuse,
  };
  database.excuses.push(excuse);
  return id;
};

// Deletes excuse specified by excuseId
excusesService.deleteExcuse = (id) => {
  // Find index
  const index = database.excuses.findIndex((element) => element.id === id);
  database.excuses.splice(index, 1);
  return true;
};

// Updates excuse, returns true if successful
excusesService.updateExcuse = (excuse) => {
  const index = database.excuses.findIndex((element) => element.id === excuse.id);
  if (excuse.description) {
    database.excuses[index].description = excuse.description;
  }
  if (excuse.categoryId) {
    database.excuses[index].categoryId = excuse.categoryId;
  }
  return true;
};

module.exports = excusesService;
