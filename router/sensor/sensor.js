/**
 * Created by webhugo on 12/26/16.
 */
const db = require('./../../model/index');
const Sensor = db.models.Sensor;
const auth = require('./../../helper/auth');
const responser = require('./../../lib/responser');
const EvenImit = require('../../instance/EvenImit');
const config = require('../../config/config');


module.exports = router => {
    router.get("/sensor/all", async(ctx, next) => {
        let deviceId = ctx.request.query.deviceId;
        let error;
        let sensors;
        try {
            sensors = await Sensor.findAll({
                where: {
                    DeviceId: deviceId
                }
            });
            sensors.forEach((sensor) => {
                config.sensorsValue.forEach((i) => {
                    if (sensor["value" + i])
                        return;
                    delete sensor["value" + i];
                })
            })
        } catch (e) {
            error = e;
        }
        if (error) {
            responser.catchErr(ctx, error);
            return;
        }
        responser.success(ctx, sensors);
    });

    router.post("/sensor/add", async(ctx, next) => {
        let body = ctx.request.body;
        let error;
        let sensor = {
            name: body.name,
            label: body.label,
            value: body.value,
            description: body.description,
            DeviceId: body.deviceId
        };
        config.sensorsValue.forEach((ele) => {
            if (body["value" + ele]) {
                sensor["value" + ele] = body["value" + ele];
            }
        });
        try {
            sensor = await Sensor.create(sensor)
        } catch (e) {
            error = e;
        }
        if (error) {
            responser.catchErr(ctx, "参数缺失");
            return;
        } else
            responser.success(ctx, sensor);
    });

    router.post("/sensor/delete", async(ctx, next) => {
        let body = ctx.request.body;
        let sensorId = body.sensorId;
        let count;
        let error;
        try {
            count = await Sensor.destroy({
                where: {
                    id: sensorId
                }
            })
        } catch (e) {
            error = e;
        }
        if (error) {
            responser.catchErr(ctx, error);
            return;
        } else if (!count) {
            responser.reject(ctx, "token 错误");
            return;
        }
        responser.success(ctx, count);
    });
};