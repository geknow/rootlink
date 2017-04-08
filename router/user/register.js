/**
 * Created by claim on 16-10-23.
 */
const db = require('./../../model/index');
const helper = require('./../../helper/auth');
const responser = require('./../../lib/responser');
const indentifyCode = require("../../lib/identifyCode");
const cache = require('../../instance/cache');
const User = db.models.User;
const logger = require("../../log/index").logger;
const utilx = require("../../lib/utilx");

module.exports = router => {

    router.get('/register', async(ctx, next) => {
        responser.success(ctx);
    });

    router.get("/register/getCode", async(ctx, next) => {
        let query = ctx.request.query;
        ctx.checkQuery("email").isEmail();
        if (ctx.errors) {
            responser.reject(ctx, "邮箱错误");
            return;
        }
        let code;
        let email = query.email;
        try {
            let u = (await User.findOne({
                where: {
                    email: query.email
                }
            }));
            if (u) {//如果存在同邮箱
                responser.reject(ctx, "邮箱已经存在");
                return;
            }
            code = utilx.getRandomString(6);
            indentifyCode.sendMail(code, email);
            cache.jsetex(code, 60 * 60, email);
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }
        if (process.env.NODE_ENV == "development") {
            responser.success(ctx, {
                code: code
            })
        } else {
            responser.success(ctx);
        }

    });

    router.post('/register', async(ctx, next) => {
        let body = ctx.request.body;
        try {
            ctx.checkBody("email").isEmail();
            if (ctx.errors) {
                throw Error("邮箱错误");
            }
            ctx.checkBody("username").notEmpty();
            ctx.checkBody("password").notEmpty();
            if (ctx.errors) {
                throw Error("参数不齐");
            }

            let code = body.code;
            let email = await cache.jget(code);
            if (email !== body.email) {
                throw Error("验证码错误");
            }
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }

        let u = (await User.findOne({
            where: {
                username: body.username
            }
        }));
        if (u) {//如果存在同用户名或者同邮箱
            responser.reject(ctx, "用户名已经存在");
            return;
        }

        let user = {
            username: body.username,
            email: body.email,
            avatar: '', //todo : get update avatar
            type: body.type === 'OurEDA_admin' ? 1 : 0,
            key: utilx.getRandomString(32),
            password: utilx.generatorToken(body.password.toString())//加密密码
        };

        let error;
        user = await db.models.User.create(user).catch(err => {
            error = err;
        });
        if (user) {
            let LoginToken = helper.login(ctx, user);
            responser.success(ctx, {
                LoginToken: LoginToken
            });
        } else {
            let errorInfo;
            if (error && /SequelizeUniqueConstraintError/.test(error.toString())) {
                errorInfo = 'Username has been used';
            }
            if (errorInfo)
                responser.reject(ctx, errorInfo, 403);
            else
                responser.catchErr(ctx, error, 500);
        }
    });
};