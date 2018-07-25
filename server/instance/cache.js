/**
 * Created by webhugo on 16-10-14.
 */
var redis = require('redis');
var redisCoWrapper = require('co-redis');
var logger = require("../log/index").logger;

// var log = require('./log');
var globalConfig = require('../config/config');
var util = require('util');

var client = redis.createClient(
    globalConfig.redis.port,
    globalConfig.redis.host,
    {
        auth_pass: globalConfig.redis.pwd
    }
);

client.on('error', function (err) {
    // log.error('Error', err, new Date());
});

// add key prefix
var commands = ['set', 'setex', 'get', 'expire', 'del'];

commands.forEach(function (cmd) {
    var oldCmd = `_${cmd}`;
    client[oldCmd] = client[cmd];
    client[cmd] = function (key, arg, cb) {
        arguments[0] = `yeelink/${arguments[0]}`;
        return client[oldCmd].apply(this, arguments);
    };
});

client.jsetex = (key, expire, val, callback) => {
    return client.setex(key, expire, JSON.stringify(val), callback);
};


var redisCo = redisCoWrapper(client);
// json get
redisCo.jget = async function (key) {
    var val = await redisCo.get(key);
    //noinspection JSUnresolvedFunction
    return util.isNullOrUndefined(val) ? val : JSON.parse(val);
};
redisCo.del = async function (key) {
    try {
        logger.debug("del");
        // await redisCo.del(key);
        await redisCo.set(key, undefined);
        logger.debug("delOver")
    } catch (e) {
        logger.error(e);
        return false;
    }
    return true;
};

redisCo._client = client;


module.exports = redisCo;