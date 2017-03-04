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
    router.get("/device/all", async(ctx, next) => {
        let user = ctx.currentUser;
        user = user || (await auth.user(ctx));
        if (!user) {
            responser.reject(ctx, "没登录");
            return;
        }
        // let user = {id: 1}; //测试
        let devices;
        try {
            devices = await Device.findAll({
                where: {
                    UserId: user.userId
                }
            });
        } catch (e) {
            responser.catchErr(ctx, e);
            return;
        }
        responser.success(ctx, devices);
    });

    router.post("/device/add", async(ctx, next) => {
        let body = ctx.request.body;
        let user = ctx.currentUser || (await auth.user(ctx));
        let device;
        try {
            device = await Device.create({
                name: body.name,
                description: body.description,
                UserId: user.id
            })
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
        }
        responser.success(ctx, device);
    });

    router.post("/device/delete", async(ctx, next) => {
        let body = ctx.request.body;
        let deviceId = body.deviceId;
        console.log(deviceId);
        let count;
        try {
            count = await Device.destroy({
                where: {
                    deviceId: deviceId
                }
            });
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
        if (!count) {
            responser.reject(ctx, "deviceId 错误");
            return;
        }
        responser.success(ctx, count);
    });


    router.post("/device/update", async(ctx, next) => {
        let body = ctx.request.body;
        let user = ctx.currentUser || (await auth.user(ctx));
        let error;
        let device = {};
        body.name ? device.name = body.name : null;
        body.description ? device.description = body.description : null;
        if (isEmptyObject(device)) {
            responser.reject(ctx, "nothing update");
            return;
        }
        try {
            device = await Device.update(device, {
                where: {
                    UserId: user.id,
                    DeviceId: body.deviceId
                }
            })
        } catch (e) {
            error = e;
        }
        if (error) {
            logger.error(error);
            responser.catchErr(ctx, error);
        } else
            responser.success(ctx, device);
    })
};