/**
 * Created by webhugo on 12/25/16.
 */
const config = require('./../../config/config');
var should = require('should');
let agent = require('superagent').agent();

describe('Blog', function () {
    this.timeout(7000);     // extend timeout

    describe('login()', function () {
        it('logined', function (done) {
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


    describe("getBlog()", function () {
        it("getBlog", function (done) {
            agent.get('localhost:' + config.server.port + '/api/blog/index')
                .end((err, res) => {
                    if (!err && !res.body.error)
                        done();
                });
        })
    });

    describe("addBlog()", function () {
        it("addBlog", function (done) {
            agent.post('localhost:' + config.server.port + '/api/admin/blog/add')
                .send({
                    text: "haha"
                })
                .end((err, res) => {
                    if (!err && !res.body.error)
                        done();
                })
        })
    });
});
