/**
 * Created by claim on 16-10-23.
 */
const db = require('./../../model/index');
const helper = require('./../../helper/auth');
const responser = require('./../../lib/responser');
const EvenImit = require('../../instance/EvenImit');
const logger = require("../../log/index").logger;
const auth = require("../../helper/auth");
const utilx = require("../../lib/utilx");
const expireTime = require("../../config/config").tokenExpire;
const User = db.models.User;
const RememberPass = db.models.RememberPass;
// token过期时间30天
const D = 86400000;

module.exports = router => {

    router.get('/login', async(ctx, next) => {
        responser.success(ctx);
    });

    /***
     * 用户可以选择三种登录模式
     * 1. 通过记住密码 ，传递token，生成一个token存在数据库，选择记住密码就会生成token，每次可以用token来登录
     * 2. 用户名登录
     * 3. 邮箱登录
     */
    router.post('/login', async(ctx, next) => {
        logger.debug("/api/login");
        let body = ctx.request.body;
        let user;
        let token = null;
        let BodyToken = body.token || null;

        let name = body.username;
        let email, username,Token;


        try {
            if (!BodyToken && name) {
                email = name.includes("@") ? name : null;
                username = !name.includes("@") ? name : null;
            }

            if (BodyToken) {
                user = await RememberPass.findOne({
                    where: {
                        token: BodyToken
                    }
                });
                //token已经有30天,删除token
                if (user && (new Date() - user.expireTime) / D > 30) {
                    await user.destroy();
                    user = null;
                } else if (user) {
                    user = await db.models.User.findOne({
                        where: {
                            userId: user.userId
                        }
                    })
                }

            } else if (username) {
                user = await db.models.User.findOne({
                    where: {
                        username: username,
                        password: utilx.generatorToken(body.password.toString())
                    }
                });
            } else if (email) {
                user = await db.models.User.findOne({
                    where: {
                        email: email,
                        password: utilx.generatorToken(body.password.toString())
                    }
                })
            }


            if (!user) {
                throw Error("Login Failed");
            }


            let LoginToken = helper.login(ctx, user);
            let rememberMe = body.rememberMe || false;
            //如果用户不选择记住密码，删除token
            if (!rememberMe && body.token) {
                await db.models.RememberPass.destroy({
                    where: {
                        token: body.token
                    }
                });
            } else if (rememberMe) {//如果用户选择记住密码,更新token
                Token = utilx.generatorToken(new Date().getTime().toString());
                //产生新的token
                logger.debug(Token);
                logger.debug(user.userId);
                await db.models.RememberPass.create({
                    token: Token,
                    expireTime: new Date(),
                    userId: user.userId
                });
                //旧的token删除
                if (BodyToken) {
                    await db.models.RememberPass.destroy({
                        where: {
                            token: BodyToken
                        }
                    });
                }
            }
            token = Token;



            responser.success(ctx, {
                token: token || BodyToken,
                LoginToken,
                key: user.key || null,
                userId: user.userId
            });
            //todo:
            EvenImit.emit("user_login");

        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
        }

    });

    router.get("/user/index", async(ctx, next) => {
        let user = await auth.user(ctx);
        responser.success(ctx, user);
    });

    router.get("/loginValidate", async(ctx, next) => {
        logger.debug("/loginValidate");
        let user = ctx.currentUser || (await auth.user(ctx));
        if (user) {
            responser.success(ctx, {
                loginStatus: true
            })
        } else {
            responser.success(ctx, {
                loginStatus: false
            });
        }
    });


    router.post("/logout", async(ctx, next) => {
        logger.debug("/logout");
        await auth.logout(ctx);
        let token = ctx.request.body.token;
        try {
            await RememberPass.destroy({
                where: {
                    token
                }
            });
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }
        responser.success(ctx, {
            loginStatus: false
        });
    });

    router.post("/user/updateKey", async(ctx, next) => {
        logger.debug("/updateKey");
        let key = utilx.getRandomString(32);
        try {
            await User.update(
                {
                    key: key
                },
                {
                    where: {
                        userId: ctx.currentUser.userId
                    }
                }
            )
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }
        responser.success(ctx, {
            key
        });
    });

    router.get("/user/getKey", async(ctx, next) => {
        let key;
        try {
            key = await User.findOne({
                where: {
                    userId: ctx.currentUser.userId
                },
                attributes: ["key"]
            });
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }
        responser.success(ctx, {
            key: key.key
        })
    })
};
