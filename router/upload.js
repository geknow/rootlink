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
var Course = db.models.Course;
var responser = require('../lib/responser');

var uploadDir = path.join('/home/user/static');//同时创建public和upload会出错，得先有public文件夹

var newFileName = (filename) => {
    var ret;
    do {
        filename = filename.replace(/\s+/g, "");
        var newfilename = `${utilx.randomNum(6)}-${filename}`;
        ret = path.join(uploadDir, newfilename);
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

module.exports = (router) => {

    router.post('/admin/course/upload', upload.single('course'), async(ctx, next) => {
        console.log('/course/upload');
        var newname = ctx.req.file.filename;
        var size = ctx.req.file.size;
        size = size / 1E+6;
        var body = ctx.req.body;
        var title = body.title;
        var difficulty = utilx.leftOrRight(body.difficulty, 1);
        var description = utilx.leftOrRight(body.description, "none");
        var teacher = body.teacher;
        var cover = utilx.leftOrRight(body.cover, "none");
        var location = url.resolve("http://" + config.server.ip + ":" + config.server.port, "/static/" + newname);
        var course = {
            title,
            difficulty,
            description,
            teacher,
            cover,
            location,
            size
        };
        try {
            var c = await Course.create(course);
        } catch (e) {
            responser.catchErr(ctx, e, 0);
            return;
        }
        course.id = c.id;
        responser.success(ctx, course);
    })
};