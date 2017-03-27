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

var DeviceId ;

describe('Device', function () {
    this.timeout(7000);     // extend timeout


    describe("allDevice()", function () {
        it("allDevice", function (done) {
            agent.get(ip + ":" + config.server.port + '/api/device/all')
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    });


    describe("addDevice()", function () {
        it("addDevice", function (done) {
            agent.post(ip + ":" + config.server.port + '/api/device/add')
                .send({
                    name: "1",
                    description: "1"
                })
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                    DeviceId = res.body.msg.deviceId;
                })
        })
    });

    describe("getDevice()", function () {
        it("getDevice", function (done) {
            agent.get(ip + ":" + config.server.port + '/api/device/get?deviceId='+DeviceId)
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    });

    describe("getDevice()", function () {
        it("getDevice", function (done) {
            var a = new Date('2017-03-27 04:46:31.847000').getTime();
            var b = new Date().getTime();
            agent.get(ip + ":" + config.server.port + '/api/device/get?deviceId=ce5a4cde-06ea-4f75-a380-e81bf265ddb4'
                +'&startTime='+a+'&endTime='+b)
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    });


    describe("delDevice()", function () {
        it("delDevice", function (done) {
            agent.post(ip + ":"  + config.server.port + '/api/device/delete')
                .send({
                    deviceId: DeviceId
                })
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    });

});


