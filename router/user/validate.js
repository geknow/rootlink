/**
 * Created by claim on 16-12-11.
 */
const db = require('./../../model/index');
const helper = require('./../../helper/auth');
const responser = require('./../../lib/responser');
const sender = require('./../../lib/identifyCode');
const utilx = require('../../lib/utilx');
const cache = require('../../instance/cache');

module.exports = router => {
    /**
     * 邮箱验证之后，解密得到user，再写入数据库
     */
    router.get('/validate/email/:link', async(ctx, next) => { //用邮件地址验证
        let link = ctx.params.link;
        console.log(link);
        let user = await cache.jget(link);
        // let user = utilx.getTokenInfo(decodeURI(link));
        console.log(user);
        user = JSON.parse(user);
        console.log(user);
        let error;
        user = await db.models.User.create(user).catch(err=> {
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