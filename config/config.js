/**
 * Created by webhugo on 16-10-14.
 */
var path = require('path');
var fs = require('fs');

let config = {
    db: {
        name: 'postgres',
        username: 'postgres',
        host: "localhost",
        pwd: 'csc',
        database: 'yeelink',
        toString() {
            return `${this.name}://${this.username}:${this.pwd}@${this.host}/${this.database}`;
        }
    },

    log: {
        _dir: undefined,
        dir() {
            if (!this._dir) {
                this._dir = path.join(__dirname, '..', 'log');
            }
            return this._dir;
        },
        access() {
            return path.join(this.dir(), 'acces.log');
        },
        error() {
            return path.join(this.dir(), 'error.log');
        }
    },
    redis: {
        port: '6379',
        //host: '182.92.203.172',
        host: '127.0.0.1',
        pwd: ''
    },
    root: __dirname + '/../',
    server: {
        ip: '210.30.100.4',
        port: '6743'
    },
    mailOptions: {
        host: "smtp.yeah.net",
        secureConnection: true, // 使用 SSL
        port: 465, // SMTP 端口
        auth: {
            user: "ouredaeducation@yeah.net",
            pass: "oureda123456"
        }
    },
    mailInfo: (link, address) => {
        return {
            from: "OurEDA <ouredaeducation@yeah.net>", // 发件地址
            to: address, // 收件列表 example: "2838890xx@qq.com, minimixx@126.com"
            subject: "您还差一步就完成注册，请使用下面的链接激活您的帐户", // 标题
            html: `<div style="text-indent: 2em;`
            + `min-height: 500px;`
            + `font-family:MicrosoftYaHei,微软雅黑,MicrosoftJhengHei,华文细黑,STHeiti,MingLiu;`
            + `background: -webkit-gradient(white,darkseagreen);`
            + `background: -moz-gradient(white,darkseagreen);`
            + `background: -o-gradient(white,darkseagreen);`
            + `background: linear-gradient(white,darkseagreen);"><h1>欢迎使用OurEDA Bag</h1>`
            + `<p>${link}</p><p>若您不知道这封邮件从何而来`
            + `, 请将其忽略, 对给您带来的不便深表歉意.</p></div>` // html 内容
        };
    },
    Jpush: {
        appKey:" 69f971273db1f9ead66a524d",
        masterSecret: "7a45e7ee58dc2c8187e68f08"
    },
    videoUrl: {
        url: "http://210.30.100.4/static"
    }
};

if (process.env.NODE_ENV == 'development') {
    config.db.host = '210.30.100.4';
    config.server.ip = '127.0.0.1';
    config.server.port = '3000';
}

module.exports = config;