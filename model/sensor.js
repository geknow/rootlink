/**
 * Created by webhugo on 12/26/16.
 */
var sequelizex = require('sequelize-short');
var shortDataTypes = sequelizex.DataTypes;

module.exports = function(sequelize,DataTypes) {
    return sequelize.define("Sensor", {
        //温度传感器 湿度传感器 GPS
        name : shortDataTypes.String(100,false),
        value: shortDataTypes.Double(),//默认value
        value1: shortDataTypes.String(40,true),
        value2: shortDataTypes.String(40,true),
        value3: shortDataTypes.String(40,true),
        value4: shortDataTypes.String(40,true),
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