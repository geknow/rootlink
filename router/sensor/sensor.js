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
                    order: [["createdAt","DESC"]],
                    required: false,
                    limit: 1
                }]
            });
            for (let i = 0; i< sensors.length; i++){
                let sensor = sensors[i];
                if(!!sensor["SensorValues"] && sensor["SensorValues"].length !== 0){
                    sensor["dataValues"]["value1"] = sensor["SensorValues"][0]["dataValues"]["value1"];
                    sensor["dataValues"]["value2"] = sensor["SensorValues"][0]["dataValues"]["value2"];
                }
                delete sensor["dataValues"]["SensorValues"];
            }
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
                if (Name == body.type)
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
                type: body.type,
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
                if (Name == body.type)
                    ok = true;
            });
            if (!ok) {
                throw Error("类型错误");
            }
            if (!body.name || !body.unit || !body.description || !body.deviceId || !body.sensorId) {
                throw Error("参数缺失");
            }
            sensor.name = body.name;
            sensor.type = body.type;
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