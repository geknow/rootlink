/**
 * Created by webhugo on 12/25/16.
 */
const db = require('./../model/index');
const auth = require('./../helper/auth');
const responser = require('./../lib/responser');
const Blog = db.models.Blog;
const utilx = require('../lib/utilx');

module.exports = router => {
    /**
     * 参数 page 第几页  count 数量
     */
    router.get("/blog/index", async(ctx, next) => {
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
        conditions.order = [['createdAt', 'DESC']]
        
        try {
            var list = await Blog.findAll(conditions);
        } catch (e) {
            responser.catchErr(ctx, e);
            return;
        }
        responser.success(ctx, {
            list: list
        });
    });
    
    router.post("/blog/add", async (ctx, next) => {
        let user = await auth.user(ctx);
        if(!user || user.type !== 1){
            responser.reject(ctx,"权限不够");
            return;
        }
        let body = ctx.request.body;
        let text = body.text;
        let error;
        try{
            await Blog.create({
                text: text
            });
        }catch (e){
            error = e;
        }
        if(error){
            responser.catchErr(ctx,error);
            return;
        }
        responser.success(ctx);
    });
};