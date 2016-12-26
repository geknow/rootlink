/**
 * Created by webhugo on 12/26/16.
 */
var sequelizex = require('sequelize-short');
var shortDataTypes = sequelizex.DataTypes;

module.exports = function(sequelize,DataTypes) {
    return sequelize.define("Sensor", {
        name : shortDataTypes.String(100,false),
        label: shortDataTypes.String(100,false),
        description: shortDataTypes.Text(true)
    }, {
        updatedAt: false,
        associate: function (models) {
            models.Sensor.belongsTo(models.Device,{foreignKey : "DeviceId"});
        },
        instanceMethods: {}
    })  
};