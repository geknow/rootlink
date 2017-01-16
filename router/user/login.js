/**
 * Created by claim on 16-10-23.
 */
const db = require('./../../model/index');
const helper = require('./../../helper/auth');
const responser = require('./../../lib/responser');
const EvenImit = require('../../instance/EvenImit');

module.exports = router => {

    router.get('/login', async(ctx, next) => {
        ctx.body = await ctx.render("login");
    });

    router.post('/user/login', async(ctx, next) => {
        let body = ctx.request.body;
        let user;
        
        if (body.username)
            user = await db.models.User.findOne({
                where: {
                    username: body.username,
                    password: body.password
                }
            });
      
        if (body.email)
            user = await db.models.User.findOne({
                where: {
                    email: body.email,
                    password: body.password
                }
            });
        
        if (user) {
            let LoginToken = helper.login(ctx, user);
            //noinspection JSValidateTypes
            ctx.redirect("/user/index");
            //todo: 
            EvenImit.emit("user_login");
        } else {
            responser.catchErr(ctx, {
                error: 'Login Failed'
            }, 403);
        }
    });
    
    router.get("/user/index", async (ctx, next) => {
        ctx.body = await ctx.render("dynamics",{}); 
    });
};
