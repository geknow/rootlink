/**
 * Created by webhugo on 12/27/16.
 */
var inflate = require('inflation');
var raw     = require('raw-body');
const parseString = require('xml2js').parseString;

let xml = (req) => {
    return raw(inflate(req), 'utf-8', function (err, string) {
        return parseString(string);
    });
};
module.exports = {
    xml
};
