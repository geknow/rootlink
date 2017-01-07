/**
 * Created by claim on 16-10-23.
 */

const config = require('./../../config/config');
const WeixinConfig = config.weixin;
let agent = require('superagent').agent();

var register = ()=> {
    agent.post('localhost:' + config.server.port + '/user/register')
        .send({
            password: '123',
            email: '22489064443@qq.com',
            username: "name1",
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
register();

var validate = () => {

    agent.get('localhost:' + config.server.port + '/validate/email/063be38497f03d20848e1f15aa51c138724fd131260502ee75362c7b42055ac2a33a8fac3dbdfcd45a6418ca384c594b886fdb8bcc0359a26383267ff5fe5183aa2c647554f985cbc06435b0703b9290e036347ab332bf15759dffb0d80c25c4')
        .end((err, res)=> {
            if (err)
                console.log('Error : ' + err);
            else {
                console.log(res.body);
            }
        });
};
// validate()
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
                    // resolve(res.body.msg.LoginToken);
                }
            });
    }).then(token => {
        return token;
    })
};

// login();
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

// const js2xmlparser = require("js2xmlparser");
// let returnData = {
//     ToUserName: "1",
//     "FromUserName": "1",
//     "CreateTime": new Date().getTime(),
//     "MsgType": "text",
//     "Content": "小主,你好"
// };
// console.log(js2xmlparser.parse("xml", returnData));;
module.exports = {
    validate,
    register,
    login
};
// const cache = require('../../instance/cache');
// var ca =  async () => {
//    
//     let user = {
//         username: "1",
//         // password: body.password,
//         email: "2248906444@qq.com",
//         avatar: '', //todo : get update avatar
//         type: 0
//     };
//     user.password = "1";
//     cache.jsetex("11111",3600*1000,JSON.stringify(user));
//     let a  = await cache.get("11111")
//     console.log(JSON.parse(a));
// }
// ca()
// let aa = "{\"username\":\"6\",\"email\":\"2248906444@qq.com\",\"avatar\":\"\",\"type\":0,\"password\":\"6\"}";
// aa = JSON.parse(aa);
// console.log(aa);



