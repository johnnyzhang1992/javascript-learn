/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/7/27.
 */

// Promise 是异步编程的一种解决方案，
// 比传统的解决方案——回调函数和事件——更合理和更强大。
// 它由社区最早提出和实现，ES6 将其写进了语言标准，
// 统一了用法，原生提供了Promise对象。
//
// 所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件
// （通常是一个异步操作）的结果。
// 从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。
// Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。
//
// Promise对象有以下两个特点。

// （1）对象的状态不受外界影响。Promise对象代表一个异步操作，
// 有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和Rejected（已失败）。
// 只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
// 这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

// （2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，
// 只有两种可能：从Pending变为Resolved和从Pending变为Rejected。只要这两种情况发生，
// 状态就凝固了，不会再变了，会一直保持这个结果。如果改变已经发生了，
// 你再对Promise对象添加回调函数，也会立即得到这个结果。
// 这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

// ES6 规定，Promise对象是一个构造函数，用来生成Promise实例。
//
// 下面代码创造了一个Promise实例。
`var promise = new Promise(function(resolve, reject) {
    // ... some code

    if (/* 异步操作成功 */){
        resolve(value);
    } else {
        reject(error);
    }
});
`;
// Promise构造函数接受一个函数作为参数，
// 该函数的两个参数分别是resolve和reject
// 。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

// resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 Pending 变为 Resolved），
// 在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
// reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 Pending 变为 Rejected），
// 在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

// Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数。

promise.then(function(value) {
    // success
}, function(error) {
    // failure
});

// Promise 新建后就会立即执行。

let promise = new Promise(function(resolve, reject) {
    console.log('Promise');
    resolve();
});
// then()
promise.then(function() {
    console.log('Resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// Resolved

// then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。
// 因此可以采用链式写法，即then方法后面再调用另一个then方法。

const getJSON = function(url) {
    const promise = new Promise(function(resolve, reject){
        const handler = function() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        };
        const client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();

    });

    return promise;
};

getJSON("/posts.json").then(function(json) {
    return json.post;
}).then(function(post) {
    // ...
});
// 上面的代码使用then方法，依次指定了两个回调函数。
// 第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数

/*
 Promise.prototype.catch()
 */
// Promise.prototype.catch方法是.then(null, rejection)的别名，
// 用于指定发生错误时的回调函数。

getJSON('/posts.json').then(function(posts) {
    // ...
}).catch(function(error) {
    // 处理 getJSON 和 前一个回调函数运行时发生的错误
    console.log('发生错误！', error);
});


p.then((val) => console.log('fulfilled:', val))
    .catch((err) => console.log('rejected', err));

// 等同于
p.then((val) => console.log('fulfilled:', val))
    .then(null, (err) => console.log("rejected:", err));


// Promise.race方法同样是将多个Promise实例，包装成一个新的Promise实例。

// var p = Promise.race([p1, p2, p3]);

const p = Promise.race([
    fetch('/resource-that-may-take-a-while'),
    new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('request timeout')), 5000)
    })
]);
p.then(response => console.log(response));
p.catch(error => console.log(error));
// 上面代码中，如果5秒之内fetch方法无法返回结果，
// 变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。

// Promise.resolve();

// Promise.reject();
// Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。

// Promise.try()
// Promise.try(database.users.get({id: userId}))
//     .then(...)
//     .catch(...)
// 事实上，Promise.try就是模拟try代码块，就像promise.catch模拟的是catch代码块。