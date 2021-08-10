'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const { Pool, Client } = require('pg')
const db = {};

/*async function init() {
  const client = new Client({
    user: config.username,
    host: config.host,
    password: config.password,
    port: 5432
  })

  try {
    await client.connect()
    await client.query(`CREATE DATABASE ${config.database};`)
    console.log("Created database")
  } catch (error) {
    if (error.routine === "auth_failed")
      console.log("Invalid credential")
    else if (error.routine === "createdb")
      console.log(`Database ${config.database} already exists`)
    else
      console.log(error)
  }
  await client.end()

}*/

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {

    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
//db.init = init;

module.exports = db;
