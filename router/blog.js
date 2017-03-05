/**
 * Created by webhugo on 12/25/16.
 */
const db = require('./../model/index');
const auth = require('./../helper/auth');
const responser = require('./../lib/responser');
const Blog = db.models.Blog;
const logger = require("../log/index").logger;

module.exports = router => {
    /**
     * 参数 page 第几页  count 数量
     */
    router.get("/blog/index", async(ctx, next) => {

        let list;
        try {
            let query = ctx.query;

            let conditions = {
                where: {}
            };

            let page = parseInt(query.page);
            page = page || 1;
            let count = parseInt(query.count);
            count = count || 10;

            conditions.limit = count;
            conditions.offset = (page - 1) * count;
            conditions.order = [['createdAt', 'DESC']];
            list = await Blog.findAll(conditions);
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }
        responser.success(ctx, list);
    });
    
    router.post("/admin/blog/add", async (ctx, next) => {

        try{
            let user = await auth.user(ctx);
            if(!user || user.type !== 1){
                throw Error("权限不够");
            }
            let body = ctx.request.body;
            let text = body.text;
            let time = body.time;
            let title = body.title;
            let label = body.label;
            await Blog.create({
                text,
                title,
                time,
                label
            });
        }catch (e){
            logger.error(e);
            responser.catchErr(ctx,e);
            return;
        }

        responser.success(ctx);
    });
};