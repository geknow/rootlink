/**
 * Created by webhugo on 2/27/17.
 */

const sensorV = require("../../config/config").sensorValue;
const db = require('./../../model/index');
const SensorValue = db.models.SensorValue;
const Sensor = db.models.Sensor;
const Device = db.models.Device;
const responser = require('./../../lib/responser');
const logger = require("../../log/index").logger;

module.exports = router => {
    router.post("/sensor/upload", async(ctx, next) => {

        try {
            logger.debug("/sensor/upload");
            let body = ctx.request.body;
            let sensorId = body.sensorId;


            if (!sensorId) {
                throw Error("sensorId null");
            }

            //查出对应的deviceid
            let DeviceId = await Sensor.findOne({
                where: {
                    sensorId: sensorId
                },
                attributes: ["DeviceId"]
            });

            let senV = {
                SensorId: sensorId,
                DeviceId: DeviceId.DeviceId
            };
            sensorV.forEach(name => {
                senV[name] = body[name];
            });
            console.log("===============================");
            console.log(senV);
            await SensorValue.create(senV);
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }

        responser.success(ctx)
    });

    router.get("/sensor/getValue", async(ctx, next) => {

        let sensorVs;
        try{
            let query = ctx.request.query;
            let sensorId = query.sensorId;
            if(!sensorId){
                throw Error("sensorId 缺失");
            }
            sensorVs = await SensorValue.findAll({
                where: {
                    SensorId: sensorId
                },
                order : [['createdAt', 'DESC']],
                limit: 10//十条记录
            })
        }catch (e){
            logger.error(e);
            responser.catchErr(ctx,e);
            return;
        }
        responser.success(ctx,sensorVs)
    })
};