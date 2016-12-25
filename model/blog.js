/**
 * Created by webhugo on 12/25/16.
 */
var sequelizex = require('sequelize-short');
var shortDataTypes = sequelizex.DataTypes;

module.exports = function (sequelize, DataTypes) {

    var Blog = sequelize.define('Blog', {
        text: shortDataTypes.Text(false)
    }, {
        associate: function (models) {
            
        },
        instanceMethods: {}
    });

    return Blog;
};
