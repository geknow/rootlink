/**
 * Created by webhugo on 16-10-16.
 */
var db = require('./index.js');
var co = require('co');

var util = require('util');
var utilx = require('../lib/utilx');
var config = require('../config/config');
var url =  require('url');


function *addUser() {
    for (var i = 0; i < 100; i++) {
        var user = {
            username:'name'+i,
            password:'123',
            email:i+"@qq.com",
            desc: "一些介绍",
            type: i % 2,
            avatar: '/default_avatar.jpg'
        };
        yield db.models.User.create(user);
    }
}

function* init() {
    yield db.sync({
        force: true
    });
    yield addUser();
}

co(function*() {
    yield init();
    console.log('finished ...');
}).catch(function () {
    console.log(arguments);
});
