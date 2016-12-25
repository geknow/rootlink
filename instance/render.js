/**
 * Created by webhugo on 16-10-14.
 */
var coViews = require('co-views');

var root = require('../config/config.js').root;
var viewPath = root + '/view';

var render = coViews(viewPath, {
    map: {
        html: 'ect'
    },
    locals: {
        root: viewPath,
        ext: '.html'
    }
});

module.exports = render;