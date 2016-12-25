//返回与HTTP请求状态码兼容的response
const responser = {
    success: (ctx, msg)=> {
        let body = {};
        body.error = null;
        body.status = 200;
        body.msg = msg;
        ctx.body = body;
    },
    //User Invalid Operation
    reject: (ctx, err, status)=> {
        let body = {};
        body.error = "Request Rejected : " + err;
        body.status = Math.floor(status / 100) === 4 ? status : 400;
        body.msg = null;
        ctx.status = body.status;
        ctx.body = body;
    },
    //When catch an error
    catchErr: (ctx, err, status)=> {
        let body = {};
        body.error = "Internal Server Error : " + err ? err.toString().substring(0, 30) : "Unexpected Error";
        body.status = Math.floor(status / 100) === 5 ? status : 500;
        body.msg = null;
        ctx.status = body.status;
        ctx.body = body;
    }
};
/**
 * @type {{success: ((ctx, msg)), reject: ((ctx, err, status)), catchErr: ((ctx, err, status))}}
 * status code:
 * 200-OK
 * 4xx-Invalid Request
 * 400-Bad Request 请求参数或请求格式错误
 * 401-Unauthorized 请求需要的用户状态不正确
 * 403-Forbidden 服务器禁止用户得到响应
 * 5xx-Server Error
 * 500-Internal Server Error
 * (待添加)
 */
module.exports = responser;