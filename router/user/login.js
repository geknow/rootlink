/**
 * Created by claim on 16-10-23.
 */
const db = require('./../../model/index');
const helper = require('./../../helper/auth');
const responser = require('./../../lib/responser');
const EvenImit = require('../../instance/EvenImit');
const logger = require("../../log/index").logger;

module.exports = router => {

    router.get('/login', async(ctx, next) => {
        responser.success(ctx);
    });

    router.post('/login', async(ctx, next) => {
        logger.debug("/api/login");
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
            responser.success(ctx);
            //todo: 
            EvenImit.emit("user_login");
        } else {
            logger.error();
            responser.catchErr(ctx, {
                error: 'Login Failed'
            }, 403);
        }
    });
    
    router.get("/user/index", async (ctx, next) => {
        let user = await auth.user(ctx);
        responser.success(ctx,user);
    });
};
