/**
 * Created by webhugo on 17-3-4.
 */
var sequelizex = require('sequelize-short');
var shortDataTypes = sequelizex.DataTypes;

module.exports = function (sequelize, DataTypes) {
    return sequelize.define("SensorValue", {

        value1: shortDataTypes.String(10, true),
        value2: shortDataTypes.String(10, true),
        sensorValueId: {
            type: DataTypes.STRING(40), defaultValue: DataTypes.UUIDV4, primaryKey: true
        }

    }, {
        updatedAt: false,
        associate: function (models) {
            models.SensorValue.belongsTo(models.Sensor, {foreignKey: "SensorId"});
            models.SensorValue.belongsTo(models.Device, {foreignKey: "DeviceId"});
        },
        instanceMethods: {}
    })
};