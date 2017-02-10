/**
 * Created by webhugo on 2/3/17.
 */
console.warn("在test之前，把config目录下的config.js 的isRender改为false!!!!!!");
const config = require('./../../config/config');
var should = require('should');
let agent = require('superagent').agent();//保存cookie

describe('First', function () {
    this.timeout(7000);     // extend timeout

    /**
     * 先登录，因为下面很多路由都是需要登录才能操作的
     */
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

});

module.exports = {
    config,
    should,
    agent
};