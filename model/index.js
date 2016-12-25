/**
 * Created by webhugo on 16-10-14.
 */
var Sequelize = require('sequelize');
var config = require('../config/config');
var utilx = require('../lib/utilx');

console.log(config.db.toString());
var sequelize = new Sequelize(
    config.db.toString(), {
        quoteIdentifiers: true
    }
);

utilx.autoImport(__dirname, (tmpPath) => {
    sequelize.import(tmpPath);
});

var models = sequelize.models;
Object.keys(models).forEach((tableName) => {
    if(models[tableName].options.hasOwnProperty("associate")){
        models[tableName].options.associate(models);
    }
});

module.exports = sequelize;