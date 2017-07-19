/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/7/19.
 */
/**
 * 对象的扩展
 */

// 方法一
obj.foo = true;
// 方法二
obj['a' + 'bc'] = 123;

// ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。
let propKey = 'foo';
let obj = {
    [propKey]: true,
    ['a' + 'bc']: 123
};//Object {foo: true, abc: 123}

/*
Object.assign()
*/
// Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

var target = { a: 1 };

var source1 = { b: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target ;// {a:1, b:2, c:3}
// Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
