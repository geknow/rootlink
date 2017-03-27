/**
 * Created by webhugo on 12/26/16.
 */
const db = require('./../../model/index');
const User = db.models.User;
const Device = db.models.Device;
const Sensor = db.models.Sensor;
const SensorValue = db.models.SensorValue;
const Trigger = db.models.Trigger;
const auth = require('./../../helper/auth');
const responser = require('./../../lib/responser');
const EvenImit = require('../../instance/EvenImit');
const logger = require("../../log/index").logger;
const isEmptyObject = require("../../lib/utilx").isEmptyObject;

module.exports = router => {

    router.get("/device/get", async(ctx, next) => {
        let query = ctx.query;
        let deviceId = query.deviceId;
        let startT = query.startTime;
        let endT = query.endTime;
        let device;
        let sensorV;
        var temp = {};
        try {
            device = await Device.findOne({
                where: {
                    deviceId
                }
            });
            if (!!startT && !!endT) {
                startT = parseInt(startT);
                endT = parseInt(endT);

                startT = new Date(startT);
                endT = new Date(endT);

                sensorV = await SensorValue.findAll({
                    where: {
                        DeviceId: deviceId,
                        $and: [
                            {
                                createdAt: {
                                    $gte: startT
                                }
                            },
                            {
                                createdAt: {
                                    $lte: endT
                                }
                            }
                        ]
                    }
                });
                temp.sensorValue = sensorV;
            }
            temp.device = device;

            responser.success(ctx, temp);
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
        }
    });


    router.get("/device/all", async(ctx, next) => {

        let devices;
        try {
            let user = ctx.currentUser;
            logger.debug(user);
            user = user || (await auth.user(ctx));
            if (!user) {
                throw Error("没登录");
            }
            devices = await Device.findAll({
                where: {
                    UserId: user.userId
                }
            });
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }
        responser.success(ctx, devices);
    });

    router.post("/device/add", async(ctx, next) => {
        let device;
        try {
            let body = ctx.request.body;
            let user = ctx.currentUser || (await auth.user(ctx));

            device = await Device.create({
                name: body.name,
                description: body.description,
                UserId: user.userId
            })
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }
        responser.success(ctx, device);
    });

    router.post("/device/delete", async(ctx, next) => {
        let count;
        try {
            let body = ctx.request.body;
            let deviceId = body.deviceId;
            logger.debug(deviceId);

            count = await Device.destroy({
                where: {
                    deviceId: deviceId
                }
            });

            if (!count) {
                throw Error("deviceId 错误");
            }

            await Sensor.destroy({
                where: {
                    DeviceId: deviceId
                }
            });
            await SensorValue.destroy({
                where: {
                    DeviceId: deviceId
                }
            });
            await Trigger.destroy({
                where: {
                    DeviceId: deviceId
                }
            })


        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }
        responser.success(ctx, count);
    });


    router.post("/device/update", async(ctx, next) => {

        let device = {};

        try {
            let body = ctx.request.body;
            let user = ctx.currentUser || (await auth.user(ctx));

            body.name ? device.name = body.name : null;
            body.description ? device.description = body.description : null;

            if (isEmptyObject(device)) {
                throw Error("nothing update");
            }

            device = await Device.update(device, {
                where: {
                    UserId: user.userId,
                    deviceId: body.deviceId
                }
            })
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }

        responser.success(ctx, device);
    })
};