/**
 * Created by webhugo on 16-10-16.
 */
var db = require('./index.js');
var co = require('co');

var util = require('util');
var utilx = require('../lib/utilx');
var config = require('../config/config');
var url = require('url');


var UserId;
function *addUser() {
    for (var i = 0; i < 5; i++) {
        var user = {
            username: 'name' + i,
            password: utilx.generatorToken("123"),
            email: i + "@qq.com",
            desc: "一些介绍",
            type: 1,
            avatar: '/default_avatar.jpg',
            key: utilx.getRandomString(32)
        };
        user = yield db.models.User.create(user);
        UserId = user.userId;
    }
}


function *addBlog() {
    for (var i = 0; i < 5; i++) {
        var blog = {
            text: "blog text" + i,
            time: "blog time" + i,
            title: "blog title" + i,
            label: "blog label" + i,
        };
        yield db.models.Blog.create(blog);
    }
}
var deviceId ;
function *addDevice() {
    for (var i = 0; i < 5; i++) {
        var device = {
            name: "name" + i,
            description: i,
            UserId: UserId,
        };

        device = yield db.models.Device.create(device);
        deviceId = device.deviceId;
    }
}
function *addSensor() {
    for (var i = 0; i < 5; i++) {
        var sensor = {
            name: "name" + i,
            description: i,
            DeviceId: deviceId,
            value: 1,
            UserId: UserId,
            unit: "经纬度"
        };
        yield db.models.Sensor.create(sensor);
    }
}

function* init() {
    yield db.sync({
        force: true
    });
    yield addUser();
    yield addBlog();
    yield addDevice();
    yield addSensor();
}

co(function*() {
    yield init();
    console.log('finished ...');
}).catch(function () {
    console.log(arguments);
});
