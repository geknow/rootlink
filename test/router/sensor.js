/**
 * Created by webhugo on 12/26/16.
 */
var common = require('./common');
var ip = common.ip;

var evalString = '';
Object.keys(common).forEach((e,i) => {
    evalString += `var ${e} = common.${e};`;
});
if(typeof(evalString) !== 'undefined' || evalString !== null){
    eval(evalString);
}

var sensorId ;

describe('Sensor', function () {
    this.timeout(7000);     // extend timeout

    describe("getSensor()", function () {
        it("getSensor", function (done) {
            agent.get(ip + ":" + config.server.port + '/api/sensor/all?deviceId=1&key=4hl0fe')
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    });

    describe("addSensor()", function () {
        it("addSensor", function (done) {
            agent.post(ip + ":" + config.server.port + '/api/sensor/add?key=4hl0fe')
                .send({
                    name: "数值类型传感器",
                    label: "1",
                    unit: "C",
                    deviceId: 2
                })
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                    sensorId = res.body.msg.id;
                })
        })
    });

    describe("delSensor()", function () {
        it("delSensor", function (done) {
            agent.post(ip + ":" + config.server.port + '/api/sensor/delete?key=4hl0fe')
                .send({
                    sensorId: sensorId
                })
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    })
});
