/**
 * Created by webhugo on 16-10-18.
 */
var sequelizex = require('sequelize-short');
var shortDataTypes = sequelizex.DataTypes;

module.exports = function (sequelize, DataTypes) {

    var Post = sequelize.define('Post', {
        text : shortDataTypes.Text(),
        //1.for topic 2 for comment
        // type: shortDataTypes.Int(),
        // star: shortDataTypes.Int(0),//点赞量
        // replyCount: shortDataTypes.Int(0),
        // readCount: shortDataTypes.Int(0),
    }, {
        timestamps: true,
        associate: function (models) {
            models.User.hasMany(models.Post,{foreignKey : 'UserId', constraints: false});
            models.Post.belongsTo(models.User,{foreignKey : 'UserId', constraints: false});

            models.Post.hasMany(models.Reply,{foreignKey : 'PostId', constraints: false});
            models.Reply.belongsTo(models.Post,{foreignKey : 'PostId', constraints: false});
        },
        instanceMethods: {
        }
    });

    return Post;
};
