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

