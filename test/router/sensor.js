/**
 * Created by webhugo on 12/26/16.
 */
var common = require('./common');

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
            agent.get('localhost:' + config.server.port + '/api/sensor/all?deviceId=1')
                .end((err, res) => {
                    if (!err && !res.body.error)
                        done();
                })
        })
    });

    describe("addSensor()", function () {
        it("addSensor", function (done) {
            agent.post('localhost:' + config.server.port + '/api/sensor/add')
                .send({
                    name: "1",
                    label: "1",
                    deviceId: 2
                })
                .end((err, res) => {
                    if (!err && !res.body.error)
                        done();
                    sensorId = res.body.msg.id;
                })
        })
    });

    describe("delSensor()", function () {
        it("delSensor", function (done) {
            agent.post('localhost:' + config.server.port + '/api/sensor/delete')
                .send({
                    sensorId: sensorId
                })
                .end((err, res) => {
                    if (!err && !res.body.error)
                        done();
                })
        })
    })
});
