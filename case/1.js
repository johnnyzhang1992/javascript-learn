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
        let arr = [];
        // yes
        for(let i =0;i<n;i++){
            for(let j =0;j<Infinity;j++){
                // 确保生成的数字不在数组内，否则一直判断下去
                let num = getRandom(2,32);
                let isIn = checkArr(arr,num);
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
    let a = Math.ceil(Math.random()*max);
    return (a >=min) ? a : a+min-1;
}
/*
检查数组 arr 中是否存在 n
 */
function checkArr(arr,n) {
    let num = -1;
    for(let i =0;i<= arr.length;i++){
        if(arr[i] == n){
            num =i;
            break;
        }
    }
    return num;
}
console.log(f(10));

// 斐波那契数列以递归的方法定义：F(1)=1,F(2)=1,F(n) = F(n-1)+F(n-2);
// 1 1 2 3 5 8 13
// n 代指第几项

// 迭代
// 时间复杂度为O(n)，空间复杂度为O(1)
let fibonacci = (n)=>{
    if(Number.isInteger(n)){
        if(n==1 || n==2){
            return 1;
        } else {
            let result = 0;
            let pre = 1;
            let _pre = 1;
            for (let i= 3;i<=n;i++){
                result = pre+_pre;
                _pre = pre;
                pre = result;
            }
            return result;
        }
    }else{
        console.log('Please input Integer')
    }
};

console.time('time1');
console.log(fibonacci(21)); //0.195ms
console.timeEnd('time1');

// 尾递归优化
// 时间复杂度为O(2^n)，空间复杂度为O(n)
let fibonacci1 = (n)=>{
    if(Number.isInteger(n)){
        if (n === 0) return 0;
        if (n === 1) return 1;
        return fibonacci1(n - 2) + fibonacci1(n- 1);
    }else{
        console.log('Please input Integer')
    }
};
console.time('time2');
console.log(fibonacci1(20)); //2.424ms
console.timeEnd('time2');

// 利用函数的记忆功能,构造带记忆功能的函数
let fibo = function(){
    let memo = [1,1];
    //存储我们的结果隐藏在闭包中，当调用的时候首先先检查这个结果是否存在了
    let fib = function(n) {
        let result = memo[n];
        if(typeof result!== 'number') {
            result = fib(n-1) + fib(n-2);
            memo[n] = result
        }
        console.log(result);
        return result;
    };
    return fib
};
console.time('time3');
console.log(fibo(21)); //0.088ms
console.timeEnd('time3');

// 非递归
// 时间复杂度为O(n)，空间复杂度为O(n)
function fb(n) {
    let res = [1, 1];
    if (n == 1 || n == 2) {
        return 1;
    }
    for (let i = 2; i < n; i++) {
        res[i] = res[i - 1] + res[i - 2];
    }
    return res[n - 1];
}
console.time('time4');
console.log(fb(21)); //0.073ms
console.timeEnd('time4');
// generator
function* fibonacci3() {
    let [prev, curr] = [0, 1];
    for (;;) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}
console.time('time5');
for (let n of fibonacci3()) {
    if (n > 1000) break;
    console.log(n);
}
console.timeEnd('time5');