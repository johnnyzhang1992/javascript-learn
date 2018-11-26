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
import {area as ymj, circumference as yzc} from "./profile";
import {db, users} from './constants/index';
// 如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。
console.log('圆面积：' + ymj(4));
console.log('圆周长：' + yzc(14));

console.log(db);
console.log(users);


//export * as someIdentifier from "someModule";
// export someIdentifier from "someModule";
// export someIdentifier, { namedIdentifier } from "someModule";