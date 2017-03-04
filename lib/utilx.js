/**
 * Created by webhugo on 16-10-7.
 */
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var signature = require('../package.json').signature;

var utilx = (function () {

    var autoImport = (nextPath, callback) => {
        var isDir = fs.statSync(nextPath).isDirectory();
        if (isDir) {
            fs
                .readdirSync(nextPath)
                .filter((file) => {
                    return file != "index.js" && file !== "migrate.js" && file.indexOf(".") !== 0;
                }).forEach((filename) => {
                var tmpPath = path.join(nextPath, filename);
                if (fs.statSync(tmpPath).isDirectory()) {
                    autoImport(tmpPath, callback);
                } else {
                    callback(tmpPath);
                }
            })
        }
    };
    var randomNum = (length) => {
        return Math.random().toString(10).substring(2, 2 + length);
    };

    /**
     * 将不定的参数用对称加密的方法加密，返回token
     * @param params
     * @returns {Promise.<Array.<affectedCount, affectedRows>>|*}
     */
    var generatorToken = (...params) => {
        var str = params[0];
        params.forEach((ele, i) => {
            if (i == 0)
                return;
            str += '&' + ele;
        });
        var cipher = crypto.createCipher('aes192', signature);
        var token = cipher.update(str, 'utf8', 'hex');
        token += cipher.final('hex');
        return token;
    };
    /**
     * 解密得到token的信息
     * @param encrypted
     * @returns {Array|*}
     */
    var getTokenInfo = (encrypted) => {
        var decipher = crypto
            .createDecipher('aes192', signature);
        var decrypted = decipher
            .update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted.split('&');
    };
    var getRandomString = (length = 6) => {
        let str = "qwertyuiopasdf1234567890ghjklzxcvbnm";
        let temp = "";
        if (length > 35 || length < 3) {//长度只能是3-10
            length = 6;
        }
        for (let i = 0; i < length; i++) {
            let random = Math.random().toString().substr(6, 4);
            random = parseInt(random) % str.length;
            temp += str[random];
        }
        return temp;
    };
    let ObjectClone = (obj) => {
        let newObj = {};
        Object.keys(obj).forEach((e, i) => {
            newObj[e] = obj[e];
        });
        return newObj;
    };

    function isEmptyObject(e) {
        var t;
        for (t in e)
            return !1;
        return !0
    }

    return {
        isEmptyObject,
        autoImport,
        randomNum,
        generatorToken,
        getTokenInfo,
        ObjectClone,
        getRandomString
    }
}());

module.exports = utilx;