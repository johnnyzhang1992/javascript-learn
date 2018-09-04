/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/7/27.
 */
// Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，
// 所以属于一种“元编程”（meta programming），即对编程语言进行编程。
//
// Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，
// 都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，
// 用在这里表示由它来“代理”某些操作，可以译为“代理器”

// ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

// var proxy = new Proxy(target, handler);

// Proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。
// 其中，new Proxy()表示生成一个Proxy实例，
// target参数表示所要拦截的目标对象，
// handler参数也是一个对象，用来定制拦截行为。


var proxy = new Proxy({}, {
    get: function(target, property) {
        return 35;
    }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35

// Proxy 实例也可以作为其他对象的原型对象。
var proxy1 = new Proxy({}, {
    get: function(target, property) {
        return 35;
    }
});

let obj = Object.create(proxy1);
console.log(obj.time); // 35
// 上面代码中，proxy对象是obj对象的原型，obj对象本身并没有time属性
// 所以根据原型链，会在proxy对象上读取该属性，导致被拦截。

var handler = {
    get: function(target, name) {
        if (name === 'prototype') {
            return Object.prototype;
        }
        return 'Hello, ' + name;
    },

    apply: function(target, thisBinding, args) {
        return args[0];
    },

    construct: function(target, args) {
        return {value: args[1]};
    }
};

var fproxy = new Proxy(function(x, y) {
    return x + y;
}, handler);

fproxy(1, 2); // 1 //apply()
new fproxy(1,2); // {value: 2} //construct()
fproxy.prototype === Object.prototype; // true
fproxy.foo; // "Hello, foo" //get()


/*
get()
*/

// get方法用于拦截某个属性的读取操作。上文已经有一个例子，下面是另一个拦截读取操作的例子。

var person = {
    name: "张三"
};

var proxy = new Proxy(person, {
    get: function(target, property) {
        if (property in target) {
            return target[property];
        } else {
            throw new ReferenceError("Property \"" + property + "\" does not exist.");
        }
    }
});

proxy.name;// "张三"
// proxy.age; // 抛出一个错误

/*
// set()
 */

let validator = {
    set: function(obj, prop, value) {
        if (prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer');
            }
            if (value > 200) {
                throw new RangeError('The age seems invalid');
            }
        }

        // 对于满足条件的 age 属性以及其他属性，直接保存
        obj[prop] = value;
    }
};

let person1 = new Proxy({}, validator);

person1.age = 100;

console.log(person1.age) ;// 100
console.log(person1);
// person1.age = 'young' ;// 报错 TypeError: The age is not an integer
// person1.age = 300 ;// 报错 RangeError: The age seems invalid

/*
has()
 */
// has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。

let stu1 = {name: '张三', score: 59};
let stu2 = {name: '李四', score: 99};

let handler1 = {
    has(target, prop) {
        if (prop === 'score' && target[prop] < 60) {
            console.log(`${target.name}的分数是\'${target.score}\':不及格`);
            return false;
        }
        return prop in target;
    }
};

let oproxy1 = new Proxy(stu1, handler1);
let oproxy2 = new Proxy(stu2, handler1);

console.log('score' in oproxy1);
// 张三 不及格
// false
console.log('score' in oproxy2);
// true
for (let a in oproxy1) {
    console.log(oproxy1[a]);
    //张三
    // 59
}
// 张三
// 59

/*
ownKeys()
 */
//ownKeys方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。

// Object.getOwnPropertyNames()
// Object.getOwnPropertySymbols()
// Object.keys()
// for...in循环

let target = {
    a: 1,
    b: 2,
    c: 3
};

let handler2 = {
    ownKeys(target) {
        return ['a'];
    }
};

let proxy3 = new Proxy(target, handler2);

console.log(Object.keys(target));//[ 'a', 'b', 'c' ]
console.log(Object.keys(proxy3)); // ['a'] 被拦截替换了原始真实数据

//注意，使用Object.keys方法时，有三类属性会被ownKeys方法自动过滤，不会返回。
//
// 目标对象上不存在的属性
// 属性名为 Symbol 值
// 不可遍历（enumerable）的属性