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

var key = "";

var sensorId ,deviceId = "";

describe('Sensor', function () {
    this.timeout(7000);     // extend timeout

    describe('login()', function () {
        it('logined', function (done) {
            var url = ip + ":" + config.server.port + '/api/login';
            agent.post(url)
                .send({
                    password: "123",
                    username: "name4",
                    rememberMe: true
                })
                .end((err, res) => {

                    console.log(res.body);
                    token = res.body.msg.token;
                    if (!err && !res.body.error)
                        done()
                });
        })
    });
    describe("allDevice()", function () {
        it("allDevice", function (done) {
            agent.get(ip + ":" + config.server.port + '/api/device/all')
                .end((err, res) => {
                    console.log(res.body);
                    deviceId = res.body.msg[0].deviceId;
                    if (!err && !res.body.error)
                        done();
                })
        })
    });

    describe('getKey()',function () {
        it("getKeyed()",function (done) {
            var url = ip+':' + config.server.port + '/api/user/getKey';
            agent.get(url)
                .end((err, res) => {
                    console.log(res.body);
                    key = res.body.msg.key;
                    if (!err && !res.body.error)
                        done();
                });
        })
    });

    describe("allSensor()", function () {
        it("allSensor", function (done) {
            agent.get(ip + ":" + config.server.port + '/api/sensor/all?deviceId='+deviceId+'&key='+key)
                .end((err, res) => {
                    console.log(res.body);
                    sensorId = res.body.msg[0].sensorId;
                    if (!err && !res.body.error)
                        done();
                })
        })
    });

    describe("addSensor()", function () {
        it("addSensor", function (done) {
            console.log(deviceId);
            agent.post(ip + ":" + config.server.port + '/api/sensor/add?key='+key)
                .send({
                    name: "数值类型传感器",
                    description: "1",
                    unit: "C",
                    deviceId: deviceId
                })
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                    sensorId = res.body.msg.sensorId;

                })
        })
    });


    describe("uploadSensorV()", function () {
        it("uploadSensorV", function (done) {
            agent.post(ip + ":" + config.server.port + '/api/sensor/upload?key='+key)
                .send({
                    value1: "11",
                    sensorId: sensorId
                })
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    });

    describe("getSensorV()", function () {
        it("getSensorV", function (done) {
            agent.get(ip + ":" + config.server.port + '/api/sensor/getValue?sensorId='+sensorId+'&key='+key)
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    });

    describe("delSensor()", function () {
        it("delSensor", function (done) {
            agent.post(ip + ":" + config.server.port + '/api/sensor/delete?key='+key)
                .send({
                    sensorId: sensorId
                })
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    });


    describe("updateSensor()", function () {
        it("updateSensor", function (done) {
            console.log(deviceId);
            agent.post(ip + ":" + config.server.port + '/api/sensor/update')
                .send({
                    name: "数值类型传感器",
                    description: "11111111111",
                    unit: "C",
                    deviceId: deviceId,
                    sensorId: sensorId
                })
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();

                })
        })
    });
});
