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

let code;

var key = "";

describe('User', function () {
    this.timeout(7000);     // extend timeout

    describe('getCode()', function () {
        it('getCode', function (done) {
            var url = ip + ":" + config.server.port + '/api/register/getCode?email=18940874730@163.com';
            agent.get(url)
                .end((err, res) => {
                    console.log(res.body);
                    // code = res.body.msg.code;
                    if (!err && !res.body.error)
                        done();
                });
        })
    });


    // describe("register()", function () {
    //     it("registered", function (done) {
    //         var url = ip + ":" + config.server.port + '/api/register';
    //         agent.post(url)
    //             .send({
    //                 password: 123,
    //                 email: "18940874730@163.com",
    //                 username: "hugo",
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



