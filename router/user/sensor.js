/**
 * Created by webhugo on 12/26/16.
 */
const db = require('./../../model/index');
const Sensor = db.models.Sensor;
const Device = db.models.Device;
const auth = require('./../../helper/auth');
const responser = require('./../../lib/responser');
const EvenImit = require('../../instance/EvenImit');


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
        let sensor;
        try {
            sensor = await Sensor.create({
                name: body.name,
                label: body.label,
                description: body.description,
                DeviceId: body.deviceId
            })
        } catch (e) {
            error = e;
        }
        if (error) {
            responser.catchErr(ctx, "参数缺失");
            return;
        } else
            responser.success(ctx,sensor);
    });

    router.post("/sensor/delete", async(ctx, next) => {
        let body = ctx.request.body;
        let sensorId = body.sensorId;
        let count;
        let error;
        try{
            count = await Sensor.destroy({
                where: {
                    id: sensorId
                }
            })
        }catch (e){
            error = e;
        }
        if(error) {
            responser.catchErr(ctx,error);
            return;
        }else if(!count){
            responser.reject(ctx,"token 错误");
            return;
        }
        responser.success(ctx,count);
    });
};