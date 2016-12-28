/**
 * Created by claim on 16-10-23.
 */
const db = require('./../../model/index');
const helper = require('./../../helper/auth');
const responser = require('./../../lib/responser');
const cache = require('../../instance/cache');
const indentifyCode = require("../../lib/identifyCode");

module.exports = router=> {
    
    router.get('/register', async (ctx,next) => {
        ctx.body = await ctx.render("register"); 
    });
    
    router.post('/user/register', async(ctx, next)=> {
        let body = ctx.request.body;
        ctx.checkBody("email").isEmail();
        if(ctx.errors){
            responser.reject(ctx,"邮箱错误");
            return;
        }
        ctx.checkBody("username").notEmpty();
        ctx.checkBody("password").notEmpty();
        if(ctx.errors){
            responser.reject(ctx,"参数不全");
            return;
        }
        let user = {
            username: body.username,
            password: body.password,
            email: body.email,
            avatar: '', //todo : get update avatar
            type: body.type === 'OurEDA_admin' ? 1 : 0
        };
        //todo: 根据user来生成对应路由，只有邮箱验证之后才写入数据库
        let link = indentifyCode.sendMail(JSON.stringify(user));
        // ctx.body = await ctx.render("register",{
        //     link: link
        // });
        responser.success(ctx,link);
    });
};