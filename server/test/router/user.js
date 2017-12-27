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

let token ;

var key = "";

describe('User', function () {
    this.timeout(7000);     // extend timeout

    /**
     * 注册
     */
    // describe('getCode()', function () {
    //     it('getCode', function (done) {
    //         var url = ip + ":" + config.server.port + '/api/register/getCode?email=18940874730@163.com';
    //         agent.get(url)
    //             .end((err, res) => {
    //                 console.log(res.body);
    //                 code = res.body.msg.code;
    //                 if (!err && !res.body.error)
    //                     done();
    //             });
    //     })
    // });
    //
    //
    // describe("register()", function () {
    //     it("registered", function (done) {
    //         var url = ip + ":" + config.server.port + '/api/register';
    //         agent.post(url)
    //             .send({
    //                 password: 123,
    //                 email: "18940874730@163.com",
    //                 username: "hugofsa",
    //                 type: 1,
    //                 code: code
    //             })
    //             .end((err, res) => {
    //                 console.log(res.body);
    //                 if (!err && !res.body.error) {
    //                     done();
    //                 }
    //             });
    //     })
    // });

    // describe('login()', function () {
    //     it('logined', function (done) {
    //         var url = ip + ":" + config.server.port + '/api/login';
    //         agent.post(url)
    //             .send({
    //                 password: "123",
    //                 username: "name4",
    //                 rememberMe: true
    //             })
    //             .end((err, res) => {
    //
    //                 console.log(res.body);
    //                 token = res.body.msg.token;
    //                 if (!err && !res.body.error)
    //                     done()
    //             });
    //     })
    // });

    // describe('loginValidate()',function () {
    //     it("loginValidate()",function (done) {
    //         var url = ip+':' + config.server.port + '/api/loginValidate';
    //         console.log(url);
    //         agent.get(url)
    //             .end((err, res) => {
    //
    //                 console.log(res.body);
    //
    //                 if (!err && !res.body.error)
    //                     done();
    //             });
    //     })
    // });

    // describe('getKey()',function () {
    //     it("getKeyed()",function (done) {
    //         var url = ip+':' + config.server.port + '/api/user/getKey';
    //         agent.get(url)
    //             .end((err, res) => {
    //                 console.log(err);
    //                 console.log(res.body);
    //                 key = res.body.msg.key;
    //                 if (!err && !res.body.error)
    //                     done();
    //             });
    //     })
    // });
    //
    // describe('updateKey()',function () {
    //     it("updateKeyed()",function (done) {
    //         var url = ip+':' + config.server.port + '/api/user/updateKey?key='+key;
    //         agent.post(url)
    //             .end((err, res) => {
    //                 console.log(res.body);
    //                 if (!err && !res.body.error)
    //                     done();
    //             });
    //     })
    // });
    //
    //
    // describe("logout()", function () {
    //     it("logouted", function (done) {
    //         var url = ip + ":" + config.server.port + '/api/logout';
    //         agent.post(url)
    //             .end((err, res) => {
    //                 console.log(res.body);
    //                 if (!err && !res.body.error)
    //                     done();
    //             })
    //     })
    // });
    //
    //
    //
    // describe('login()', function () {
    //     it('logined', function (done) {
    //         var url = ip + ":" + config.server.port + '/api/login';
    //         agent.post(url)
    //             .send({
    //                 token: token,
    //                 rememberMe: true
    //             })
    //             .end((err, res) => {
    //                 console.log(token);
    //                 console.log(res.body);
    //                 if (!err && !res.body.error)
    //                     done()
    //             });
    //     })
    // });


});

