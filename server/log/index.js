/**
 * Created by webhugo on 16-11-20.
 */
var log4js = require("log4js");
var DEBUG = require("../config/config").debug;
log4js.configure({

    appenders: [
        {
            type: 'console',
            category: "console"

        }, //控制台输出
        {
            type: "file",
            filename: 'log/log.log',
            pattern: "_yyyy-MM-dd",
            maxLogSize: 20480,
            backups: 3,
            category: 'dateFileLog'

        }//日期文件格式
    ],
    replaceConsole: true,   //替换console.log
    levels: {
        dateFileLog: 'error',
        console: DEBUG ? 'debug' : 'error'
    }
});


var dateFileLog = log4js.getLogger('dateFileLog');
var consoleLog = log4js.getLogger('console');
//不同模式对应不同
let env = process.env.NODE_ENV;

exports.logger = env == "production" ? dateFileLog : consoleLog;

exports.use = function (app) {
    app.use(log4js.connectLogger(dateFileLog, {level: 'DEBUG', format: ':method :url'}));
};
