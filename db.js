// Get the client
const mysql = require('mysql2');
const util = require('util');
const { db } = require('./config');

// Create the connection to database
const pool = mysql.createPool({
  host: db.host,
  user: db.user,
  password: db.password,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.query(
  `CREATE SCHEMA IF NOT EXISTS ${db.database}`, () => {
    pool.query(`USE ${db.database}`, () => {
    });
  },
);

pool.query = util.promisify(pool.query);

module.exports = pool;
