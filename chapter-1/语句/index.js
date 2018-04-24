/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2018/4/24.
 */

// do while
let i = 1;
do{
     i += 2;
 }while(i<10);
 console.log('i='+i);
// while
 let j =1;
 while(j<10){
     j += 2;
 }
 console.log('j='+j);
 // for
let count =10;
for(let i=1;i<count;i++){
    console.log(i)
}
//for-in
let arr = [1,2,3,4];
for(let x in arr){
    console.log(x+'=>'+arr[x]);
}
// with
let obj = {
    name: 'johnny',
    age: 26,
    gender: 'female'
};
console.log(obj);
with(obj){
    let _obj = {};
    _obj.name = name;
    _obj.age = age;
    _obj.gender = gender;
    console.log(_obj);
}