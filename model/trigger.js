/**
 * Created by webhugo on 17-2-27.
 */
var sequelizex = require('sequelize-short');
var shortDataTypes = sequelizex.DataTypes;

module.exports = function(sequelize,DataTypes) {
    return sequelize.define('Trigger',{
        name: shortDataTypes.String(30,false),
        status: shortDataTypes.Bool(),
        triggerId: {
            type: DataTypes.STRING(40), defaultValue: DataTypes.UUIDV4, primaryKey: true
        }
    },{
        updatedAt: false,
        associate : function(models){
            models.Trigger.belongsTo(models.Device,{foreignKey : "DeviceId"});
            models.Trigger.belongsTo(models.User,{foreignKey : "UserId"});

        }
    });
};