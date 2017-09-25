/**
 * Created by webhugo on 12/26/16.
 */
const db = require('./../../model/index');
const Sensor = db.models.Sensor;
const auth = require('./../../helper/auth');
const responser = require('./../../lib/responser');
const EvenImit = require('../../instance/EvenImit');
const type = require("./../../name.json").type;
const SensorValue = db.models.SensorValue;
const logger = require("../../log/index").logger;

module.exports = router => {
    router.get("/sensor/all", async (ctx, next) => {

        let sensors;
        try {
            let deviceId = ctx.request.query.deviceId;
            logger.debug(deviceId);
            logger.debug("----------");
            if (!deviceId) {
                throw Error("deviceId null");
            }
            sensors = await Sensor.findAll({
                where: {
                    DeviceId: deviceId
                },
                include: [{
                    model: SensorValue,
                    order: [["createdAt"]],
                    required: false,
                    limit: 1
                }]
            });
        } catch (e) {
            logger.debug(e);
            responser.catchErr(ctx, e);
            return;
        }
        responser.success(ctx, sensors);
    });

    router.post("/sensor/add", async (ctx, next) => {
        let sensor;

        try {
            let body = ctx.request.body;
            let ok = false;
            type.forEach((Name) => {
                if (Name == body.name)
                    ok = true;
            });
            if (!ok) {
                throw Error("类型错误");
            }
            if (!body.deviceId || !body.description) {
                throw Error("参数缺失");
            }
            sensor = {
                name: body.name,
                unit: body.name === "GPS" ? null : body.unit,
                description: body.description,
                DeviceId: body.deviceId,
                UserId: ctx.currentUser.userId
            };
            logger.debug(sensor);

            sensor = await Sensor.create(sensor)
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }
        responser.success(ctx, sensor);
    });

    router.post("/sensor/delete", async (ctx, next) => {

        let count;
        try {
            let body = ctx.request.body;
            let sensorId = body.sensorId;
            if (!sensorId) {
                throw Error("sensorId null");
            }
            count = await Sensor.destroy({
                where: {
                    sensorId
                }
            });
            if (!count) {
                throw Error("sensorId 错误");
            }

            await SensorValue.destroy({
                where: {
                    SensorId: sensorId
                }
            })
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }

        responser.success(ctx, count);
    });

    router.post("/sensor/update", async (ctx, next) => {
        let sensor = {};
        try {
            let body = ctx.request.body;
            let ok = false;
            type.forEach((Name) => {
                if (Name == body.name)
                    ok = true;
            });
            if (!ok) {
                throw Error("类型错误");
            }
            if (!body.name || !body.unit || !body.description || !body.deviceId || !body.sensorId) {
                throw Error("参数缺失");
            }
            sensor.name = body.name;
            sensor.unit = body.unit;
            sensor.description = body.description;
            sensor.DeviceId = body.deviceId;
            sensor.UserId = ctx.currentUser.id;

            await Sensor.update(sensor, {
                where: {
                    sensorId: body.sensorId,
                    UserId: ctx.currentUser.userId
                }
            })
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }
        responser.success(ctx, sensor);
    });
};