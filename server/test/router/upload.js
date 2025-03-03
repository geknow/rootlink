/**
 * Created by webhugo on 4/21/17.
 */

var common = require('./common');
var ip = common.ip;

var evalString = '';
Object.keys(common).forEach((e,i) => {
    evalString += `var ${e} = common.${e};`;
});
if(typeof(evalString) !== 'undefined' || evalString !== null){
    eval(evalString);
}


var request = require("request");
request = request.defaults({jar: true})
var fs = require("fs");
var path = require("path");



describe('uploadImage', function () {
    this.timeout(7000);     // extend timeout
    describe("uploadImage()", function () {
        it("uploadImage", function (done) {
            var url = "http://"+ip+":" + config.server.port + '/api/uploadImage';
            request.post({
                url,
                formData: {
                    "image": fs.createReadStream(path.join(__dirname, '../img/a.jpg')),
                    name: "haha"
                },
                json: true
            }, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error('upload failed:', err);
                } else {
                    console.log('Upload successful!  Server responded with:', body);
                    done()
                }

            });
        })
    });

});
