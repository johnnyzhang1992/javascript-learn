/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2018/5/2.
 */
let _date = {
    Y: 2018,
    M: 5,
    D: 2
};

// 获取年份
let getYear= (date)=>{
    return date.getFullYear();
};
// 获取月份
let getMonth = (date)=>{
    return date.getMonth()
};
// 获取天数
let getDay = (date)=>{
    return date.getDate();
};
// 获取星期
let getWeekDay = (date)=>{
    return date.getDay();
};
// 获取小时
let getHours = (date)=>{
    return date.getHours();
};
// 获取分钟
let getMinutes = (date)=>{
    return date.getMinutes();
};
// 获取秒
let getSeconds = (date)=>{
  return date.getSeconds();
};

let getYMD = (date)=>{
    let y = getYear(date);
    let m = getMonth(date)+1;
    if(m<10){
        m = '0'+m;
    }
    let d = getDay(date);
  return y+'-'+m+'-'+d;
};
console.log(getYMD(new Date));
// 获取当前月份的天数
let getCurrentMonthDays = ()=>{
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let d = new Date(year, month, 0);
    return d.getDate();
};
// 获取指定年月的天数
let  getMonthDays = (year, month)=>{
    let d = new Date(year, month, 0);
    return d.getDate();
};
console.log(getCurrentMonthDays());//31
console.log(getMonthDays(2018,2));//28

