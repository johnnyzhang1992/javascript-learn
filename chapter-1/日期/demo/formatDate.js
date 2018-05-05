/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2018/5/5.
 */

// format date
// return y-m-d h:m:s
let formatDate = (date)=>{
    let _date = new Date();
    if(date){
        if(date.toString().length==13){
            _date = date;
        }else{
            _date = date*1000;
        }
    }
    let Y = _date.getFullYear();
    let M = _date.getMonth()+1;
    if(M<10){
        M = '0'+M;
    }
    let d = _date.getDate();
    if(d<10){
        d = '0'+d;
    }
    let h = _date.getHours();
    if (h<10){
        h = '0'+h;
    }
    let m = _date.getMinutes();
    if(m<10){
        m = '0'+m;
    }
    let s = _date.getSeconds();
    if(s<10){
        s = '0'+s;
    }
    console.log(Y+'-'+M+'-'+d+' '+h+':'+m+':'+s);
    return Y+'-'+M+'-'+d+' '+h+':'+m+':'+s;
};
formatDate();//2018-05-06 00:05:24
console.log(new Date().valueOf());
let formatDate1 = (date)=>{
    let _date = date ? (date.toString().length==13 ? new Date(date): new Date(date*1000)): new Date();
    return _date.getFullYear()
        + "-" + (_date.getMonth()>8?(_date.getMonth()+1):"0"+(_date.getMonth()+1))
        + "-" + (_date.getDate()>9?_date.getDate():"0"+_date.getDate())
        + " " + (_date.getHours()>9?_date.getHours():"0"+_date.getHours())
        + ":" + (_date.getMinutes()>9?_date.getMinutes():"0"+_date.getMinutes())
        + ":" + (_date.getSeconds()>9?_date.getSeconds():"0"+_date.getSeconds());

};
console.log(formatDate1(new Date().valueOf()));//2018-05-06 00:12:53
// 重写Date 的原型
Date.prototype.toString = function() {
    return this.getFullYear()
        + "-" + (this.getMonth()>8?(this.getMonth()+1):"0"+(this.getMonth()+1))
        + "-" + (this.getDate()>9?this.getDate():"0"+this.getDate())
        + " " + (this.getHours()>9?this.getHours():"0"+this.getHours())
        + ":" + (this.getMinutes()>9?this.getMinutes():"0"+this.getMinutes())
        + ":" + (this.getSeconds()>9?this.getSeconds():"0"+this.getSeconds());
};
console.log((new Date()).valueOf().toString());//2018-05-06 00:14:56

// 计算时间差
let compareTime = (date)=>{
    let cur_date = new Date().valueOf();
    let pre_date = date ? (date.toString().length==13 ? date: date*1000): cur_date;
    let date3 = cur_date - pre_date;
    if(date3 == 0){
        return '现在';
    }
    //计算出相差天数
    let days=Math.floor(date3/(24*3600*1000));
    //计算出小时数
    let leave1=date3%(24*3600*1000);    //计算天数后剩余的毫秒数
    let hours=Math.floor(leave1/(3600*1000));
    //计算相差分钟数
    let leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
    let minutes=Math.floor(leave2/(60*1000));
    //计算相差秒数
    let leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
    let seconds=Math.round(leave3/1000);
    if(seconds<15 && minutes<1 && hours < 1 && days<1){
        return '刚刚';
    }else if(seconds<60 && minutes<1 && hours < 1 && days<1){
        return seconds+'秒前';
    }else if(minutes<60 && hours < 1 && days<1){
        return minutes+'分钟前';
    }else if(hours<60 && days<1){
        return hours+'小时前';
    }else if(days>0 && days<32){
        return  days+'天前';
    }else{
        return new Date(pre_date).toString();
    }
};
console.log(compareTime(new Date().valueOf()-10*1000));
console.log(compareTime(new Date().valueOf()-10*60*1000));
console.log(compareTime(new Date().valueOf()-10*60*60*1000));
console.log(compareTime(new Date().valueOf()-10*60*60*24*1000));
console.log(compareTime(new Date().valueOf()-10*60*60*24*3*1000));