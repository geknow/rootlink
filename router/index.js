/**
 * Created by webhugo on 16-10-7.
 */
var Router = require('koa-router');
const router = new Router({
    prefix: '/api'
});
const utilx = require('../lib/utilx');
const render = require('../instance/render');
const responser = require("../lib/responser");
const logger = require("../log/index").logger;
const auth = require("../helper/auth");

router.use(async (ctx, next) => {
    try{
        ctx.render = (path, data) => {
            data = data || {};
            return render(path, data);
        };
        await next();
    }catch (e){
        logger.debug(e);
        ctx.body = responser.catchErr(ctx,e);
    }
});

//不知道为什么get方法放在/user/login.js会出错
router.get("/loginValidate", async(ctx, next) => {
    logger.debug("/loginValidate/");
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

utilx.autoImport(__dirname, (tmpPath) => {   // 自动引入
    require(tmpPath)(router);
});

module.exports = router;