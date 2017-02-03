/**
 * Created by webhugo on 2/3/17.
 */
const config = require('./../../config/config');
var should = require('should');
let agent = require('superagent').agent();

var topicId;

describe('Forum', function () {
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


    describe("getForumAll()", function () {
        it("getForumAll", function (done) {
            agent.get('localhost:' + config.server.port + '/api/forum/index')

                .end((err, res) => {
                    if (!err && !res.body.error)
                        done();
                })
        })
    });

    describe("addTopic()", function () {
        it("addTopic", function (done) {
            agent.post('localhost:' + config.server.port + '/api/forum/addTopic')
                .send({
                    text: "addtopic"
                })
                .end((err, res) => {
                    if (!err && !res.body.error)
                        done();
                    topicId = res.body.msg.PostId;
                })
        })
    });


    describe("addComment()", function () {
        it("addComment", function (done) {
            agent.post('localhost:' + config.server.port + '/api/forum/addComment')
                .send({
                    text: "addComment",
                    id: topicId,
                    type: 1
                })
                .end((err, res) => {
                    if (!err && !res.body.error)
                        done();
                })
        })
    });


    describe("getComment()", function () {
        it("getComment", function (done) {
            agent.get('localhost:' + config.server.port + '/api/forum/getComment?id=' + topicId)
                .end((err, res) => {
                    if (!err && !res.body.error)
                        done();
                })
        })
    });
});