/**
 * Created by webhugo on 16-10-16.
 */
var db = require('./index.js');
var co = require('co');

var util = require('util');
var utilx = require('../lib/utilx');
var config = require('../config/config');
var url = require('url');



function *addUser() {
    for (var i = 0; i < 5; i++) {
        var user = {
            username: 'name' + i,
            password: '123',
            email: i + "@qq.com",
            desc: "一些介绍",
            type: i % 2,
            avatar: '/default_avatar.jpg',
            key: utilx.getRandomString(6)
        };
        yield db.models.User.create(user);
    }
}


function *addBlog() {
    for (var i = 0; i < 5; i++) {
        var blog = {
            text: "blog text" + i,
            name: "blog name" + i,
            title: "blog title" + i,
            label: "blog label" + i,
        };
        yield db.models.Blog.create(blog);
    }
}

function *addDevice() {
    for (var i = 0; i < 5; i++) {
        var device = {
            name: "name" + i,
            label: i,
            UserId: 1
        };
        yield db.models.Device.create(device);
    }
}
function *addSensor() {
    for (var i = 0; i < 5; i++) {
        var sensor = {
            name: "name" + i,
            label: i,
            DeviceId: 1,
            value: 1
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
