/**
 * Created by webhugo on 12/27/16.
 */
var raw = require("raw-body");
var inflate = require("inflation");
var bluebird = require("bluebird");
var parseString = bluebird.promisify(require("xml2js").parseString);    // promise 化

module.exports = (req, opts) => {
    req = req.req || req;
    opts = opts || {};

    var len = req.headers["content-length"];
    var encoding = req.headers["content-encoding"] || "identity";
    if (len && encoding === "identity") opts.length = len = ~~len;
    opts.encoding = opts.encoding || "utf8";
    opts.limit = opts.limit || "1mb";
    var strict = opts.strict !== false;

    // raw-body returns a promise when no callback is specified
    return raw(inflate(req), opts)
        .then(function(str) {
            try {
                return parseString(str);
            } catch (err) {
                err.status = 400;
                err.body = str;
                throw err;
            }
        });
};
