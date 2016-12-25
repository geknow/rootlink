/**
 * Created by claim on 16-10-23.
 */

const config = require('./../../config/config');

let agent = require('superagent').agent();

var register = ()=> {
    agent.post('localhost:' + config.server.port + '/user/register')
        .send({
            
            password: 'pass_word',
            email: '2248906444@qq.com',
            type: 1
        })
        .end((err, res)=> {
            if (err)
                console.log('Error : ' + err);
            else {
                console.log(res.body);
            }
        });
};

var validate = () => {

    agent.post('localhost:' + config.server.port + '/validate/email/f01d4bc1f8f3fe2e606cfc463c4f7675521d3f8f447ac5ce759bd218da04146e872f871c4b08812ccb3bdafa850744ee5c299fa16c702fcd77e9ee938b88e3c5e5cf5e1db2d3631a8c49871a4bb86a4e')
        .end((err, res)=> {
            if (err)
                console.log('Error : ' + err);
            else {
                console.log(res.body);
            }
        });
};

var login = () => {
    return new Promise((resolve, reject)=> {
        agent.post('localhost:' + config.server.port + '/user/login')
            .send({
                password: '123',
                username: 'name3',
                type: 1
            })
            .end((err, res)=> {
                if (err)
                    console.log('Error : ' + err);
                else {
                    console.log(res.body);
                    resolve(res.body.msg.LoginToken);
                }
            });
    }).then(token => {
        return token;
    })
};


module.exports = {
    validate,
    register,
    login
};



