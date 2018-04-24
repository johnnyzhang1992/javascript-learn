/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2018/4/24.
 */
// 9*9 乘法表
// 1*1
// 2*1 2*2
// 3*1 3*2 3*3
// 4*1 4*2 4*3 4*4
// 5*1 5*2 5*3 5*4 5*5
// 6*1 6*2 6*3 6*4 6*5 6*6
// 7*1 7*2 7*3 7*4 7*5 7*6 7*7
// 8*1 8*2 8*3 8*4 8*5 8*6 8*7 8*8
// 9*1 9*2 9*3 9*4 9*5 9*6 9*7 9*8 9*9

// one
for(let i=1;i<10;i++){
    let result='';
    for(let j=1;j<10;j++){
        result = result +' '+i+'*'+j;
        if(j==i){
            console.log(result)
        }
    }
}
// two
let i = 1;
do{
    let result='';
    for(let j=1;j<10;j++){
        result = result +' '+i+'*'+j;
        if(j==i){
            i++;
            console.log(result)
        }
    }
}while(i<10);

// 冒泡排序
let arr = [1,6,3,9,5];
// 升序
for(let i =0;i<arr.length-1;i++){
    for(let j=0;j<arr.length-1-i;j++){
        if(arr[j]>arr[j+1]){
            let _temp = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = _temp;
        }
    }
}
console.log(arr);
// 升序
let array1 = [1,4,-8,-3,6,12,9,8];
function compare(val1,val2){
    return val1-val2;
}
array1.sort(compare);
console.log(array1);
// sort()方法按照升序排列数组项，会调用每个数组项的toString()转型方法，然后比较得到的字符串。
// toString()方法是把布尔值或BooleanObject转换为字符串，并返回结果。
// compare()函数方法是一个比较函数，作为sort()方法的参数

// 快速排序
let array2 = [1,4,-8,-3,6,12,9,8];
function quickSort(arr){
    //如果数组长度小于等于1，则返回数组本身
    if(arr.length<=1){
        return arr;
    }
    //定义中间值的索引
    let index = Math.floor(arr.length/2);
    console.log(index);
    //取到中间值
    let temp = arr.splice(index,1);
    console.log(temp);
    //定义左右部分数组
    let left = [];
    let right = [];
    for(let i=0;i<arr.length;i++){
        //如果元素比中间值小，那么放在左边，否则放右边
        if(arr[i]<temp){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(temp,quickSort(right));
}
console.log(quickSort(array2));