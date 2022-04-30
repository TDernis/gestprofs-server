const config = require('config');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize()

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = config.get('db')
  const connection = await mysql.createConnection({ host, port, user, password })
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)

  // connect to db
  const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' })

  // init models and add them to the exported db object
  db.user = require('../models/user')(sequelize)
  db.mark = require('../models/mark')(sequelize)
  db.exam = require('../models/exam')(sequelize)

  try {
    // sync all models with database
    await sequelize.sync()
  } catch(error) {
    console.error(error)
  }
}
