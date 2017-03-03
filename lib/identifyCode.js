/**
 * Created by claim on 16-12-8.
 */
const config = require('./../config/config');
const nodeMailer = require('nodemailer');
const cache = require('././../instance/cache');
const utilx = require('./utilx');
const logger = require("../log/index").logger;

let transporter = nodeMailer.createTransport('smtps://ouredaeducation@yeah.net:oureda123456@smtp.yeah.net');


function mailSend(client, code, email) {

    client.sendMail(config.mailInfo(code, email), (err, res) => {
        if (err)
            logger.debug(err);
        else
            logger.debug(res);
    });

}

module.exports = {
    sendMail(code, email){//code是验证码
        return mailSend(transporter, code, email);
    }
};
