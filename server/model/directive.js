/**
 * Created by webhugo on 12/27/16.
 */
var sequelizex = require('sequelize-short');
var shortDataTypes = sequelizex.DataTypes;
/**
 * 指令表，记录用户相关指令和对应传感器
 * @param sequelize
 * @param DataTypes
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define("Directive", {
        operation: shortDataTypes.String(50, false),
        operationUrl: shortDataTypes.String(2048, false),
        directiveId: {
            type: DataTypes.STRING(40), defaultValue: DataTypes.UUIDV4, primaryKey: true
        }
    }, {
        updatedAt: false,
        associate: function (models) {
            models.Directive.belongsTo(models.User, {foreignKey: "UserId"});
            models.Directive.belongsTo(models.Trigger, {foreignKey: "TriggerId"});
            models.Directive.belongsTo(models.Sensor, {foreignKey: "SensorId"});
        },
        instanceMethods: {}
    })
};
