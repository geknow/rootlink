/**
 * Created by webhugo on 12/26/16.
 */
var sequelizex = require('sequelize-short');
var shortDataTypes = sequelizex.DataTypes;

module.exports = function (sequelize, DataTypes) {
    return sequelize.define("Sensor", {
        //数值类型传感器 GPS
        name: shortDataTypes.String(50, false),
        unit: shortDataTypes.String(20, true),//单位 数值类型的单位是用户自己设定，只有一个，例如 摄氏度，GPS类型是经纬度（固定）
        description: shortDataTypes.Text(true),
        sensorId: {
            type: DataTypes.STRING(40), defaultValue: DataTypes.UUIDV4, primaryKey: true
        }

    }, {
        updatedAt: false,
        associate: function (models) {
            models.Sensor.belongsTo(models.Device, {foreignKey: "DeviceId"});
            models.Sensor.belongsTo(models.User, {foreignKey: "UserId"});
        },
        instanceMethods: {}
    })
};