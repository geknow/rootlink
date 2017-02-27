/**
 * Created by webhugo on 17-2-27.
 */
var sequelizex = require('sequelize-short');
var shortDataTypes = sequelizex.DataTypes;

module.exports = function(sequelize,DataTypes) {
    return sequelize.define('Trigger',{
        name: shortDataTypes.String(),
        status: shortDataTypes.Bool()
    },{
        updatedAt: false,
        associate : function(models){
            models.Trigger.belongsTo(models.User,{foreignKey : "UserId"});

        }
    });
};