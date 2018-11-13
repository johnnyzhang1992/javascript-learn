/**
 * Created by PhpStorm.
 * Author: johnnyzhang
 * Date: 2018/11/13 11:06 AM
 */

// async 函数
// async 函数是什么？一句话，它就是 Generator 函数的语法糖。

// demo
// const asyncReadFile = async function () {
//     const f1 = await readFile('/etc/fstab');
//     const f2 = await readFile('/etc/shells');
//     console.log(f1.toString());
//     console.log(f2.toString());
// };

function getStockSymbol(name){
    console.log('name'+name);
    return Symbol(name);
}
function getStockPrice(symbol){
    console.log(symbol);
    return 11;
}
async function getStockPriceByName(name) {
    const symbol = await getStockSymbol(name);
    let stockPrice = await getStockPrice(symbol);
    return stockPrice;
}

getStockPriceByName('google').then(function (result) {
    console.log(result);
});
// demo1
function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
}

asyncPrint('hello world', 1500).then();

// demo2 功能同 demo1
async function timeout1(ms) {
    await new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function asyncPrint1(value, ms) {
    await timeout1(ms);
    console.log(value);
    return 'value='+value;
}

asyncPrint1('hello world', 1500).then(v=>{console.log(v)});

/**
 * async 函数有多种使用形式
 */

// // 函数声明
// async function foo() {}
//
// // 函数表达式
// const foo = async function () {};
//
// // 对象的方法
// let obj = { async foo() {} };
// obj.foo().then(...)
//
// // Class 的方法
// class Storage {
//     constructor() {
//         this.cachePromise = caches.open('avatars');
//     }
//
//     async getAvatar(name) {
//         const cache = await this.cachePromise;
//         return cache.match(`/avatars/${name}.jpg`);
//     }
// }
//
// const storage = new Storage();
// storage.getAvatar('jake').then(…);
//
// // 箭头函数
// const foo = async () => {};


// async function getTitle(url) {
//     let response = await fetch(url);
//     let html = await response.text();
//     return html.match(/<title>([\s\S]+)<\/title>/i)[1];
// }
// getTitle('https://tc39.github.io/ecma262/').then(console.log);
// "ECMAScript 2017 Language Specification"
// 上面代码中，函数getTitle内部有三个操作：抓取网页、取出文本、匹配页面标题。只有这三个操作全部完成，才会执行then方法里面的console.log

/**
 * 使用注意点
 *
 **/

// 第一点，前面已经说过，await命令后面的Promise对象，
// 运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。
//
// async function myFunction() {
//     try {
//         await somethingThatReturnsAPromise();
//     } catch (err) {
//         console.log(err);
//     }
// }
//
// // 另一种写法
//
// async function myFunction() {
//     await somethingThatReturnsAPromise()
//         .catch(function (err) {
//             console.log(err);
//         });
// }

// 如果确实希望多个请求并发执行，可以使用Promise.all方法。
// 当三个请求都会resolved时，下面两种写法效果相同。
//
// async function dbFuc(db) {
//     let docs = [{}, {}, {}];
//     let promises = docs.map((doc) => db.post(doc));
//
//     let results = await Promise.all(promises);
//     console.log(results);
// }
//
// // 或者使用下面的写法
//
// async function dbFuc(db) {
//     let docs = [{}, {}, {}];
//     let promises = docs.map((doc) => db.post(doc));
//
//     let results = [];
//     for (let promise of promises) {
//         results.push(await promise);
//     }
//     console.log(results);
// }