/**
 * Created by webhugo on 12/25/16.
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

describe('Blog', function () {
    this.timeout(7000);     // extend timeout

    describe("getBlog()", function () {
        it("getBlog", function (done) {
            agent.get(ip + ':' + config.server.port + '/api/blog/index')
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                });
        })
    });

    describe('login()', function () {
        it('logined', function (done) {
            var url = ip + ":" + config.server.port + '/api/login';
            agent.post(url)
                .send({
                    password: "123",
                    username: "name1"
                })
                .end((err, res) => {
                    console.log(err);
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                });
        })
    });

    describe("addBlog()", function () {
        it("addBlog", function (done) {
            agent.post(ip+':' + config.server.port + '/api/admin/blog/add')
                .send({
                    text: "haha",
                    title: "1",
                    label: "32",
                    time: "Fd"
                })
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    });
});
