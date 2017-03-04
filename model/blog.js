/**
 * Created by webhugo on 12/25/16.
 */
var sequelizex = require('sequelize-short');
var shortDataTypes = sequelizex.DataTypes;
let getRandomString = require("../lib/utilx").getRandomString;

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('Blog', {
            text: shortDataTypes.Text(false),
            time: shortDataTypes.String(40),
            label: shortDataTypes.String(40),
            title: shortDataTypes.String(40),
            blogId: {
                type: DataTypes.STRING(40), defaultValue: DataTypes.UUIDV4, primaryKey: true
            }
        },
        {
            associate: function (models) {

            }
            ,
            instanceMethods: {}
        }
    )
        ;
};
