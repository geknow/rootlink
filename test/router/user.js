/**
 * Created by claim on 16-10-23.
 */

const config = require('./../../config/config');
const WeixinConfig = config.weixin;
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
var u = (url) => {
    return encodeURI(url)
};
var menu ={
    "button":[
        {
            "type":"view",
            "name":"绑定11",
            "url":`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.weixin.AppID}&redirect_uri=http%3a%2f%2f118.89.28.157%2fweixin%2flock&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
        }]
};


// new Promise((resolve, reject) => {
//     var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' +
//         WeixinConfig.AppID + '&secret=' + WeixinConfig.AppSecret;
//     agent.get(url)
//         .end((e, res) => {
//             if (e)
//                 console.log(e);
//             else {
//                 console.log(res.body);
//                 resolve(res.body.access_token);
//             }
//         });
// }).then((token) => {
//     let url = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + token;
//     // let ipUrl = 'https://api.weixin.qq.com/cgi-bin/getcallbackip?access_token='+token;
//     // agent.get(ipUrl)
//     //     .end((e,res) => {
//     //         console.log(res.body);
//     //     });
//     console.log(menu.button[0].url);
//     agent.post(url)
//         .send(menu)
//         .end((err, res) => {
//             console.log(res.body);
//         })
// });

const js2xmlparser = require("js2xmlparser");
let returnData = {
    ToUserName: "1",
    "FromUserName": "1",
    "CreateTime": new Date().getTime(),
    "MsgType": "text",
    "Content": "小主,你好"
};
console.log(js2xmlparser.parse("xml", returnData));;
module.exports = {
    validate,
    register,
    login
};




