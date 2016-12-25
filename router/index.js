/**
 * Created by webhugo on 16-10-7.
 */
var Router = require('koa-router');
const router = new Router();
var utilx = require('../lib/utilx')
var render = require('../instance/render');

router.use(async (ctx, next) => {
    try{
        await next();
    }catch (e){
        console.log(e);
        ctx.body = "error";
    }
});

router.use(async (ctx, next) => {
    ctx.render = (path, data) => {
        data = data || {};
        return render(path, data);
    };
    await next();
});

utilx.autoImport(__dirname, (tmpPath) => {   // 自动引入
    require(tmpPath)(router);
});

module.exports = router;