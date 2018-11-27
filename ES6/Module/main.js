import * as f from "./profile";

/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/8/21.
 */
// const f = require('./profile');//common.js

// 注意，import命令具有提升效果，会提升到整个模块的头部，首先执行。

// import * as f from './profile';
// console.log('圆面积：' + f.area(4));
// console.log('圆周长：' + f.circumference(14));

// import {area, circumference} from "./profile";
import {area as ymj, circumference as yzc, counter,incCounter} from "./profile";
import {db, users} from './constants/index';
import {foo} from './mi';

// 如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。
console.log('圆面积：' + ymj(4));
console.log('圆周长：' + yzc(14));

console.log(db);
console.log(users);

// ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。
console.log(counter); //3
// 会改变原 module 里面的值
incCounter();
console.log(counter); //4

console.log(foo); //bar
setTimeout(() => console.log(foo), 500); //baz

//export * as someIdentifier from "someModule";
// export someIdentifier from "someModule";
// export someIdentifier, { namedIdentifier } from "someModule";