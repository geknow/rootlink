/**
 * Created by webhugo on 12/27/16.
 */
const Signature = require('../../package.json').signature;
const responser = require('./../../lib/responser');
const WeixinConfig = require('../../config/config').weixin;
const request = require('superagent');
const xml2js = require('xml2js');

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
        ctx.body = echostr;
    });


    router.post("/weixin/getAuthentic", async (ctx, next) => {
        let body = ctx.request.body;

        var extractedData = "";
        var parser = new xml2js.Parser();
        parser.parseString(body, function(err,result){
            console.log(result);
            extractedData = result['MsgType'];
        });
        console.log(extractedData);
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