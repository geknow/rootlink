/**
 * Created by claim on 16-10-23.
 */
let superagent = require('superagent');
const config = require('./../../config/config');
const baseUrl = `${config.server.ip}:${config.server.port}`;
new Promise((resolve, reject)=> {
    superagent.post(`${baseUrl}/user/login`)
        .send({
            username: 'name0',
            password: '123'
        })
        .end((err, res)=> {
            if (err)
                reject(err);
            try {
                resolve(JSON.parse(res.text).msg.LoginToken);
            } catch (e) {
                reject(e);
            }
        });
}).then(loginToken=> {
    return new Promise((resolve, reject)=> {
        superagent.post(`${baseUrl}/user/notes/add`)
            .send({
                title: 'CSS入门',
                LoginToken: loginToken,
                username: 'name0',
                content: '测试note',
                chapter: '6'
            })
            .end((err, res)=> {
                console.log(res.text);
                if (err)
                    reject(err);
                else
                    resolve(loginToken);
            });
    });
}).then((loginToken)=> {
    return new Promise((resolve, reject)=> {
        superagent.get(`${baseUrl}/user/notes/list`)
            .query({
                title: 'CSS入门',
                LoginToken: loginToken,
                username: 'name0',
                chapter: '6'
            })
            .end((err, res)=> {
                if (err)
                    reject(err);
                else {
                    console.log(res.text);
                    resolve(loginToken);
                }
            });
    });
}).then(loginToken=> {
    return new Promise((resolve, reject)=> {
        superagent.post(`${baseUrl}/user/notes/delete`)
            .query({
                id: 2,
                LoginToken: loginToken,
                username: 'name0',
            })
            .end((err, res)=> {
                if (err)
                    reject(err);
                else {
                    console.log(res.text);
                    resolve(loginToken);
                }
            });
    });
}).catch(e=> {
    console.log(e);
});

