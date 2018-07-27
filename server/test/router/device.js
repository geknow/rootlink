/**
 * Created by webhugo on 12/26/16.
 */
const common = require('./common');
const agent = common.agent;
let prefix = (url)=>`http://${common.ip}:${common.config.server.port}/api/device/${url}`;

// let evalString = '';
// Object.keys(common).forEach((e,i) => {
//     evalString += `var ${e} = common.${e};`;
// });
// if(typeof(evalString) !== 'undefined' || evalString !== null){
//     eval(evalString);
// }

let DeviceId;

describe('Device', function () {
    this.timeout(7000);     // extend timeout


    describe("allDevice()", function () {
        it("allDevice", function (done) {
            agent.get(prefix('all'))
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    });


    describe("addDevice()", function () {
        it("addDevice", function (done) {
            agent.post(prefix('add'))
                .send({
                    name: "1",
                    description: "1"
                })
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                    DeviceId = res.body.msg.deviceId;
                })
        })
    });

    describe("getDevice()", function () {
        it("getDevice", function (done) {
            agent.get(prefix('get?deviceId='+DeviceId))
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    });

    describe("getDevice()", function () {
        it("getDevice", function (done) {
            var a = new Date('2017-03-27 04:46:31.847000').getTime();
            var b = new Date().getTime();
            agent.get(prefix('get?deviceId=ce5a4cde-06ea-4f75-a380-e81bf265ddb4' +'&startTime='+a+'&endTime='+b))
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    });


    describe("delDevice()", function () {
        it("delDevice", function (done) {
            agent.post(prefix('delete'))
                .send({
                    deviceId: DeviceId
                })
                .end((err, res) => {
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        })
    });

    describe("upload", function () {
        it('upload', function (done) {
            agent.post(prefix('upload'))
                .send({
                    deviceId:'ae757d10-b21d-4d32-a7f6-6d51b1196436',
                    sensor:[
                        {
                            sensorId:'7f0c9a2e-211c-40e2-81c5-3284a4efbb03',
                            value1:'11'
                        },{
                            sensorId:'7c9308a7-816c-440c-8007-aa125d518b54',
                            value1:'12'
                        }
                    ]
                })
                .end((err,res)=>{
                    console.log(res.body);
                    if (!err && !res.body.error)
                        done();
                })
        });
    })
});


