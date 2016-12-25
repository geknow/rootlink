/**
 * todo: 关注课程推送
 * todo: 新课程推送
 */

const config = require('../config/config');
const JPush = require('jpush-sdk');

var option = {
    appKey: config.Jpush.appKey,
    masterSecret: config.Jpush.masterSecret,
    retryTimes: 3,
    isDebug: false
};

var client = JPush.buildClient(option);

module.exports = (function () {
    var push = function () {
        // client.push().setPlatform(JPush.ALL)
        //     .setAudience(JPush.ALL)
        //     .setNotification('Hi, JPush', JPush.ios('ios alert', 'happy', 5))
        //     .send(function(err, res) {
        //         if (err) {
        //             console.log(err.message)
        //         } else {
        //             console.log('Sendno: ' + res.sendno)
        //             console.log('Msg_id: ' + res.msg_id)
        //         }
        //     });
    };
    return {
        push
    }
}());
