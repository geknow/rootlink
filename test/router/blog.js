/**
 * Created by webhugo on 12/25/16.
 */
var common = require('./common');

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
