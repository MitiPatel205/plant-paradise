'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const modelModule = require(path.join(__dirname, file));
    let model;

    // If the export is a class, instantiate it with 'new'
    if (typeof modelModule === 'function' && /^class\s/.test(Function.prototype.toString.call(modelModule))) {
      model = new modelModule(sequelize, Sequelize.DataTypes);
    } else if (typeof modelModule === 'function') {
      // If it's a factory function, call it
      model = modelModule(sequelize, Sequelize.DataTypes);
    } else if (modelModule.default) {
      // For ES6 modules transpiled with Babel
      if (typeof modelModule.default === 'function' && /^class\s/.test(Function.prototype.toString.call(modelModule.default))) {
        model = new modelModule.default(sequelize, Sequelize.DataTypes);
      } else {
        model = modelModule.default(sequelize, Sequelize.DataTypes);
      }
    } else {
      throw new Error(`Model file ${file} does not export a function or class`);
    }

    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
