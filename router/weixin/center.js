/**
 * Created by webhugo on 12/27/16.
 */
const Signature = require('../../package.json').signature;
const responser = require('./../../lib/responser');
const WeixinConfig = require('../../config/config').weixin;
const request = require('superagent');
const xml = require('../../lib/xml');
var crypto = require("crypto");

const checkSignature = function (query) {
    var timestamp = query.timestamp
        , nonce = query.nonce
        , signature = query.signature;

    var tmpArr = [timestamp, nonce, Signature];
    tmpArr.sort();
    var tmpStr = `${tmpArr[0]}${tmpArr[1]}${tmpArr[2]}`;

    const hash = crypto.createHash("sha1");
    var encrypted = hash.update(tmpStr, "utf8").digest("hex");
    return encrypted === signature;
};

module.exports = router => {
    router.get("/weixin", async(ctx, next) => {
        console.log("Authentic");
        let query = ctx.request.query;
        let echostr = query.echostr;
        ctx.body = checkSignature(query) ? echostr : "invalid";
    });


    router.post("/weixin", async(ctx, next) => {
        let data = await xml(ctx);
        console.log(data);
        if (data.MsgType == "text") {//文本信息

        }else if(data.MsgType == "voice"){//语音信息

        }else{//其他信息忽略
            ctx.body = "";
        }
        ctx.body = "";
    });

    router.get("/weixin/getAccess_token", async(ctx, next) => {
        var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' +
            WeixinConfig.AppID + '&secret=' + WeixinConfig.AppSecret;
        request.get(url)
            .end((e, res) => {
                if (e)
                    console.log(e);
                else
                    console.log(res.body);
            })
    })
};