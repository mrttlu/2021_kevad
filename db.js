const mysql = require('mysql2');
const util = require('util');
const { db } = require('./config');

const connection = mysql.createConnection({
  host: db.host,
  user: db.user,
  password: db.password,
  port: db.port,
});

connection.query(`CREATE SCHEMA IF NOT EXISTS ${db.database}`, () => {
  connection.query(`USE ${db.database}`, () => {});
});

connection.query = util.promisify(connection.query);

module.exports = connection;
