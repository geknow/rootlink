/**
 * Created by claim on 16-12-11.
 */
// const db = require('./../../model/index');
// const helper = require('./../../helper/auth');
// const responser = require('./../../lib/responser');
// const sender = require('./../../lib/identifyCode');
// const cache = require('./../../instance/cache');
module.exports = router => {
    // router.post('/user/validate/email', async(ctx, next) => { //用邮件地址验证
    //     let body = ctx.request.body;
    //     let user;
    //     let error;
    //     if (body.email)
    //         user = await db.models.findOne({
    //             email: body.email
    //         }).catch(err => {
    //             error = err;
    //         });
    //     if (body.username)
    //         user = await db.models.findOne({
    //             username: body.username
    //         }).catch(err => {
    //             error = err;
    //         });
    //     if (user) {
    //         let email = user.getDataValue("email");
    //         let code = sender.sendMail(email);
    //         cache.set(email, code);
    //     } else {
    //         let errorInfo;
    //         if (error && /SequelizeUniqueConstraintError/.test(error.toString())) {
    //             errorInfo = 'User does not exist';
    //         }
    //         if (errorInfo)
    //             responser.reject(ctx, errorInfo, 403);
    //         else
    //             responser.catchErr(ctx, error, 500);
    //     }
    //     await next();
    // });
    // router.post('/user/validate/mobile', async(ctx, next) => { //用手机号码验证
    //     let body = ctx.request.body;
    //     let user;
    //     let error;
    //     if (body.mobile)
    //         user = await db.models.findOne({
    //             mobile: body.mobile
    //         }).catch(err => {
    //             error = err;
    //         });
    //     if (body.username)
    //         user = await db.models.findOne({
    //             username: body.username
    //         }).catch(err => {
    //             error = err;
    //         });
    //     if (user) {
    //         let mobile = user.getDataValue("mobile");
    //         let code = sender.sendTextMessage(mobile);
    //         cache.set(mobile, code);
    //     } else {
    //         let errorInfo;
    //         if (error && /SequelizeUniqueConstraintError/.test(error.toString())) {
    //             errorInfo = 'User does not exist';
    //         }
    //         if (errorInfo)
    //             responser.reject(ctx, errorInfo, 403);
    //         else
    //             responser.catchErr(ctx, error, 500);
    //     }
    //     await next();
    // });
    //todo:If mobile is used
    //todo:If mail address is used
    //todo:Change info
    //todo:Check passed
};