/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2018/5/24.
 */

/**
 this 对象
 */

//this 对象是在运行时基于函数的执行环境绑定的：
// 在全局函数中，this 等于window；
// 而当this作为某个对象的方法调用时，this等于哪个对象
var name = 'the window';

var object ={
    name : 'My object',
    getName: function () {
        return function () {
            return this.name;
        }
    }
};
// 调用时this无法访问到 object 的值
console.log(object.getName()());// the window // 严格模式 undefined

var object1 = {
    name : 'My object',
    getName: function () {
        var that = this;
        return function () {
            return that.name;
        }
    }
};
// that = object1
console.log(object1.getName()());// My object

var object2 =  {
    name : 'My object2',
    getName: function () {
        return this.name
    }
};
// this = object2
console.log(object2.getName());// My object2