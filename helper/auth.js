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
    login: (ctx, user) => {
        const LoginToken = hash().update(user['id'].toString()).digest('hex');
        const username = user['username'];
        ctx.currentUser = {
            username: username,
            id: user["id"],
            LoginToken
        };
        ctx.cookies.set(cookieName, LoginToken, {
            maxAge: 30* 60 * 1000//30分钟过期
        });


        cache.set(LoginToken, JSON.stringify(user));
        return LoginToken;
    },
    logout: async(ctx) => {
        let token = ctx.cookies.get(cookieName);
        if(token === null || token === undefined)
            return;
        ctx.cookies.set(cookieName, null, {
            maxAge: 0
        });
        ctx.currentUser = null;
        await cache.del(token);
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
            ctx.currentUser = user;
            ctx.currentUser.LoginToken = token;
        } catch (e) {
            error = e;
        }
        return error ? null : user;
    }
};