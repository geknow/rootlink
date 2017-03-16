/**
 * Created by webhugo on 12/28/16.
 */
const db = require('./../../model/index');
const User = db.models.User;
const Device = db.models.Device;
const Sensor = db.models.Sensor;
const Directive = db.models.Directive;
const auth = require('./../../helper/auth');
const responser = require('./../../lib/responser');
const EvenImit = require('../../instance/EvenImit');
const logger = require("../../log/index").logger;
const utilx = require("../../lib/utilx");
const jointStr = utilx.jointStr;

module.exports = router => {
    router.get("/:str",async (ctx, next) => {
        let str = ctx.params.str;
        logger.debug(str);
        str = utilx.getStrInfo(str);
        logger.debug(str);
        ctx.redirect(str)
    });


    router.post("/directive/add", async(ctx, next) => {
        let operationUrl;
        try {
            let body = ctx.request.body;
            let triggerId = body.triggerId;
            let u = await User.findOne({
                where: {
                    userId: ctx.currentUser.userId
                },
                attributes: ["key"]
            });
            let key = u.key;

            let status = body.status;
            status = parseInt(status);
            if((status !== 0 && status !== 1 ) || !triggerId){
                throw Error("参数缺失或错误");
            }

            let operation = body.operation;
            let user = ctx.currentUser;
            let directive = await Directive.findOne({
                where: {
                    UserId: user.userId,
                    operation
                }
            });
            if(directive){
                throw Error("operation exist");
            }
            operationUrl = jointStr(status,triggerId,key);
            await Directive.create({
                operation,
                operationUrl,
                UserId: user.userId
            })
        }catch (e){
            logger.error(e);
            responser.catchErr(ctx,e);
            return;
        }

        responser.success(ctx,operationUrl);
    });

    router.get("/directive/all", async(ctx,next) => {

        let operations;
        try{
           operations = await Directive.findOne({
                where: {
                    UserId: ctx.currentUser.userId
                }
            });
        }catch (e){
            logger.error(e);
            responser.catchErr(ctx,e);
            return;
        }
        responser.success(ctx,{
            operations
        })
    });

    router.post("/directive/update",async (ctx,next) => {
        let operationUrl;
        try{
            let body = ctx.request.body;

            let operation = body.operation;

            let status = body.status;
            let triggerId = body.triggerId;
            let u = await User.findOne({
                where: {
                    userId: ctx.currentUser.userId
                },
                attributes: ["key"]
            });
            let key = u.key;
            status = parseInt(status);
            if((status !== 0 && status !== 1 ) || !triggerId){
                throw Error("参数缺失或错误");
            }

            operationUrl = jointStr(status,triggerId,key);

            await Directive.update({
                operationUrl
            },{
                where: {
                    operation,
                    UserId: ctx.currentUser.userId
                }
            })
        }catch (e){
            logger.error(e);
            responser.catchErr(ctx,e);
            return;
        }
        responser.success(ctx,operationUrl)
    });

    router.post("/directive/delete" ,async (ctx, next) => {

        try{
            let body = ctx.request.body;
            let operation = body.operation;

            await Directive.destroy({
                where: {
                    operation,
                    UserId: ctx.currentUser.userId
                }
            })
        }catch (e){
            logger.error(e);
            responser.catchErr(ctx,e);
            return;
        }
        responser.success(ctx);
    })
};