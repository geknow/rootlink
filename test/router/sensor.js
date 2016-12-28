/**
 * Created by webhugo on 12/26/16.
 */
const config = require('./../../config/config');
// const userTest = require('./user');
let agent = require('superagent').agent();

var getSensor = () => {
    agent.get('localhost:' + config.server.port + '/sensor/all?deviceId=1')
        .end((err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res.body);
            }
        })
};
var addSensor = () => {
    agent.post('localhost:' + config.server.port + '/sensor/add')
        .send({
            name: "1",
            label: "1",
            deviceId: 2
        })
        .end((err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res.body);
            }
        })
};


var delSensor = () => {
    agent.post('localhost:' + config.server.port + '/sensor/delete')
        .send({
            sensorId: 3
        })
        .end((err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res.body);
            }
        })
};
getSensor()