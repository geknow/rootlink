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

router.use(async (ctx, next) => {
    try{
        ctx.render = (path, data) => {
            data = data || {};
            return render(path, data);
        };
        await next();
    }catch (e){
        console.log(e);
        ctx.body = responser.catchErr(ctx,e);
    }
});


utilx.autoImport(__dirname, (tmpPath) => {   // 自动引入
    require(tmpPath)(router);
});

module.exports = router;