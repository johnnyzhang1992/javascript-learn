/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/7/13.
 */

/**
生成长度为n数值不重复且大小为2-32之间整数的数组
 */
function f(n) {
    // 判断n是否为整数
    if(Number.isInteger(n)){
        var arr = [];
        // yes
        for(var i =0;i<n;i++){
            for(var j =0;j<Infinity;j++){
                // 确保生成的数字不在数组内，否则一直判断下去
                var num = getRandom(2,32);
                var isIn = checkArr(arr,num);
                if(isIn == -1){
                    arr.push(num);
                    break;
                }
            }
        }
        return arr;
    }else{
        console.log('Please input Integer')
    }
}
/*
生成随机数
 */
function getRandom(min,max) {
    var a = Math.ceil(Math.random()*max);
    return (a >=min) ? a : a+min-1;
}
/*
检查数组 arr 中是否存在 n
 */
function checkArr(arr,n) {
    var num = -1;
    for(var i =0;i<= arr.length;i++){
        if(arr[i] == n){
            num =i;
            break;
        }
    }
    return num;
}
console.log(f(10));
