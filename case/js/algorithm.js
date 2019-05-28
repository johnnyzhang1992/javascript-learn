// 递归求和
function sum(n) { 
    if (n == 1) return 1;
    return sum(n-1)+n
}
console.log(sum(100)) // 5050

// fnArr[3]() 返回 3
// 方法一：let 块级作用域
var fnArr = [];
for (let i = 0; i < 10; i ++) {
  fnArr[i] =  function(){
    return i
  };
}
console.log(fnArr[3]())
// 方法二： 立即执行匿名函数
var fnArr1 = [];
for (let i = 0; i < 10; i++) {
    (function (i) { 
        fnArr1[i] =  function(){
            return i
        };
    })(i)
}
console.log(fnArr1[3]())
// 方法三：闭包
var bindNumber = function (i) { 
    return function () { 
        return i
    }
}
var fnArr2 = [];
for (let i = 0; i < 10; i++) {
    (function (i) { 
        fnArr2[i] =  bindNumber(i)
    })(i)
}
console.log(fnArr2[3]())

// 连续输出 0，1，2，3，4
for(let i=0; i<5; i++){
    setTimeout(function(){
      console.log('delayer:' + i )
    }, 0)
}
function makeCounter() {
    var count = 0
    return function() {
      return count++
    };
  }
  var counter = makeCounter()
  var counter2 = makeCounter();
  console.log( counter() ) //-->0
  console.log( counter() ) //-->1
  console.log( counter2() ) //-->0
  console.log( counter2() ) //-->1