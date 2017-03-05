/**
 * Created by webhugo on 17-2-27.
 */

const db = require('./../../model/index');
const Trigger = db.models.Trigger;
const responser = require('./../../lib/responser');
const logger = require("../../log/index").logger;

module.exports = router => {
    router.get("/trigger/status", async(ctx, next) => {
        let query = ctx.request.query;
        let triggerId = query.triggerId;
        let q = query.q;
        let trigger;

        try {
            if (!ctx.currentUser.userId || !triggerId) {
                throw Error("triggerId is null");
            }
            trigger = await Trigger.findOne({
                where: {
                    triggerId,
                    UserId: ctx.currentUser.userId
                }
            })
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }
        if (q) {
            responser.success(ctx, {
                status: trigger.status ? 1 : 0
            });
        } else {
            responser.success(ctx, {
                trigger
            });
        }
    });


    router.post("/trigger/add", async(ctx, next) => {
        let name = ctx.request.body.name;
        let status = ctx.request.body.status || false;
        let deviceId = ctx.request.body.deviceId;

        let trigger;

        try {
            if (!name || !ctx.currentUser.userId || !deviceId) {
                throw Error("name or deviceId null")
            }
            trigger = await Trigger.create({
                name,
                UserId: ctx.currentUser.userId,
                status: status,
                DeviceId: deviceId
            })
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }

        responser.success(ctx, {
            trigger
        });


    });

    router.post("/trigger/delete", async(ctx, next) => {
        let triggerId = ctx.request.body.triggerId;
        try {
            await Trigger.destroy({
                where: {
                    UserId: ctx.currentUser.userId,
                    triggerId: triggerId
                }
            })
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }

        responser.success(ctx);
    });

    router.post("/trigger/control", async(ctx, next) => {
        let status = ctx.request.body.status;
        let triggerId = ctx.request.body.triggerId;

        if ((status === 0 || status === 1 ) && ctx.currentUser.userId) {
            try {
                status = parseInt(status);
                await Trigger.update({
                    status: status === 1
                }, {
                    where: {
                        triggerId: triggerId,
                        UserId: ctx.currentUser.userId
                    }
                })
            } catch (e) {
                responser.catchErr(ctx, e);
                return;
            }

            responser.success(ctx, {
                status: status === 1
            });
            return;
        }
        logger.error("status error");
        responser.reject(ctx, "status error");
    });
};