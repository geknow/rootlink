/**
 * Created by webhugo on 2/27/17.
 * @modify by liuchaorun on 4/16/2018
 */

const sensorV = require("../../config/config").sensorValue;
const db = require('./../../model/index');
const SensorValue = db.models.SensorValue;
const Sensor = db.models.Sensor;
const responser = require('./../../lib/responser');
const event = require('../../socket/event');
const logger = require("../../log/index").logger;

module.exports = router => {
    router.post("/sensor/upload", async(ctx, next) => {

        try {
            logger.debug("/sensor/upload");
            let body = ctx.request.body;
            let sensorId = body.sensorId;
            logger.debug(body);
            if (!sensorId) {
                throw Error(JSON.stringify(body));
            }

            //查出对应的deviceid
            let DeviceId = await Sensor.findOne({
                where: {
                    sensorId: sensorId
                },
                attributes: ["DeviceId","unit","type"]
            });

            let senV = {
                SensorId: sensorId,
                DeviceId: DeviceId.DeviceId
            };
            sensorV.forEach(name => {
                senV[name] = body[name];
            });
            logger.debug("===============================");
            logger.debug(senV);
            await SensorValue.create(senV);
            senV.unit = DeviceId.unit;
            senV.type = DeviceId.type;
            logger.debug(senV);
            event.emit("new value",senV);
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
    });

    router.get("/sensor/getNames", async(ctx, next)=>{
        let msg;
        try{
            let query = ctx.request.query;
            let sensorId = query.sensorId;
            if(!sensorId){
                throw Error("sensorId 缺失");
            }
            let sensorName = await Sensor.findOne({
                where: {
                    sensorId: sensorId
                }
            });
            let deviceName = await sensorName.getDevice();
            msg = {
                sensorName:sensorName.name,
                deviceName:deviceName.name
            }
        }catch (e){
            logger.error(e);
            responser.catchErr(ctx,e);
            return;
        }
        responser.success(ctx,msg)
    });
};