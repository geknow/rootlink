/**
 * Created by webhugo on 12/26/16.
 */
const config = require('./../../config/config');
// const userTest = require('./user');
let agent = require('superagent').agent();

var getDevice = (loginToken) => {
    agent.get('localhost:' + config.server.port + '/device/all')
        
        .end((err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res.body);
            }
        })
};
var addDevice = () => {
    agent.post('localhost:' + config.server.port + '/device/add')
        .send({
            name: "1",
            label: "1"
        })
        .end((err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res.body);
            }
        })
};


var delDevice = () => {
    agent.post('localhost:' + config.server.port + '/device/delete')
        .send({
            token: "02d5adb1-2f86-4bd2-a0df-83fbc323e58c"
        })
        .end((err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res.body);
            }
        })
};
addDevice();
// new Promise((resolve, reject)=> {
//     resolve(userTest.login());
// }).then((LoginToken) => {
//     getDevice(LoginToken)
// });
