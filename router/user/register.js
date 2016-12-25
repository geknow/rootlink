/**
 * Created by claim on 16-10-23.
 */
const db = require('./../../model/index');
const helper = require('./../../helper/auth');
const responser = require('./../../lib/responser');

module.exports = router=> {
    router.post('/user/add', async(ctx, next)=> {
        let body = ctx.request.body;
        let error;
        let user = await db.models.User.create({
            username: body.username,
            password: body.password,
            email: body.email || 'NULL',
            avatar: '', //todo : get update avatar
            type: body.type === 'OurEDA_admin' ? 1 : 0
        }).catch(err=> {
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
        await next();
    });
};