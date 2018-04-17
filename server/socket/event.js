/**
 * Created by webhugo on 12/27/16.
 * @modify by liuchaorun on 4/16/2018
 */
// 引入 events 模块
const events = require('events');
// 创建 eventEmitter 对象
const event = new events.EventEmitter();

event.on("new message",function (data) {

});


module.exports = event;

