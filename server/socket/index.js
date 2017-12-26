/**
 * Created by webhugo on 12/26/16.
 */
var server = require('../index').server;
var app = require('../index').app;
const io = require('socket.io')(server);
var iots = [];
var sockets = [];
app.locals = {};
app.locals.iots = iots;
app.locals.sockets = sockets;

io.on('connection', function(socket){
    sockets.push(socket);//新添一个链接
    // console.log("new connect");

    /**
     * 设备下线
     */
    socket.on("stop",function(){
        // console.log("disconnect of iot");
        sockets.splice(sockets.indexOf(socket),1);
    });

    /**
     * 设备下线
     */
    socket.on("disconnect",function(){
        // console.log("disconnect of iot");
        sockets.splice(sockets.indexOf(socket),1);
    });
});