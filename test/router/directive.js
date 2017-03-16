/**
 *
 * Created by webhugo on 3/1/17.
 */

var common = require('./common');
var ip = common.ip;

var evalString = '';
Object.keys(common).forEach((e, i) => {
    evalString += `var ${e} = common.${e};`;
});
if (typeof(evalString) !== 'undefined' || evalString !== null) {
    eval(evalString);
}

var str = new Date().toTimeString();
var userId;
var deviceId;
var key;
var triggerId;
var operationUrl;


describe('Directive', function () {
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
                    userId = res.body.msg.userId;
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


    describe("addDirective()", function () {
        it("addDirective", function (done) {
            agent.post(ip + ":" + config.server.port + '/api/directive/add')
                .send({
                    operation: str,
                    triggerId,
                    status: 1,
                    UserId: userId
                })
                .end((err, res) => {
                    console.log(res.body);
                    operationUrl = res.body.msg;
                    if (!err && !res.body.error)
                        done();
                })
        })
    });

    describe("doDirective()", function () {
        it("doDirective", function (done) {
            console.log(operationUrl);
            agent.get(operationUrl)
                .end((err, res) => {
                    console.log(res.body);
                    operationUrl = res.body.msg;
                    if (!err && !res.body.error)
                        done();
                })
        })
    });


    describe("allDirective()", function () {
        it("allDirective", function (done) {
            agent.get(ip + ":" + config.server.port + '/api/directive/all')
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    });

    describe("updateDirective()", function () {
        it("updateDirective", function (done) {
            agent.post(ip + ":" + config.server.port + '/api/directive/update')
                .send({
                    operation: str,
                    triggerId,
                    status: 0,
                    UserId: userId
                })
                .end((err, res) => {
                    console.log(res.body);
                    operationUrl = res.body.msg;
                    if (!err && !res.body.error)
                        done();
                })
        })
    });

    describe("doDirective()", function () {
        it("doDirective", function (done) {
            console.log(operationUrl);
            agent.get(operationUrl)
                .end((err, res) => {
                    console.log(res.body);
                    operationUrl = res.body.msg;
                    if (!err && !res.body.error)
                        done();
                })
        })
    });

    describe("deleteDirective()", function () {
        it("deleteDirective", function (done) {
            agent.post(ip + ":" + config.server.port + '/api/directive/delete')
                .send({
                    operation: str,
                    UserId: userId
                })
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    });
});


