/**
 * Created by webhugo on 16-10-14.
 */
var path = require('path');
var koa = require('koa');
var app = new koa();
var koaValidate = require('koa-validate');
var staticServer = require('koa-static');
var router = require('./router/index');
var koaBody = require('koa-body');
const responser = require('./lib/responser');
const config = require('./config/config');
var logger = require('./log/index').logger;
const render = require("./instance/render");
const auth = require("./helper/auth");


app.use(async(ctx, next) => {
    try {
        let url = ctx.request.url;
        if (/\/api/.test(url)) {//自定义路由
            //todo: 权限过滤
            if (/\/user/.test(url) || /\/device/.test(url) || /\/device/.test(url)
                || /\/sensor/.test(url) || /\/admin/.test(url) || /\/forum/.test(url)) {
                let user = ctx.currentUser || (await auth.user(ctx));
                if (!user) {
                    ctx.redirect("/");
                    return;
                }else{
                    auth.login(ctx,user);//延长过期时间
                }
            }
        }
        logger.debug(url);
        await next();
        if (ctx.body === undefined) {//当和自定义路由不匹配时,而且不是静态文件请求时,返回index.html
            logger.debug("not found");
            ctx.body = await render("index", {});
        }else{

            let url = ctx.request.url;
            if (/\/api/.test(url)) {//自定义路由
                //todo: 权限过滤
                if (/\/user/.test(url) || /\/device/.test(url) || /\/device/.test(url)
                    || /\/sensor/.test(url) || /\/admin/.test(url) || /\/forum/.test(url)) {
                    ctx.body.cookies = {
                        'LoginToken': {
                            value: ctx.currentUser.LoginToken,
                            expires: new Date(new Date().getTime() +1000 * 60 * 30),
                            path: url,
                        }
                    }
                }
            }
        }
    } catch (e) {
        logger.error(e);//在生产模式下把错误输入到文件中
        responser.catchErr(ctx, e);
    }
});
app.use(staticServer(path.join(__dirname, 'public')));
app.use(koaBody());
app.use(koaValidate());
app.use(router.routes());

// 这一行代码一定要在最后一个app.use后面使用
var server = require('http').Server(app.callback());
server.listen(config.server.port);

module.exports = {
    app,
    server
};
//加载的时候要放最后，因为这个文件要加载当前文件
require('./socket/index');