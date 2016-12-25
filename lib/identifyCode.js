/**
 * Created by claim on 16-12-8.
 */
const config = require('./../config/config');
const TopClient = require('./alidayuSDK/lib/api/topClient').TopClient;
const nodeMailer = require('nodemailer');
const cache = require('././../instance/cache');

let textClient = TopClient({
    "appkey": "23561537",
    "appsecret": "279d7533c61cf90548438bec691c3a3a",
    "REST_URL": "http://gw.api.taobao.com/router/rest"
});

let mailClient = nodeMailer.createTransport('smtps://ouredaeducation@yeah.net:oureda123456@smtp.yeah.net');

function identifyCodeGenerator(length) {
    length = length || 6;
    let num = Math.floor(Math.random() * 999999);
    return (Array(length).join('0') + num).slice(-length);
}

function textMessageSend(client, tel) {
    let code = identifyCodeGenerator();
    client.execute('alibaba.aliqin.fc.sms.num.send', {
        'extend': '',
        'sms_type': 'normal',
        'sms_free_sign_name': 'OurEDA在线',
        'sms_param': `{code:'${code}'}`,
        'rec_num': tel.toString(),
        'sms_template_code': "SMS_33650413"
    }, (err) => {
        if (err)
            console.log(err);
    });
    cache.set
    return code;
}

function mailSend(client, address) {
    let code = identifyCodeGenerator();
    client.sendMail(config.mailInfo(code, address), (err, res) => {
        if (err)
            console.log(err);
        else
            console.log(res);
    });
    return code;
}

module.exports = {
    sendMail(address){
        return mailSend(mailClient, address);
    },
    sendTextMessage(number){
        return textMessageSend(textClient, number);
    }
};

// Test Passed
// mailSend(mailClient, "ywtyx01@126.com");

// Test Passed
// textMessageSend(textClient, '15641206835');