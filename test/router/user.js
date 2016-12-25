/**
 * Created by claim on 16-10-23.
 */

const config = require('./../../config/config');

let agent = require('superagent').agent();

agent.post('localhost:' + config.server.port + '/user/add')
    .send({
        username: 'admin8',
        password: 'pass_word',
        email: 'test@education.com',
        type: 1
    })
    .end((err, res)=> {
        if (err)
            console.log('Error : ' + err);
        else {
            console.log(res != null);
        }
    });