/**
 * Created by webhugo on 12/26/16.
 */
const db = require('./../../model/index');
const Sensor = db.models.Sensor;
const auth = require('./../../helper/auth');
const responser = require('./../../lib/responser');
const EvenImit = require('../../instance/EvenImit');
const config = require('../../config/config');
const type = require("./../../name.json").type;
const isEmptyObject = require("../../lib/utilx").isEmptyObject;
const SensorValue = db.models.SensorValue;
const logger = require("../../log/index").logger;

module.exports = router => {
    router.get("/sensor/all", async(ctx, next) => {
        let deviceId = ctx.request.query.deviceId;
        logger.debug(deviceId);
        logger.debug("----------")
        let sensors;
        try {
            sensors = await Sensor.findAll({
                where: {
                    DeviceId: deviceId
                }
            });
        } catch (e) {
            logger.debug(e);
            responser.catchErr(ctx, e);
            return;
        }
        responser.success(ctx, sensors);
    });

    router.post("/sensor/add", async(ctx, next) => {
        let body = ctx.request.body;
        let ok = false;
        type.forEach((name) => {
            if (name == body.name)
                ok = true;
        });
        if (!ok) {
            responser.catchErr(ctx, "类型错误");
            return;
        }
        let sensor = {
            name: body.name,
            unit: body.name === "GPS" ? null : body.unit,
            description: body.description,
            DeviceId: body.deviceId,
            UserId: ctx.currentUser.userId
        };
        logger.debug(sensor);
        try {
            sensor = await Sensor.create(sensor)
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }
        responser.success(ctx, sensor);
    });

    router.post("/sensor/delete", async(ctx, next) => {
        let body = ctx.request.body;
        let sensorId = body.sensorId;
        let count;
        try {
            count = await Sensor.destroy({
                where: {
                    sensorId
                }
            });
            await SensorValue.destroy({
                where: {
                    SensorId: sensorId
                }
            })
        } catch (e) {
            responser.catchErr(ctx, e);
            return;
        }
        if (!count) {
            responser.reject(ctx, "sensorId 错误");
            return;
        }
        responser.success(ctx, count);
    });

    router.post("/sensor/update", async(ctx, next) => {
        let body = ctx.request.body;
        let ok = false;
        type.forEach((name) => {
            if (name == body.name)
                ok = true;
        });
        if (!ok) {
            responser.catchErr(ctx, "类型错误");
            return;
        }
        let sensor = {};

        body.name ? sensor.name = body.name : null;
        body.unit === "GPS" ? sensor.unit = body.unit : null;
        body.description ? sensor.description = body.description : null;
        body.DeviceId ? sensor.DeviceId = body.DeviceId : null;
        sensor.UserId = ctx.currentUser.id;

        if (isEmptyObject(sensor)) {
            responser.reject(ctx, "参数缺失");
            return;
        }
        try {
            sensor = await Sensor.create(sensor)
        } catch (e) {
            responser.catchErr(ctx, e);
            return;
        }
        responser.success(ctx, sensor);
    });
};