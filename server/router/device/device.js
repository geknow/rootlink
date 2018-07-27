/**
 * Created by webhugo on 12/26/16.
 */
const db = require('./../../model/index');
const Device = db.models.Device;
const Sensor = db.models.Sensor;
const SensorValue = db.models.SensorValue;
const Trigger = db.models.Trigger;
const auth = require('./../../helper/auth');
const responser = require('./../../lib/responser');
const EvenImit = require('../../instance/EvenImit');
const logger = require("../../log/index").logger;
const sensorV = require("../../config/config").sensorValue;
const event = require('../../socket/event');

module.exports = router => {

    router.get("/device/get", async (ctx, next) => {
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
            logger.debug("=================");
            logger.debug(device);
            logger.debug("++++++++");
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
                temp.device = device;
                responser.success(ctx, temp);
            } else {
                responser.success(ctx, device);
            }

        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
        }
    });


    router.get("/device/all", async (ctx, next) => {

        let devices;
        try {
            let user = ctx.currentUser || (await auth.user(ctx));

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

    router.post("/device/add", async (ctx, next) => {
        let device;
        try {
            let body = ctx.request.body;
            let user = ctx.currentUser || (await auth.user(ctx));
            if (!body.name || !body.description) {
                throw Error("参数缺失");
            }
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

    router.post("/device/delete", async (ctx, next) => {
        let count;
        try {
            let body = ctx.request.body;
            let deviceId = body.deviceId;
            logger.debug(deviceId);
            if (!deviceId) {
                throw Error("deviceId null");
            }
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


    router.post("/device/update", async (ctx, next) => {

        let device = {};

        try {
            let body = ctx.request.body;
            let user = ctx.currentUser || (await auth.user(ctx));

            if (!body.deviceId || !body.name || !body.description) {
                throw Error("参数缺失");
            }
            device.name = body.name;
            device.description = body.description;

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
    });

    router.post("/device/upload", async (ctx, next) => {
        try {
            let body = ctx.request.body;
            let deviceId = body.deviceId;
            for (let sensorElement of body.sensor) {

                //查出对应的deviceid
                let DeviceId = await Sensor.findOne({
                    where: {
                        sensorId: sensorElement.sensorId
                    },
                    attributes: ["DeviceId", "unit", "type"]
                });

                let senV = {
                    SensorId: sensorElement.sensorId,
                    DeviceId: deviceId
                };
                sensorV.forEach(name => {
                    senV[name] = sensorElement[name];
                });

                await SensorValue.create(senV);
                senV.unit = DeviceId.unit;
                senV.type = DeviceId.type;
                logger.debug(senV);
                event.emit("new value", senV);
            }
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }
        responser.success(ctx);
    });
};