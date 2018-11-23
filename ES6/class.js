/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/8/21.
 */
//定义类
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}
let p = new Point(1, 2);
console.log(`x=${p.x},y=${p.y}`);
console.log(p.toString());

// 上面代码定义了一个“类”，可以看到里面有一个constructor方法，这就是构造方法，
// 而this关键字则代表实例对象。
// 也就是说，ES5 的构造函数Point，对应 ES6 的Point类的构造方法

// class Point {
//     constructor() {
//         // ...
//     }
//
//     toString() {
//         // ...
//     }
//
//     toValue() {
//         // ...
//     }
// }

// 等同于

// Point.prototype = {
//     constructor() {},
//     toString() {},
//     toValue() {},
// };
// 在类的实例上面调用方法，其实就是调用原型上的方法。

// class B {}
// let b = new B();
//
// b.constructor === B.prototype.constructor; // true


// constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
// 一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。

// class Point1 {
//
// }
//
// // 等同于
// class Point1 {
//     constructor() {}
// }

// 类必须使用new调用，否则会报错。
// 这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。

/*采用 Class 表达式，可以写出立即执行的 Class。*/

let person = new class {
    constructor(name) {
        this.name = name;
    }

    sayName() {
        console.log(this.name);
    }
}('张三');

person.sayName(); // "张三"
// 上面代码中，person是一个立即执行的类的实例。

// this 的指向
// 类的方法内部如果含有this，它默认指向类的实例

// 一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。

// class Logger {
//     constructor() {
//         this.printName = this.printName.bind(this);
//     }
//
//     // ...
// }

// 另一种解决方法是使用箭头函数。

// class Logger {
//     constructor() {
//         this.printName = (name = 'there') => {
//             this.print(`Hello ${name}`);
//         };
//     }
//
//     // ...
// }

// 还有一种解决方法是使用Proxy，获取方法的时候，自动绑定this。

// function selfish (target) {
//     const cache = new WeakMap();
//     const handler = {
//         get (target, key) {
//             const value = Reflect.get(target, key);
//             if (typeof value !== 'function') {
//                 return value;
//             }
//             if (!cache.has(value)) {
//                 cache.set(value, value.bind(target));
//             }
//             return cache.get(value);
//         }
//     };
//     const proxy = new Proxy(target, handler);
//     return proxy;
// }

// const logger = selfish(new Logger());

/**
 * 继承
 */
class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y); // 调用父类的constructor(x, y)
        this.color = color;
    }

    toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
}
let color_pointer = new ColorPoint(1,2,'red');
console.log(color_pointer.x,color_pointer.y,color_pointer.toString());
console.log(color_pointer instanceof ColorPoint);
// 上面代码中，constructor方法和toString方法之中，都出现了super关键字，
// 它在这里表示父类的构造函数，用来新建父类的this对象。
//
// 子类必须在constructor方法中调用super方法，否则新建实例时会报错。


// 如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。
// 也就是说，不管有没有显式定义，任何一个子类都有constructor方法。

// class ColorPoint extends Point {
// }
//
// // 等同于
// class ColorPoint extends Point {
//     constructor(...args) {
//         super(...args);
//     }
// }
//
// 由于绑定子类的this，所以如果通过super对某个属性赋值，
// 这时super就是this，赋值的属性会变成子类实例的属性。

// 父类的静态方法，也会被子类继承。

class A {
    constructor() {
        this.x = 111;
    }
}


class B extends A {
    constructor() {
        super();
        this.x = 212;
        super.x = 323; // this.x = 323
        console.log('super:'+super.x); // undefined //==A.prototype.x
        console.log('this:'+this.x); // browser 323 editor 212
    }
}

let b = new B();

// super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
class A1 {
    constructor(){
        this.sayHello = 'hello'
    }
    p1() {
        return 2222;
    }
}

class B1 extends A1 {
    constructor() {
        super();
        console.log(super.p1()); // 2
        console.log(super.sayHello); //undefined
        console.log(this.sayHello) // 'hello'
    }
}

let b1 = new B1();
// 上面代码中，super.x赋值为3，这时等同于对this.x赋值为3。
// 而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。

// 由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。

Object.setPrototypeOf(B.prototype, A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;

Object.setPrototypeOf(B, A);
// 等同于
B.__proto__ = A;

// 这两条继承链，可以这样理解：
// 作为一个对象，子类（B）的原型（__proto__属性）是父类（A）；
// 作为一个构造函数，子类（B）的原型对象（prototype属性）是父类的原型对象（prototype属性）的实例

let p1 = new Point(2, 3);
let p2 = new ColorPoint(2, 3, 'red');

console.log(p2.__proto__ === p1.__proto__ );// false
console.log(p2.__proto__.__proto__ === p1.__proto__ );// true

/**
 *
 * @param mixins
 * @returns {Mix}
 */
// Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。
// Mixin 模式指的是，将多个类的接口“混入”（mix in）另一个类。它在 ES6 的实现如下。

function mix(...mixins) {
    class Mix {}

    for (let mixin of mixins) {
        copyProperties(Mix, mixin);
        copyProperties(Mix.prototype, mixin.prototype);
    }

    return Mix;
}

function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if ( key !== "constructor"
            && key !== "prototype"
            && key !== "name"
        ) {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}
// 上面代码的mix函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。

// class DistributedEdit extends mix(Loggable, Serializable) {
//     // ...
// }