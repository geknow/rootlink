/**
 * Created by webhugo on 16-10-7.
 */
var Router = require('koa-router');
const router = new Router();
const utilx = require('../lib/utilx');
const auth = require('../helper/auth');
const render = require('../instance/render');

router.use(async (ctx, next) => {
    try{
        await next();
    }catch (e){
        console.log(e);
        ctx.body = "error";
    }
});

router.use(async (ctx, next) => {
    // todo: 权限过滤
    let url = ctx.request.url;
    let user = ctx.currentUser || auth.user(ctx);
    //内测中，暂时不需要
    // if(/\/user/.test(url)){
    //     if(!user){
    //         ctx.redirect("/login");
    //         return;
    //     }
    // }
    
    ctx.render = (path, data) => {
        data = data || {};
        return render(path, data);
    };
    await next();
});
router.get("/", async (ctx, next) => {
    ctx.body = await ctx.render("login");
});
utilx.autoImport(__dirname, (tmpPath) => {   // 自动引入
    require(tmpPath)(router);
});

module.exports = router;