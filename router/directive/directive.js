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

module.exports = router => {
    router.post("/directive/add", async(ctx, next) => {
        let body = ctx.request.body;
        let operation = body.operation;
        let operationUrl = body.operationUrl;
        let user = ctx.currentUser;
        try {
            let directive = await Directive.findOne({
                where: {
                    UserId: user.id,
                    operation
                }
            });
            if(directive){
                throw Error("operation exist");
            }

            await Directive.create({
                operation,
                operationUrl,
                UserId: user.id
            })
        }catch (e){
            logger.error(e);
            responser.catchErr(ctx,e);
            return;
        }

        responser.success(ctx);
    });

    router.get("/directive/get", async(ctx,next) => {
        let query = ctx.request.query;

        let operation = query.operation;

        let operationUrl;
        try{
           operationUrl = await Directive.findOne({
                where: {
                    operation,
                    UserId: ctx.currentUser.id
                },
                attributes: ["operationUrl"]
            });
        }catch (e){
            logger.error(e);
            responser.catchErr(ctx,e);
            return;
        }
        responser.success(ctx,{
            operationUrl
        })
    });

    router.post("/directive/update",async (ctx,next) => {
        let body = ctx.request.body;

        let operation = body.operation;
        let operaionUrl = body.operationUrl;
        console.log(operation);
        console.log(operaionUrl);
        console.log(ctx.currentUser);
        try{
            await Directive.update({
                operaionUrl
            },{
                where: {
                    operation,
                    UserId: ctx.currentUser.id
                }
            })
        }catch (e){
            logger.error(e);
            responser.catchErr(ctx,e);
            return;
        }
        responser.success(ctx)
    });

    router.post("/directive/delete" ,async (ctx, next) => {
        let body = ctx.request.body;
        let operation = body.operation;
        try{
            await Directive.destroy({
                where: {
                    operation,
                    UserId: ctx.currentUser.id
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