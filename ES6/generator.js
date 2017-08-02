/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/8/2.
 */

/**
 Generator 函数的语法
 */
// Generator 函数有多种理解角度。
// 从语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。


// 执行 Generator 函数会返回一个遍历器对象，
// 也就是说，Generator 函数除了状态机，
// 还是一个遍历器对象生成函数。
// 返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

// 形式上，Generator 函数是一个普通函数，
// 但是有两个特征。
// 一是，function关键字与函数名之间有一个星号；
// 二是，函数体内部使用yield表达式，
// 定义不同的内部状态（yield在英语里的意思就是“产出”）。


function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw = helloWorldGenerator();

hw.next();
// { value: 'hello', done: false }

hw.next();
// { value: 'world', done: false }

hw.next();
// { value: 'ending', done: true }

hw.next();
// { value: undefined, done: true }



function* f() {
    console.log('执行了！')
}

var generator = f();

setTimeout(function () {
    generator.next()
}, 2000);

// 上面代码中，函数f如果是普通函数，在为变量generator赋值时就会执行。
// 但是，函数f是一个 Generator 函数，就变成只有调用next方法时，函数f才会执行。

// yield表达式如果用在另一个表达式之中，必须放在圆括号里面。

function* demo() {
    console.log('Hello' + yield); // SyntaxError
    console.log('Hello' + yield 123); // SyntaxError

    console.log('Hello' + (yield)); // OK
    console.log('Hello' + (yield 123)); // OK
}
// yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。

function* demo1() {
    foo(yield 'a', yield 'b'); // OK
    let input = yield; // OK
}


/*
 与 Iterator 接口的关系
 */

var myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};

[...myIterable]; // [1, 2, 3]

// Generator 函数赋值给Symbol.iterator属性，
// 从而使得myIterable对象具有了 Iterator 接口，
// 可以被...运算符遍历了。


// for...of 循环
// for...of循环可以自动遍历 Generator 函数时生成的Iterator对象，且此时不再需要调用next方法。

function *foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}

for (let v of foo()) {
    console.log(v);
}
// 1 2 3 4 5

// 这里需要注意，一旦next方法的返回对象的done属性为true，
// for...of循环就会中止，且不包含该返回对象，
// 所以上面代码的return语句返回的6，
// 不包括在for...of循环之中。


// 加上遍历器接口的另一种写法是，
// 将 Generator 函数加到对象的Symbol.iterator属性上面。
function* objectEntries() {
    let propKeys = Object.keys(this);

    for (let propKey of propKeys) {
        yield [propKey, this[propKey]];
    }
}

let jane = { first: 'Jane', last: 'Doe' };

jane[Symbol.iterator] = objectEntries;

for (let [key, value] of jane) {
    console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe

// 如果 Generator 函数内部有try...finally代码块，
// 那么return方法会推迟到finally代码块执行完再执行。
function* numbers () {
    yield 1;
    try {
        yield 2;
        yield 3;
    } finally {
        yield 4;
        yield 5;
    }
    yield 6;
}
var g = numbers();
g.next(); // { value: 1, done: false }
g.next(); // { value: 2, done: false }
g.return(7); // { value: 4, done: false }
g.next(); // { value: 5, done: false }
g.next();// { value: 7, done: true }


// 这个就需要用到yield*表达式，
// 用来在一个 Generator 函数里面执行另一个 Generator 函数。
function* foo() {
    yield 'a';
    yield 'b';
}

function* bar() {
    yield 'x';
    yield* foo();
    yield 'y';
}

// 等同于
function* bar() {
    yield 'x';
    yield 'a';
    yield 'b';
    yield 'y';
}

// 等同于
function* bar() {
    yield 'x';
    for (let v of foo()) {
        yield v;
    }
    yield 'y';
}

for (let v of bar()){
    console.log(v);
}
// "x"
// "a"
// "b"
// "y"

// 从语法角度看，如果yield表达式后面跟的是一个遍历器对象，
// 需要在yield表达式后面加上星号，表明它返回的是一个遍历器对象。
// 这被称为yield*表达式。

/*
 Generator 函数的this
 */
function* gen() {
    this.a = 1;
    yield this.b = 2;
    yield this.c = 3;
}

function F() {
    return gen.call(gen.prototype);
}

var f = new F();

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a; // 1
f.b; // 2
f.c; // 3

// Ajax 是典型的异步操作，
// 通过 Generator 函数部署 Ajax 操作，可以用同步的方式表达。

function* main() {
    var result = yield request("http://some.url");
    var resp = JSON.parse(result);
    console.log(resp.value);
}

function request(url) {
    makeAjaxCall(url, function(response){
        it.next(response);
    });
}

var it = main();
it.next();