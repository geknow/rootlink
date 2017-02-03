/**
 * Created by webhugo on 12/26/16.
 */
const config = require('./../../config/config');
var should = require('should');
let agent = require('superagent').agent();

var token ;

describe('Device', function () {
    this.timeout(7000);     // extend timeout

    describe("login()", function () {
        it("logined", function (done) {
            var url = 'localhost:' + config.server.port + '/api/login';
            agent.post(url)
                .send({
                    password: "123",
                    username: "name3"
                })
                .end((err, res) => {
                    if (!err && !res.body.error)
                        done()
                });
        })
    });


    describe("getDevice()", function () {
        it("getDevice", function (done) {
            agent.get('localhost:' + config.server.port + '/api/device/all')

                .end((err, res) => {
                    if (!err && !res.body.error)
                        done();
                })
        })
    });


    describe("addDevice()", function () {
        it("addDevice", function (done) {
            agent.post('localhost:' + config.server.port + '/api/device/add')
                .send({
                    name: "1",
                    label: "1"
                })
                .end((err, res) => {
                    if (!err && !res.body.error)
                        done();
                    token = res.body.msg.token;
                })
        })
    });


    describe("delDevice()", function () {
        it("delDevice", function (done) {
            agent.post('localhost:' + config.server.port + '/api/device/delete')
                .send({
                    token: token
                })
                .end((err, res) => {
                    if (!err && !res.body.error)
                        done();
                })
        })
    });

});


