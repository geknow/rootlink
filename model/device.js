/**
 * Created by webhugo.
 */
var sequelizex = require('sequelize-short');
var shortDataTypes = sequelizex.DataTypes;

module.exports = function(sequelize,DataTypes) {
    return sequelize.define('Device',{
        name : shortDataTypes.String(100,false),
        label: shortDataTypes.String(100,false),
        description: shortDataTypes.Text(true)
    },{
        updatedAt: false,
        associate : function(models){
            models.Device.belongsTo(models.User,{foreignKey : "UserId"});
            
            models.Device.hasMany(models.Sensor);
        }
    });
};