/**
 * Created by webhugo on 12/26/16.
 */
var sequelizex = require('sequelize-short');
var shortDataTypes = sequelizex.DataTypes;

module.exports = function(sequelize,DataTypes) {
    return sequelize.define("Sensor", {
        //温度传感器 湿度传感器 GPS
        name : shortDataTypes.String(100,false),
        value: shortDataTypes.Double(),
        label: shortDataTypes.String(100,false),
        description: shortDataTypes.Text(true)
    }, {
        updatedAt: false,
        associate: function (models) {
            models.Sensor.belongsTo(models.Device,{foreignKey : "DeviceId"});

            models.Sensor.hasMany(models.Directive);
        },
        instanceMethods: {}
    })  
};