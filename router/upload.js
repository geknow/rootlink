/**
 * Created by wenhugo on 16-11-15.
 */
var fs = require('fs');
var os = require('os');
var path = require('path');
var utilx = require('../lib/utilx');
var multer = require('koa-multer');
var auth = require('../helper/auth');
var db = require('../model/index');
db.sync();
var config = require('../config/config');
var url = require('url');
var responser = require('../lib/responser');
let logger = require("../log/index").logger;

var uploadDir = path.join(__dirname, "../public/static");//同时创建public和upload会出错，得先有public文件夹

var newFileName = (filename) => {
    var ret;
    do {
        filename = filename.replace(/\s+/g, "");
        var newfilename = `${utilx.randomNum(6)}-${filename}`;
        ret = path.join(uploadDir);
    } while (fs.exists(ret));
    return {
        filename: newfilename,
        path: ret,
        url: `/upload/${newfilename}`
    };
};

var maxSize = 1000 * 1000 * 1000 * 4;//4G大小

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, newFileName(file.originalname).filename)
    }
});

var upload = multer({
    storage: storage,
    limits: {fileSize: maxSize}
});

var rename = (newname, oldname) => {
    let suffix = oldname.substr(oldname.lastIndexOf("."));
    newname = path.join(uploadDir, newname) + suffix;
    fs.rename(path.join(uploadDir, oldname), newname, function (err) {
        if (err)
            logger.error(err)
    });
    return newname;
};

module.exports = (router) => {

    router.post('/uploadImage', upload.single('image'), async(ctx, next) => {
        logger.debug('/uploadImage');
        let newname = ctx.req.file.filename;
        let name = ctx.req.body.name;
        newname = rename(name, newname);
        let location = url.resolve("http://" + config.server.ip + ":" + config.server.port, "/static/" + newname);
        responser.success(ctx, location);
    })
};