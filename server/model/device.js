/**
 * Created by webhugo.
 */
var sequelizex = require('sequelize-short');
var shortDataTypes = sequelizex.DataTypes;

module.exports = function(sequelize,DataTypes) {
    return sequelize.define('Device',{
        name : shortDataTypes.String(40,false),
        description: shortDataTypes.Text(false),
        deviceId: {
            type: DataTypes.STRING(40), defaultValue: DataTypes.UUIDV4, primaryKey: true
        }
},{
        updatedAt: false,
        associate : function(models){
            models.Device.belongsTo(models.User,{foreignKey : "UserId"});
        }
    });
};