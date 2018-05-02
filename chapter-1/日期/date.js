/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2018/5/2.
 */

// 创建日期对象
// 当前时间
let date1 = new Date();
console.log(date1);// 2018-05-02T14:22:47.886Z
let date2 = new Date("May 2,2018");
let date3 = new Date(Date.parse("May 2, 2018"));
console.log(date2);// 2018-05-01T16:00:00.000Z
console.log(date3);// 2018-05-01T16:00:00.000Z

// 本地时间
let date4 = new Date(2018,0);
console.log(date4);//2017-12-31T16:00:00.000Z
let date5 = new Date(2018, 4, 2,22,30,30);
console.log(date5);//2018-05-02T14:30:30.000Z

console.log(date5.toDateString());//Wed May 02 2018
console.log(date5.toTimeString());// 22:30:30 GMT+0800 (中国标准时间)
console.log(date5.toLocaleDateString());//2018-5-2
console.log(date5.toLocaleTimeString());//22:30:30
console.log(date5.toUTCString());//Wed, 02 May 2018 14:30:30 GMT

// getFullYear()
console.log(date1.getFullYear());//2018 年
console.log(date1.getMonth());// 4 月
console.log(date1.getDate());// 2 日
console.log(date1.getDay());// 3 星期
console.log(date1.getHours());// 22 小时
console.log(date1.getMinutes());// 37 分钟
console.log(date1.getSeconds());// 2 秒

let _date = new Date();
_date.setFullYear(2018);
_date.setMonth(4);
_date.setDate(2);
_date.setHours(22);
_date.setMinutes(39);
_date.setSeconds(55);
console.log(_date);//2018-05-02T14:39:55.873Z
console.log(_date.toLocaleString());//2018-5-2 22:39:55