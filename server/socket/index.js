/**
 * Created by webhugo on 12/26/16.
 * @modify by liuchaorun on 16/4/2018
 */
let server = require('../index').server;
let app = require('../index').app;
const io = require('socket.io')(server);
const event = require('./event');
let iots = [];
let sockets = [];
app.locals = {};
app.locals.iots = iots;
app.locals.sockets = sockets;

io.on('connection', function(socket){
    sockets.push(socket);//新添一个链接
    // console.log("new connect");

    /**
     * 利用sensorId标识socket
     */
    socket.on('id', function (data) {
        console.log(id + 'connect');
        iots.push({
            id:data,
            socket:socket
        })
    });

    /**
     * 设备下线
     */
    socket.on("stop",function(){
        // console.log("disconnect of iot");
        sockets.splice(sockets.indexOf(socket),1);
        iots.map((name,i)=>{
            if(name.socket===socket){
                iots.splice(i,1);
                console.log(name.id + 'disconnect');
            }
        })
    });
    /**
     * 监听事件new value
     */
    event.on("new value", function (data) {
        //console.log(data);
        iots.map((name)=>{
            if(name.id === data.SensorId){
                name.socket.emit("newValue",data);
                console.log('send to ' + name.id);
            }
        });
    });

    /**
     * 设备下线
     */
    socket.on("disconnect",function(){
        // console.log("disconnect of iot");
        sockets.splice(sockets.indexOf(socket),1);
        iots.map((name,i)=>{
            if(name.socket===socket){
                iots.splice(i,1);
                console.log(name.id + 'disconnect');
            }
        })
    });
});