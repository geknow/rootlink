/**
 * Created by webhugo on 16-10-7.
 */
var fs = require('fs');
var path = require('path');

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

    var PostCtx = (ctx, property) => {

        if (ctx.request.body[property])
            return ctx.request.body[property];
        else
            return ctx.req.body[property];
    };

    return {
        autoImport,
        randomNum,
        PostCtx
    }
}());

module.exports = utilx;