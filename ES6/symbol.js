/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2018/8/10.
 */

/*
ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。
它是 JavaScript 语言的第七种数据类型，
前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。
 */

// Symbol 值通过Symbol函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。

let s = Symbol();
console.log(typeof s);// symbol

let s1 = Symbol('foo');
let s2 = Symbol('bar');

console.log(s1) ;// Symbol(foo)
console.log(s2); // Symbol(bar)

s1.toString();// "Symbol(foo)"
s2.toString(); // "Symbol(bar)"

// 如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，
// 将其转为字符串，然后才生成一个 Symbol 值。
const obj = {
    toString() {
        return 'abc';
    }
};
const sym = Symbol(obj);
console.log(sym); // Symbol(abc)


// 作为属性名的 Symbol

let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a1 = {
    [mySymbol]: 'Hello!'
};

// 第三种写法
let a2 = {};
Object.defineProperty(a2, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
console.log(a[mySymbol]); // "Hello!"
console.log(a1[mySymbol]); // "Hello!"
console.log(a2[mySymbol]); // "Hello!"

// 上面代码通过方括号结构和Object.defineProperty，将对象的属性名指定为一个 Symbol 值。

// 注意，Symbol 值作为对象属性名时，不能用点运算符。

let _s = Symbol();

let _obj = {
    [_s]: function (arg) {
        console.log(arg);
    }
};

_obj[_s](123); //123

// 增强的对象写法

// let obj = {
//     [s](arg) { ... }
// };

// Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的。

const log = {};

log.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn')
};
console.log(log.levels.DEBUG, 'debug message');
console.log(log.levels.INFO, 'info message');

// Symbol.for()，Symbol.keyFor()

// 它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。

let s11 = Symbol.for('foo');
let s22 = Symbol.for('foo');

console.log(s11 === s22);// true