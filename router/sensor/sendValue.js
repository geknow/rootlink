/**
 * Created by webhugo on 2/27/17.
 */

const sensorV = require("../../config/config").sensorValue;
const db = require('./../../model/index');
const Sensor = db.models.Sensor;
const responser = require('./../../lib/responser');
const logger = require("../../log/index").logger;

module.exports = router => {
    router.post("/sensor/upload", async(ctx, next) => {
        logger.debug("/sensor/upload");
        let body = ctx.request.body;
        let sensorId = body.sensorId;
        let error;
        let senV = {};
        sensorV.forEach(name => {
            senV[name] = body[name];
        });
        try {
            await Sensor.update(senV, {
                where: {
                    id: sensorId
                }
            });
        } catch (e) {
            error = e;
            console.log(e);
        }

        if (error) {
            responser.catchErr(ctx, error);
        } else {
            responser.success(ctx)
        }
    })
};