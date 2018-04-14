const db = require('../model/index');
const Sensor = db.models.Sensor;
async function test() {
    try{
        let sensorName = await Sensor.findOne({
            where: {
                sensorId: "fa8ffe19-c5be-4519-86f9-c7f3f7ea4de9"
            }
        });
        let deviceName = await sensorName.getDevice();
        let msg = {
            sensorName:sensorName.name,
            deviceName:deviceName.name
        };
        console.log(msg);
    }
    catch (e) {
        console.log(e);
    }
}

test();