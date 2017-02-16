/**
 * Created by claim on 16-10-23.
 */
var common = require('./common');

var evalString = '';
Object.keys(common).forEach((e,i) => {
    evalString += `var ${e} = common.${e};`;
});
if(typeof(evalString) !== 'undefined' || evalString !== null){
    eval(evalString);
}

var u = new Date().toString().substr(16, 8);
var p = new Date().toString();
var key = "";

describe('User', function () {
    this.timeout(7000);     // extend timeout

    describe("register()", function () {
        it("registered", function (done) {
            var url = 'localhost:' + config.server.port + '/api/register';
            agent.post(url)
                .send({
                    password: p,
                    email: Math.random().toString().substr(2, 4) + "@qq.com",
                    username: u,
                    type: 1
                })
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error) {
                        key = res.body.msg.key;
                        done();
                    }
                });
        })
    });

    describe("validate()", function () {
        it("validated", function (done) {
            let url = 'localhost:' + config.server.port + '/api/validate/email/' + key;
            agent.get(url)
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                });
        });
    });

    describe('login()', function () {
        it('logined', function (done) {
            var url = 'localhost:' + config.server.port + '/api/login';
            agent.post(url)
                .send({
                    password: p,
                    username: u
                })
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                });
        })
    });

});

var login = () => {
    var url = 'localhost:' + config.server.port + '/api/login';
    agent.post(url)
        .send({
            password: "123",
            username: "name3"
        })
        .end((err, res) => {
            if(err)
                console.log(err);
            else
                console.log(res.body);
        });
};

module.exports = {
    login
};



