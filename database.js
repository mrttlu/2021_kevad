// Mock database
const database = {
  comments: [
    {
      id: 1,
      excuseId: 1,
      createdById: 1,
      content: 'Suht igav vabandus',
    },
    {
      id: 2,
      excuseId: 1,
      createdById: 2,
      content: 'Kasutan seda vabandust iga päev',
    },
    {
      id: 3,
      excuseId: 2,
      createdById: 1,
      content: 'Matemaatikas väga kasutatav vabandus',
    },
  ],
  excuses: [
    {
      id: 1,
      description: 'Ei tahtnud teha',
      categoryId: 1,
      createdById: 1,
      public: true,
    },
    {
      id: 2,
      description: 'Ei osanud',
      categoryId: 2,
      createdById: 1,
      public: false,
    },
    {
      id: 3,
      description: 'Ei viitsinud',
      categoryId: 3,
      createdById: 2,
      public: true,
    },
    {
      id: 4,
      description: 'Ei teadnud, et oleks vaja midagi teha',
      categoryId: 3,
      createdById: 2,
      public: false,
    },
  ],
  categories: [
    {
      id: 1,
      description: 'Home',
    },
    {
      id: 2,
      description: 'Work',
    },
    {
      id: 3,
      description: 'School',
    },
  ],
  users: [
    {
      id: 1,
      firstName: 'Juku',
      lastName: 'Juurikas',
    },
    {
      id: 2,
      firstName: 'Mati',
      lastName: 'Maasikas',
    },
  ],
};

module.exports = database;
