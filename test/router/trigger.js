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

var triggerId ;

describe('Trigger', function () {
    this.timeout(7000);     // extend timeout

    describe("addTrigger()", function () {
        it("addTrigger", function (done) {
            agent.post(ip + ":" + config.server.port + '/api/trigger/add?key=4hl0fe')
                .send({
                    name: "haha"
                })
                .end((err, res) => {
                    triggerId = res.body.msg.trigger.id;
                    if (!err && !res.body.error)
                        done();
                    sensorId = res.body.msg.id;
                })
        })
    });

    describe("controlTrigger()", function () {
        it("controlTrigger", function (done) {
            agent.post(ip + ":" + config.server.port + '/api/trigger/control?key=4hl0fe')
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
            agent.get(ip + ":" + config.server.port + '/api/trigger/status?triggerId='+triggerId+'&key=4hl0fe')
                .end((err, res) => {
                    if (!err && !res.body.error)
                        done();
                })
        })
    });

    describe("deleteTrigger()", function () {
        it("deleteTrigger", function (done) {
            agent.post(ip + ":" + config.server.port + '/api/trigger/delete?key=4hl0fe')
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
