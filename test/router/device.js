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

var token ;

describe('Device', function () {
    this.timeout(7000);     // extend timeout


    describe("getDevice()", function () {
        it("getDevice", function (done) {
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
                    label: "1"
                })
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                    token = res.body.msg.token;
                })
        })
    });


    describe("delDevice()", function () {
        it("delDevice", function (done) {
            agent.post(ip + ":"  + config.server.port + '/api/device/delete')
                .send({
                    token: token
                })
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    });

});


