/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/9/5.
 */
// 如果这个模块还依赖其他模块，那么define()函数的第一个参数，必须是一个数组，指明该模块的依赖性。
define([],function (){
    var add = function (x,y){
        return x+y;
    };
    return {
        add: add
    };
});