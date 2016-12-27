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

app.use(async(ctx, next)=> {
    try {
        await next();
    } catch (e) {
        //logger.error(e);//在生产模式下把错误输入到文件中
        responser.catchErr(ctx, e);
    }
});
app.use(staticServer(path.join(__dirname, 'public')));
// app.use(koaBody());
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