/**
 * Created by webhugo on 2/3/17.
 */
var common = require('./common');

var evalString = '';
Object.keys(common).forEach((e,i) => {
    evalString += `var ${e} = common.${e};`;
});
if(typeof(evalString) !== 'undefined' || evalString !== null){
    eval(evalString);
}

var topicId;

describe('Forum', function () {
    this.timeout(7000);     // extend timeout

//     describe("getForumAll()", function () {
//         it("getForumAll", function (done) {
//             agent.get('localhost:' + config.server.port + '/api/forum/index')
//
//                 .end((err, res) => {
//                     if (!err && !res.body.error)
//                         done();
//                 })
//         })
//     });
//
//     describe("addTopic()", function () {
//         it("addTopic", function (done) {
//             agent.post('localhost:' + config.server.port + '/api/forum/addTopic')
//                 .send({
//                     text: "addtopic"
//                 })
//                 .end((err, res) => {
//                     if (!err && !res.body.error)
//                         done();
//                     topicId = res.body.msg.PostId;
//                 })
//         })
//     });
//
//
//     describe("addComment()", function () {
//         it("addComment", function (done) {
//             agent.post('localhost:' + config.server.port + '/api/forum/addComment')
//                 .send({
//                     text: "addComment",
//                     id: topicId,
//                     type: 1
//                 })
//                 .end((err, res) => {
//                     if (!err && !res.body.error)
//                         done();
//                 })
//         })
//     });
//
//
//     describe("getComment()", function () {
//         it("getComment", function (done) {
//             agent.get('localhost:' + config.server.port + '/api/forum/getComment?id=' + topicId)
//                 .end((err, res) => {
//                     if (!err && !res.body.error)
//                         done();
//                 })
//         })
//     });
});