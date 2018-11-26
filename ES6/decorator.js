/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/8/21.
 */
// 基本上，修饰器的行为就是下面这样。

@decorator
class A {}

function decorator(target) {
    target.isTestable = true;
}
// 等同于

// class A {}
// A = decorator(A) || A;
// 注意，修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。

// 修饰器是一个对类进行处理的函数。修饰器函数的第一个参数，就是所要修饰的目标类。

// mixin

function mixins(...list) {
    return function (target) {
        Object.assign(target.prototype, ...list);
    };
}
const Foo = {
    foo() { console.log('foo') }
};

@mixins(Foo)
class MyClass {}


// 通过mixins这个修饰器，实现了在MyClass类上面“混入”Foo对象的foo方法。
let obj = new MyClass();
obj.foo(); // "foo"