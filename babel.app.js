/**
 * Created by webhugo on 16-10-14.
 */

require("babel-core/register")({
    "presets": [
        "es2015",
        "stage-0"
    ]
});
require("babel-polyfill");
require("./index.js");
// require('./test/router/user')