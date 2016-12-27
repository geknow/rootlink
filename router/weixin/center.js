/**
 * Created by webhugo on 12/27/16.
 */
const Signature = require('../../package.json').signature;
const responser = require('./../../lib/responser');


module.exports = router => {
    router.get("/weixin/getAuthentic", async (ctx, next) => {
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
};