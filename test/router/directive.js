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

    describe("addDirective()", function () {
        it("addDirective", function (done) {
            agent.post(ip + ":" + config.server.port + '/api/directive/add')
                .send({
                    operation: str,
                    operationUrl: "http://www.baidu.com",
                    UserId: userId
                })
                .end((err, res) => {
                    console.log(res.body);
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
                    operationUrl: "http://www.google.com",
                    UserId: userId
                })
                .end((err, res) => {
                    console.log(res.body);
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


