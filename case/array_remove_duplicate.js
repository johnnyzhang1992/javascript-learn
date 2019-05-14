var arr = [1,23,1,1,1,3,23,5,6,7,9,9,8,5];
let new_arr = [];
// 数组去重，只保留出现的第一项
// 双循环，嵌套检测后面是否有相同项，如有直接移除
function removeDuplicatedItem(arr){
    for(var i = 0; i < arr.length-1; i++){
        for(var j = i+1; j < arr.length; j++){
            if(arr[i]==arr[j]){
                arr.splice(j,1);//console.log(arr[j]);
               j--;
            }
        }
    }
    // console.log(arr);
    return arr;
}
console.time('time1');
removeDuplicatedItem(arr);
console.timeEnd('time1');
console.log(arr);
let arr1 = [1,23,1,1,1,3,23,5,6,7,9,9,8,5];
// 方法二
// 通过查看当前元素第一次出现的位置和当前位置是否相同来去重
function rep2(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr.indexOf(arr[i]) != i) {
            arr.splice(i,1);//删除数组元素后数组长度减1后面的元素前移
            i--;//数组下标回退
        }
    }
    return arr;
}
console.time('time2');
rep2(arr1);
console.timeEnd('time2');
console.log(arr1);
// 方法三
let arr2 = [1,23,1,1,1,3,23,5,6,7,9,9,8,5];
console.time('t3')
new_arr =  arr2.filter(function(element,index,self){
    return self.indexOf(element) === index;
 });
console.timeEnd('t3')
console.log(new_arr);
// 方法四
let arr3 = [1,23,1,1,1,3,23,5,6,7,9,9,8,5];
function rep(arr) {
    var ret = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr.indexOf(arr[i]) == i) {
            ret.push(arr[i]);
        }
    }
    return ret;
}
console.time('t4')
rep(arr3);
console.timeEnd('t4')
// console.log(rep(arr3));
// 方法5 set
let arr4 = [1,23,1,1,1,3,23,5,6,7,9,9,8,5];
console.time('t5')
console.log(Array.from(new Set(arr4)));
console.timeEnd('t5')
// let arr_set = new Set(arr4);
// console.log(Array.from(arr_set))