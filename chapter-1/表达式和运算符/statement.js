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
