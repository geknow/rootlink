/**
 * Created by webhugo on 17-2-27.
 */

const db = require('./../../model/index');
const Trigger = db.models.Trigger;
const responser = require('./../../lib/responser');

module.exports = router => {
    router.get("/trigger/status", async(ctx, next) => {
        let query = ctx.request.query;
        let triggerId = query.triggerId;
        let trigger, error;
        if (ctx.currentUser.id && triggerId) {
            try {
                trigger = await Trigger.findOne({
                    where: {
                        id: triggerId,
                        UserId: ctx.currentUser.id
                    }
                })
            } catch (e) {
                error = e;
            }
            if (error) {
                responser.catchErr(ctx, error);
            } else {
                responser.success(ctx, {
                    trigger
                })
            }
        }
    });

    router.post("/trigger/add", async(ctx, next) => {
        let name = ctx.request.body.name;
        let status = ctx.request.body.status || false;
        let error, trigger;
        if (name && ctx.currentUser.id) {
            try {
                trigger = await Trigger.create({
                    name,
                    UserId: ctx.currentUser.id,
                    status: status
                })
            } catch (e) {
                error = e;
            }
            if (error) {
                responser.catchErr(ctx, error);
            } else {
                responser.success(ctx, {
                    trigger
                })
            }
        }
    });

    router.post("/trigger/delete", async(ctx, next) => {
        let triggerId = ctx.request.body.triggerId;
        let error;
        try {
            await Trigger.destroy({
                where: {
                    UserId: ctx.currentUser.id,
                    id: triggerId
                }
            })
        } catch (e) {
            error = e;
        }

        if (error) {
            responser.catchErr(ctx, error);
        } else {
            responser.success(ctx);
        }
    });

    router.post("/trigger/control", async(ctx, next) => {
        let status = ctx.request.body.status;
        let triggerId = ctx.request.body.triggerId;

        let error, trigger;
        if ((status === 0 || status === 1 ) && ctx.currentUser.id) {
            try {
                status = parseInt(status);
                trigger = await Trigger.update({
                    status: status === 1
                }, {
                    where: {
                        id: triggerId,
                        UserId: ctx.currentUser.id
                    }
                })
            } catch (e) {
                error = e;
            }

            if (error) {
                responser.catchErr(ctx, error);
            } else {
                responser.success(ctx, {
                    status: status === 1
                });
            }
        }
    });
};