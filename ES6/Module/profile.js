/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/8/21.
 */

// profile.js
// export var firstName = 'Michael';
// export var lastName = 'Jackson';
// export var year = 1958;

// === 等价的
// profile.js
// var firstName = 'Michael';
// var lastName = 'Jackson';
// var year = 1958;
//
// export {firstName, lastName, year};

// function v1() { ... }
// function v2() { ... }
//
// export {
//     v1 as streamV1,
//     v2 as streamV2,
//     v2 as streamLatestVersion
// };

export function area(radius) {
    return Math.PI * radius * radius;
}
export function circumference(radius) {
    return 2 * Math.PI * radius;
}
// common.js
// module.exports = {
//     area:area,
//     circumference:circumference
// };