/**
 * Created by webhugo.
 */
module.exports = function(sequelize,DataTypes) {
    return sequelize.define('Device',{
        name : {
            type : DataTypes.STRING
        }
    },{
        associate : function(models){
            models.Device.hasMany(models.User,{foreignKey : "DeviceID"});
            models.Device.hasMany(models.Data,{foreignKey : "DeviceID"});
        }
    });
};