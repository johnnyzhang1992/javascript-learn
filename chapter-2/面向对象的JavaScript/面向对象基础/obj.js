/**
 * Created by zq199 on 2017/3/9.
 */
/** 创建简单对象并设置属性的例子 */

var obj = new Object();
// 给对象设置属性
obj.val = 5;
obj.click = function () {
    console.info("hello!");
};
console.log(obj);
// { val: 5, click: [Function] }
// 间写方式 和上方等价
var obj1 ={
    val : 5,
    click : function () {
        console.info("hello!");
    }
};
console.log(obj1);
// { val: 5, click: [Function] }

var a = new Object();
var b = a;
a.val = 5;
b.name = "johnny";
console.log(a.name);
console.log(b.val);//a b 指向同一个对象原型
// 5

/** 简单对象的创建和使用 */
// 一个简单的函数，接受名称并将其存入当前上下文中
function User( name) {
    this.name = name;
}
// 指定名称来创建该函数的一个新对象
var me = new User( "My Name");
// 这个对象的名称被设为自身的 name 属性了
console.log(me.name == "My Name");// true
//而且这是 User 对象的一个实例
console.log(me.constructor == User); //true

//如果把 User 作为函数使用会如何呢？
User("Test");
// 因为它的 “this” 上下文对象未曾设定，所以默认为全局的 ‘window’ 对象
// console.info(window.name == "Test");//true

/*
* ES5 定义object。create()方法
* 它创建一个新对象，其中第一个参数是这个对象的原型。
* Object.create() 提供第二个可选参数，用以对对象的属性进行进一步描述。
* */
var o1 = Object.create({x:1,y:2});// o1 继承了属性x和y

/** 使用 constructor 属性的例子 */
//创建一个新的简单的 User 对象
function User1() {}
//创建一个 User 对象
var me1 = new User1();
// 创建一个新的 User 对象（用前一个对象的 constructor 引用来创建）
var you = new me1.constructor();
// 你可以发现这两个对象的 constructor 实质上是一致的
console.log(me1.constructor == you.constructor);//true

/** 原型（prototype）*/
/*
  每一个JavaScript对象（null除外）都和另一个对象相关联。
  “另一个”对象就是我们熟知的原型，每一个对象都从原型继承属性。
 */

/*
* 通过原型继承创建一个新对象
 */
// inherit（） 返回一个继承自原型对象p的属性的新对象
// 这里使用ECMAScript 5 中的Object.create()函数（如果存在的话）
// 如果不存在Object.create()，则退化使用其他方法
function inhert(p) {
    if(p == null) throw TypeError(); // p是一个对象，但不能是null
    if(Object.create){ // 如果方法存在
        return Object.create(p); // 直接使用它
    }
    var t = typeof p; //否则进行进一步检测
    if(t !== "object" && t!== "function"){
        throw TypeError();
    }
    function f() {}; // 定义一个空构造函数
    f.prototype = p; // 将其原型属性设置为p
    return new f(); // 使用f()创建p的继承对象
}

/* 删除属性 */
/*
* 不能删除继承属性
* 不能删除那些可配置性为false的属性
* 不能能删除全局函数
*
 */

/*
* 属性getter 和setter
*
* 存取器属性的四个特性是读取（get）、写入（set）、可枚举性和可配置性
*Object.getOwnPropertyDescriptor()可以获得某个对象特定属性的描述符
 */

var p = {
  // x和y是普通的可读写的数据属性
    x:1.0,
    y:1.0,

    // r是可读写的存取器属性，他有getter和setter
    // 函数体结束后不要忘记带上逗号
    get r(){ return Math.sqrt(this.x*this.x +this.y*this.y);},
    set r(newvalue){//r的值确定了，那么x,y的值要随之改变
        var oldvalue = Math.sqrt(this.x*this.x +this.y*this.y);
        var ratio = newvalue/oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },
    // theta 是只读存取器属性，它只有getter方法
    get theta(){ return Math.atan2(this.y,this.x)}
};

var q = inhert(p);//创建一个继承getter和setter的新对象
q.x = 1;q.y =1;//给q添加两个属性
// r:1.4142135623730951
// theta:0.7853981633974483
// x:1
// y:1

/*
 *
 * 设置属性的特性
 *
 */
var o = {};
// 添加一个不可枚举的数据属性x,并赋值为1
Object.defineProperty(o,"x",{
    value: 1,
    writable:true,
    enumerable:false,
    configurable: true
});
// 属性是存在的，但是不可枚举
o.x;//1
Object.keys(o);//[]
Object.defineProperty(o,"x",{writable:false});
o.x = 2;//赋值失败，但不报错
o.x; //1
// 属性依然是可配置的，因此可以通过这种方式对它进行修改
Object.defineProperty(o,"x",{value:3});
o.x;//3

var _p = Object.defineProperties({},{
    x:{value:1,writable:true,enumerable:true,configurable:true},
    y:{value:1,writable:true,enumerable:true,configurable:true},
    r:{
        get: function () {
            return Math.sqrt(this.x*this.x+this.y*this.y);
        },
        set: function (newvalue) {
            var oldvalue = Math.sqrt(this.x*this.x +this.y*this.y);
            var ratio = newvalue/oldvalue;
            this.x *= ratio;
            this.y *= ratio;
        },
        enumerable:true,
        configurable:true
    }
});
/*
* 类属性
 */

// 返回传递给他的任意对象的类
function classof(o){
    if(o===null){return "Null";}
    if(o=== undefined){return "Undefined"}
    return Object.prototype.toString.call(o).slice(8,-1);
}

// 创建一个封闭对象，包括一个冻结的原型和一个不可枚举的属性
 var obj22 = Object.seal(Object.create(Object.freeze({x:1}),{y:{value:2,writable:true}}));

/*
*
* 对象序列化
* 是指将对象的状态转换为字符串，也可以将字符串还原为对象
*
* JSON.stringify()和JSON.parse()用来序列化和还原JavaScript对象
*
 */


/*
*
* 对象方法
*
 */
