/**
 * Created by webhugo on 12/25/16.
 */
const config = require('./../../config/config');
const userTest = require('./user');
let agent = require('superagent').agent();
var getBlog = () => {
    agent.get('localhost:' + config.server.port + '/blog/index')
        .end((err, res)=> {
            if (err)
                console.log('Error : ' + err);
            else {
                console.log(res.body);
            }
        });
};

var addBlog = (loginToken) => {
    agent.post('localhost:' + config.server.port + '/blog/add')
        // .set('Cookie', loginToken)
        // .set('Accept', 'application/json')
        .send({
            text: "haha"
        })
        .end((err, res) => {
          
            if (err)
                console.log("Error: " + err);
            else
                console.log(res.body);
        })
};
new Promise((resolve, reject)=> {
    resolve(userTest.login());
}).then((LoginToken) => {
    addBlog(LoginToken);
});



