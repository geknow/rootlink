/**
 * Created by webhugo on 16-10-18.
 */

const db = require('../../model/index');
const Post = db.models.Post;
const Reply = db.models.Reply;

const auth = require('../../helper/auth');
const logger = require("../../log/index").logger;
const responder = require("../../lib/responser");


var fs = require('fs');
var os = require('os');
var path = require('path');
var multer = require('koa-multer');
var URL = require('url');
var url = require('../../config/config').url;


module.exports = router => {
    // /**
    //  * 参数 page 第几页  count 数量
    //  */
    // router.get('/forum/index', async function (ctx, next) {
    //     logger.debug('/forum/index');
    //     var query = ctx.query;
    //
    //     var conditions = {
    //         where: {}
    //     };
    //
    //     var page = parseInt(query.page);
    //     page = page || 1;
    //     var count = parseInt(query.count);
    //     count = count || 10;
    //
    //
    //     conditions.limit = count;
    //     conditions.offset = (page - 1) * count;
    //
    //     conditions.order = [['createdAt', 'DESC']];
    //     conditions.include = [
    //         {
    //             model: db.models.User,
    //             attributes: ['avatar', 'username']
    //         }
    //     ];
    //
    //     var list = await Post.findAll(
    //         conditions
    //     );
    //
    //     responder.success(ctx, list);
    // });
    // /**
    //  * 获取该帖子所有回复
    //  */
    // router.get('/forum/getComment', async function (ctx, next) {
    //     logger.debug('/forum/getComment');
    //     var query = ctx.query;
    //
    //     var id = query.id;
    //
    //     if (!id || id == undefined) {
    //         responder.reject(ctx, "id is null");
    //         return;
    //     }
    //     try {
    //         var list = await Reply.findAll({
    //             where: {
    //                 PostId: id
    //             },
    //             include: [
    //                 {
    //                     model: db.models.User,
    //                     attributes: ['avatar', 'username']
    //                 }
    //             ]
    //         })
    //     } catch (err) {
    //         responder.catchErr(ctx, "没有该帖子");
    //         return;
    //     }
    //     responder.success(ctx, list);
    // });
    // /**
    //  * 发帖,text是内容,userId是发帖人的id
    //  */
    // router.post('/forum/addTopic', async(ctx, next) => {
    //     logger.debug('/user/addTopic');
    //     let body = ctx.request.body;
    //
    //     let text = body.text;
    //
    //     let user = await auth.user(ctx);
    //
    //     let error;
    //
    //     try {
    //         let post = await Post.create({
    //             text: text,
    //             UserId: user.id
    //         });
    //         let msg = {
    //             text: text,
    //             UserId: user.id,
    //             PostId: post.id
    //         };
    //
    //         responder.success(ctx, msg);
    //     } catch (e) {
    //         error = e;
    //     }
    //     if (error) {
    //         responder.catchErr(ctx, error);
    //         return;
    //     }
    //
    // });
    // /**
    //  * 回帖,text是内容,type是类型,1是回复帖头,2是回复帖子,    uId是回复的帖子的id
    //  */
    // router.post('/forum/addComment', async(ctx, next) => {
    //     let body = ctx.request.body;
    //     let text = body.text;
    //     let id = body.id;
    //     let type = body.type;
    //
    //     if (!text || !id) {
    //         responder.reject(ctx, "参数不齐全");
    //         return;
    //     }
    //
    //     var user = await auth.user(ctx);
    //
    //     if (user) {
    //         let error;
    //         try {
    //             var reply = await Reply.create({
    //                 text: text,
    //                 PostId: id,
    //                 type: type,
    //                 UserId: user.id
    //             });
    //         } catch (e) {
    //             error = e;
    //         }
    //         let msg = {
    //             UserId: user.id,
    //             id: reply.id
    //         };
    //         if (!error) {
    //             responder.success(ctx, msg);
    //             return;
    //         }
    //     }
    //     responder.reject(ctx);
    // })
};