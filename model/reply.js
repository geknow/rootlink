/**
 * Created by webhugo on 16-10-18.
 */
var sequelizex = require('sequelize-short');
var shortDataTypes = sequelizex.DataTypes;

module.exports = function (sequelize, DataTypes) {

    var Reply = sequelize.define('Reply', {
        text : shortDataTypes.Text(true),
        //1.for topic 2 for comment
        type: shortDataTypes.Int(1),
        // star: shortDataTypes.Int(0),//点赞量
    }, {
        timestamps: true,
        associate: function (models) {
            models.Post.hasMany(models.Reply,{foreignKey : 'PostId', constraints: false});
            models.Reply.belongsTo(models.Post,{foreignKey : 'PostId', constraints: false});

            models.User.hasMany(models.Reply,{foreignKey : 'UserId', constraints: false});
            models.Reply.belongsTo(models.User,{foreignKey : 'UserId', constraints: false});
        },
        instanceMethods: {
        }
    });

    return Reply;
};