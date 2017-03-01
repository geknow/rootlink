/**
 * Created by webhugo on 12/26/16.
 */
var sequelizex = require('sequelize-short');
var shortDataTypes = sequelizex.DataTypes;

module.exports = function(sequelize,DataTypes) {
    return sequelize.define("Sensor", {
        //数值类型传感器 GPS
        name : shortDataTypes.String(100,false),
        unit: shortDataTypes.String(10,true),//单位 数值类型的单位是用户自己设定，只有一个，例如 摄氏度，GPS类型是经纬度（固定）
        label: shortDataTypes.String(100,false),
        description: shortDataTypes.Text(true),

        value1: shortDataTypes.String(10,true),
        value2: shortDataTypes.String(10,true)
    }, {
        updatedAt: false,
        associate: function (models) {
            models.Sensor.belongsTo(models.Device,{foreignKey : "DeviceId"});

        },
        instanceMethods: {}
    })  
};