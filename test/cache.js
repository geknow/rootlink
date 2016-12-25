/**
 * Created by claim on 16-10-23.
 */
let cache = require('./../instance/cache');

cache.set('key1', 'value1').then(() => {
});
cache.get('key1').then(value => {
    console.log(value);
});
cache.expire('key1', '10').then((status) => { //The unit of Time is **Second** (not milli)
    console.log(status);
});