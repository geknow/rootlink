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

describe('Directive', function () {
    this.timeout(7000);     // extend timeout

    describe("addDirective()", function () {
        it("addDirective", function (done) {
            agent.post(ip + ":" + config.server.port + '/api/directive/add')
                .send({
                    operation: str,
                    operationUrl: "http://www.baidu.com",
                    UserId: 1
                })
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    });


    describe("getDirective()", function () {
        it("getDirective", function (done) {
            agent.get(ip + ":" + config.server.port + '/api/directive/get?operation=' + str + "&UserId=1")
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
                    UserId: 1
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
                    UserId: 1
                })
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    });
});


