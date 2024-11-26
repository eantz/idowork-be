const {drizzle} = require('drizzle-orm/mysql2');
const mysql = require('mysql2/promise');
const user = require('./schema/user');
const todo = require('./schema/todo');

async function createConnection() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const dbconn = drizzle(conn, {
    logger: true,
    schema: {user, todo},
    mode: 'default',
  }); 

  return dbconn
}



module.exports = {createConnection};