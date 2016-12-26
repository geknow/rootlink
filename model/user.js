/**
 * Created by webhugo on 16-10-16.
 */
var sequelizex = require('sequelize-short');
var shortDataTypes = sequelizex.DataTypes;

module.exports = function (sequelize, DataTypes) {

    var User = sequelize.define('User', {
        username: shortDataTypes.String(40, false, undefined, true),
        password: shortDataTypes.String(40),
        email: shortDataTypes.String(50, false, undefined, true),
        avatar: shortDataTypes.String(),//头像
        // 0 => normalUser   1=>adminer
        type: shortDataTypes.Int(0),//管理员  或  普通用户
    }, {
        updatedAt: false,
        associate: function (models) {
            models.User.hasMany(models.Device);
        },
        instanceMethods: {}
    });

    return User;
};
