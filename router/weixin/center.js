/**
 * Created by webhugo on 12/27/16.
 */
const Signature = require('../../package.json').signature;
const responser = require('./../../lib/responser');
const WeixinConfig = require('../../config/config').weixin;
const request = require('superagent');

module.exports = router => {
    router.get("/weixin/getAuthentic", async(ctx, next) => {
        console.log("Authentic");
        let query = ctx.request.query;
        let signature = query.signature;
        let timestamp = query.timestamp;
        let nonce = query.nonce;
        let echostr = query.echostr;
        // if(signature != Signature){
        //     responser.reject(ctx);
        //     return;
        // }
        let context = "<xml>"+
            "<ToUserName><![CDATA[toUser]]></ToUserName>"+
            "<FromUserName><![CDATA[fromUser]]></FromUserName>"+
            "<CreateTime>12345678</CreateTime>"+
            "<MsgType><![CDATA[text]]></MsgType>"+
            "<Content><![CDATA[你好]]></Content>"+
            "</xml>";
        console.log(context);
        ctx.body = context;
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