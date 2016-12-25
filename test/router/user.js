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
    console.log('localhost:' + config.server.port + '/validate/email/c1e472b2b92e10e79bcacf5a0c5a92b4f06fe3153082a2d474cc2e5af35b95fc1ff1276b9abbaeadc245d5c1b9973ca13cc078151fe9684f97f13619604a1f9aab62d9486b0331a7b990a26e721bec356eff5ad6c3cc537893f416b759719d15');
    agent.post('localhost:' + config.server.port + '/validate/email/f01d4bc1f8f3fe2e606cfc463c4f7675521d3f8f447ac5ce759bd218da04146e872f871c4b08812ccb3bdafa850744ee5c299fa16c702fcd77e9ee938b88e3c5e5cf5e1db2d3631a8c49871a4bb86a4e')
        .end((err, res)=> {
            if (err)
                console.log('Error : ' + err);
            else {
                console.log(res.body);
            }
        });
};
validate();

