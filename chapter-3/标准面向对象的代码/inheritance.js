/**
 * Created by zq199 on 2017/3/10.
 */
/** 原型式继承（prototype inheritance） */

/** 原型式继承的例子 */
// 为 Person 对象创建一个构造函数
function Person( name ) {
    this.name = name;
}
//给Person 对象添加一个新方法
Person.prototype.getName = function () {
    return this.name;
};

// 创建一个新的 User 对象的构造函数
function User( name, password) {
    // 注意，这里并没有支持方便的重载/ 继承，也就是说，不能调用父类的构造函数
    this.name = name;
    this.password = password;
}
// user 对象继承所有 Person 对象的方法
User.prototype = new Person();
User.prototype.getPassword = function () {
    return this.password;
};
var user = new User("Bob","ab123");//user 拥有 Person 和 User 两个函数的原型方法
console.log(user.getName());//Bob
console.log(user.getPassword());//ab123

/** 类式继承 */
// 模拟类式继承的三个函数

// 简单的辅助函数，让你可以将新函数绑定到对象的 prototype 上
Function.prototype.method = function (name,func) {
    this.prototype[name] = func;
    return this;
};
// 一个（想当复杂的）函数，允许你方便从其他对象继承函数
//同时仍然可以调用父对象的那些函数
Function.method('inherits',function (parent) {
   // 记录我们所在父层次的级数
    var depth = 0;
    // 继承父对象的方法
     var proto = this.prototype = new parent();

    // 创建一个新的名为 'uber' 的特权函数，
    // 调用它时会执行所有在继承时被重写的函数
    this.method('uber',function uber(name) {

        var func; //要执行的函数
        var ret;  //函数的返回值
        var v = parent.prototype; // 父对象的 prototype

        // 如果我们已经在某个'uber' 函数之内
        if(depth){
            console.info("I am in");
            // 上溯必要的 depth ，以找到原始的 prototype
            for(var i = depth;i > 0; i += 1){
                v = v.constructor.prototype;
            }
            // 从该 prototype 中获得函数
            func = v[name];

            // 否则这就是 'uber' 函数的第一次调用
        }else{
            console.info("i am out");
          // 从 prototype 获得要执行的函数
            func = proto[name];

            // 如果此函数属于当前的 prototype
            if( func == this[name]){
                // 则改为调用父对象的 prototype
                func = v[name];
            }
        }

        //记录我们在继承堆栈中所在位置的级数
        depth += 1;

        // 使用除第一个以为所有的 arguments 调用此函数
        // 因为第一个参数是执行的函数名
        ret = func.apply(this, Array.prototype.slice.apply(arguments,[1]));

        // 恢复继承堆栈
        depth -= 1;

        // 返回执行过的函数的返回值
        return ret;
    });
    return this;
});
//只继承父对象特定的函数的函数。而非使用 new parent() 继承所有的函数
Function.method('swiss', function (parent) {
    // 遍历所有要继承的方法
   for (var i = 1; i < arguments.length; i++){
       // 需要导入的方法名
       var name = arguments[i];

       // 将此方法导入 this  对象的 prototype 中
       this.prototype[name] = parent.prototype[name];
   }
    return this;
});

/*
三个函数的用意：
    Function.prototype.method ： 它提供了一个简单的方法，把函数与构造函数的原型关联起来。
    之所以有效，是因为所有的构造函数本身都是函数，所以能获得'method'这个新办法。

    Function.prototype.inherits: 这一个函数可以用于提供简单的单对象继承，它的的代码主要围绕在
    任意对象方法中调用 this.uber('methodNode') 为中心，并在让这个 uber 方法去执行她要覆盖的父对象的方法。
    这就是 JavaScript继承模型中并未内建的部分

     Function.prototype.swiss: 这是.method() 函数的增强版，可以用于从单一父对象获取多个函数。
     如果用在多个父对象上就能获得可用的多对象继承。
 */

/** 类式继承函数示例 */

//创建一个新的 Person 对象构造函数

function Person( name) {
    this.name = name;
}
// 给 Person 对象添加一个新的方法
Person.method('getName',function () {
   return this.name;
});
// 创建一个新的 User 对象构造函数
function User( name, password) {
    this.name = name;
    this.password = password;
}
//从 Person 对象继承所有方法
User.inherits(Person);

// 给 User 对象添加一个新的方法
User.method('getPassword',function () {
    return this.password;
});
// 覆盖 Person 对象创建的 getName 方法，但通过 uber 函数调用原有方法
User.method('getName',function () {
    return "My name is: " + this.uber('getName');
});

var user = new User("Joes",23);
console.log(user.getName());//My name is: Joes
console.log(user.getPassword());//23
