/**
 * Created by webhugo on 12/16/16.
 */
/**
 * todo: 事件驱动
 */
var events = require("events");
var eventEmitter = new events.EventEmitter();

/**
 * todo:消息推送
 */
eventEmitter.on("message", ()=> {
    
});

eventEmitter.on("user_login", ()=> {
    
});

module.exports =  eventEmitter;