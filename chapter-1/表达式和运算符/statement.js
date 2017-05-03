/**
 * Created by zq199 on 2017/5/3.
 */
/*
  表达式语句
 */
// switch
function convert(x) {
    switch (typeof x){
        case 'number':
            return x.toString(16);//将数字转换为十六进制
        case 'string':
            return '"'+x+'""';// 返回亮点带双引号的字符串
        default:
            return String(x);
    }
}
// for/in

// 标签语句
var token = null;
mainloop : while(token != null){
    token = '';
    continue mainloop; //跳转到下一次循环
    token = 'aaaa';//不被执行
}
//try catch
try{
    var n = Number(prompt('请输入一个整数',''));
    var f = factorial(n);
    console.log(f);
}catch(ex){
    alert(ex);//告诉用户发生了什么错误
}