/**
 * Created by webhugo on 16-10-14.
 */
var cache = require('../instance/cache.js');
var util = require('util');
var db = require('../model/index');
var cookieName = 'LoginToken';
let crypto = require('crypto');
let clone = require('../lib/utilx').ObjectClone;
let hash = ()=> {
    return crypto.createHash('sha1');
};

module.exports = {
    /**
     * 登录
     * @param ctx
     * @param user
     * @param ifKeep
     */
    login: (ctx, user, ifKeep) => {
        const LoginToken = hash().update(user.getDataValue('id').toString()).digest('hex');
        const username = user.getDataValue('username');
        ctx.currentUser = {
            username: username,
            id: user.getDataValue('id')
        };
        ctx.cookies.set(cookieName, LoginToken, {
            maxAge: ifKeep ? 7 * 24 * 3600 * 1000 : 0
        });
        
        let newUer = clone(user.dataValues);
        delete newUer.password;//删除密码
        cache.set(LoginToken, JSON.stringify(newUer));
        return LoginToken;
    },
    logout: async(ctx) => {
        ctx.cookies.set(cookieName, null, {
            expires: new Date('2000-1-1')
        });
    },
    getUsername: async loginToken=> {
        let username = await cache.get(loginToken);
        return username;
    },
    /**
     * 获取当前用户
     * @param ctx
     * @returns {user || null}
     */
    user: async(ctx) => {
        let error;
        try {
            var token = ctx.cookies.get(cookieName);
            var user = cache.jget(token);
        } catch (e) {
            error = e;
        }
        return error ? null : user;
    }
};