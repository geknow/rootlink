/**
 * Created by webhugo on 2/19/17.
 */
/**
 * 该表存一个token
 * 如果用户是记住密码，生成一个token
 * 用户传递一个token过来，如果token匹配，直接登录
 */
var sequelizex = require('sequelize-short');
var shortDataTypes = sequelizex.DataTypes;

module.exports = function (sequelize, DataTypes) {

    var RememberPass = sequelize.define('RememberPass', {
        token : shortDataTypes.String(),
        expireTime: shortDataTypes.Date()
    }, {
        timestamps: true,
        associate: function (models) {

        },
        instanceMethods: {
        }
    });

    return RememberPass;
};