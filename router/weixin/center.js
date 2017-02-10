/**
 * Created by webhugo on 12/27/16.
 */
const responser = require('./../../lib/responser');
const WeixinConfig = require('../../config/config').weixin;
const request = require('superagent');
const xml = require('../../lib/xml');
let crypto = require("crypto");
const js2xmlparser = require("js2xmlparser");
let logger = require("../../log/index").logger;

const checkSignature = function (query) {
    let timestamp = query.timestamp
        , nonce = query.nonce
        , signature = query.signature;

    let tmpArr = [timestamp, nonce, WeixinConfig.signature];
    tmpArr.sort();
    let tmpStr = `${tmpArr[0]}${tmpArr[1]}${tmpArr[2]}`;

    const hash = crypto.createHash("sha1");
    let encrypted = hash.update(tmpStr, "utf8").digest("hex");
    return encrypted === signature;
};


module.exports = router => {
    /**
     * 微信测试接口 GET
     */
    router.get("/weixin", async(ctx, next) => {
        logger.debug("Authentic");
        let query = ctx.request.query;
        let echostr = query.echostr;
        ctx.body = checkSignature(query) ? echostr : "invalid";
    });

    /**
     * 与微信服务器交互的接口 POST
     * 信息 语音 事件
     */
    router.post("/weixin", async(ctx, next) => {
        let data = await xml(ctx);
        logger.debug(data);
        logger.debug(data.xml.MsgType);
        let type = data.xml.MsgType;
        if (type == "text") {//文本信息
            let returnData = {
                ToUserName: data.xml.FromUserName,
                FromUserName: data.xml.ToUserName,
                CreateTime: new Date().getTime(),
                MsgType: "text",
                Content: "小主,你好"
            };
            ctx.body = js2xmlparser.parse("xml", returnData);
            // ctx.body = ""
        } else if (type == "voice") {//语音信息
            let returnData = {
                ToUserName: data.xml.FromUserName,
                FromUserName: data.xml.ToUserName,
                CreateTime: new Date().getTime(),
                MsgType: "text",
                Content: "语音无法识别"
            };
            ctx.body = js2xmlparser.parse("xml", returnData);
            // ctx.body = ""
        } else if (type == "event" || data.Event == "subscribe") {//初次关注
            let returnData = {
                ToUserName: data.xml.FromUserName,
                FromUserName: data.xml.ToUserName,
                CreateTime: new Date().getTime(),
                MsgType: "text",
                Content: "谢谢关注"
            };
            ctx.body = js2xmlparser.parse("xml", returnData);
            // ctx.body = ""
        }
        else {//其他信息忽略
            ctx.body = "";
        }
    });
    /**
     * 获取access_token，一般情况下不调用
     */
    router.get("/weixin/getAccess_token", async(ctx, next) => {
        var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' +
            WeixinConfig.AppID + '&secret=' + WeixinConfig.AppSecret;
        request.get(url)
            .end((e, res) => {
                if (e)
                    logger.debug(e);
                else
                    logger.debug(res.body);
            })
    });

    /**
     * 微信和网页账号绑定
     */
    router.get("/weixin/lock", async(ctx, next) => {
        let query = ctx.request.query;
        let code = query.code;
        let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${WeixinConfig.AppID}&secret=${WeixinConfig.AppSecret}&code=${code}&grant_type=authorization_code`
        await new Promise((resolve,reject) => {
            request.get(url)
                .end((err, res) => {
                    resolve(res.text);
                });
        }).then((text) => {
            logger.debug(text);
            text = JSON.parse(text);
            let openId = text.openid;//得到用户的openId，和用户的邮箱绑定起来
            logger.debug(openId);
        });
        ctx.body = "绑定"
    })
};