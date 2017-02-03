/**
 * Created by claim on 16-12-8.
 */
const config = require('./../config/config');
const nodeMailer = require('nodemailer');
const cache = require('././../instance/cache');
const utilx = require('./utilx');
const logger = require("../log/index").logger;

let transporter = nodeMailer.createTransport('smtps://ouredaeducation@yeah.net:oureda123456@smtp.yeah.net');


function mailSend(client, user) {
    let key = encodeURI(utilx.generatorToken(user));
    let link = "http://"+config.server.ip+":"+config.server.port+"/validate/email/"+key;
    user = JSON.parse(user);
    client.sendMail(config.mailInfo(link, user.email), (err, res) => {
        if (err)
            logger.debug(err);
        else
            logger.debug(res);
    });
    return key;
}

module.exports = {
    sendMail(user){
        return mailSend(transporter, user);
    }
};
