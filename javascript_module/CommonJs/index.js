/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/9/5.
 */
require.config({
    // baseUrl: "js/lib",
    paths: {
        "jquery": "../jquery.min",
        // "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min"
    }
});
var math = require('math');
math.add(2,3); // 5
console.log('success!');