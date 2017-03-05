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

var deviceId,key="" ,triggerId;

describe('Trigger', function () {
    this.timeout(7000);     // extend timeout

    describe("allDevice()", function () {
        it("allDevice", function (done) {
            agent.get(ip + ":" + config.server.port + '/api/device/all')
                .end((err, res) => {
                    console.log(res.body);
                    // deviceId = res.body.msg[0].deviceId;
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


    describe("addTrigger()", function () {
        it("addTrigger", function (done) {
            console.log(deviceId);
            agent.post(ip + ":" + config.server.port + '/api/trigger/add?key='+key)
                .send({
                    name: "haha",
                    deviceId: deviceId
                })
                .end((err, res) => {
                    console.log(res.body);
                    triggerId = res.body.msg.trigger.triggerId;
                    if (!err && !res.body.error)
                        done();
                })
        })
    });

    describe("controlTrigger()", function () {
        it("controlTrigger", function (done) {
            agent.post(ip + ":" + config.server.port + '/api/trigger/control?key='+key)
                .send({
                    triggerId: triggerId,
                    status: 1
                })
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    });


    describe("getTrigger()", function () {
        it("getTrigger", function (done) {
            agent.get(ip + ":" + config.server.port + '/api/trigger/status?triggerId='+triggerId+'&key='+key+"&q=1")
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    });

    describe("deleteTrigger()", function () {
        it("deleteTrigger", function (done) {
            agent.post(ip + ":" + config.server.port + '/api/trigger/delete?key='+key)
                .send({
                    triggerId: triggerId
                })
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    });



});
