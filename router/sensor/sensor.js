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
            label: body.label,
            unit: body.name === "GPS" ? null : body.unit,
            description: body.description,
            DeviceId: body.deviceId
        };
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
            responser.reject(ctx, "sensorId 错误");
            return;
        }
        responser.success(ctx, count);
    });
};