/**
 * Created by zq199 on 2017/3/9.
 */
/** 上下文相关的方法和属性 */

/** 公共方法(public method) */
// 给原型添加属性的结果是由该原型实例化的每个对象都会获得这些属性，就使这些属性公有化了
// 对象的方法通过 prototype 对象添加的例子

// 创建一个新的User 构建函数
function User( name , age) {
    this.name = name;
    this.age = age;
}
 //将一个新的函数添加到此对象的 prototype 对象中
User.prototype.getName = function () {
    return this.name;
};
 // 并再给 prototype 对象添加一个函数
User.prototype.getAge = function () {
    return this.age;
};
//实例化一个新的 User对象
var user = new User("Bob","44");
// 可以看到我们添加的这两个属性都在刚才创建的对象中，并且有合适的上下文
console.log(user.getName());//Bob
console.log(user.getAge());//44
console.log(user);//User { name: 'Bob', age: '44' }
/** 私有方法(private method) */
// 只能由构造函数访问的私有方法的例子
//表示教师的一个对象构造函数
function ClassRoom(students,teacher) {
    // 用于显示所有班上学生的私有方法
    function disp() {
        console.log(students.join(", "));
    }
    // 将班级数据存入公共对象属性中
    this.students = students;
    this.teacher = teacher;
    // 调用私有方法来显示错误
    disp();
}
// 创建一个新的 classroom 对象
var class_room = new ClassRoom(["John","Bob"],"Mr. Smith");
// class_room.disp();//报错
// 调用 disp 方法会失败，因为他不是该对象的公共属性
/** 特权方法 */
// 创建一个新的 User 对象构造函数
 function User1( name ,age) {
    // 尝试算出用户出生的年份
    var year = (new Date()).getFullYear() - age;
    // 创建一个新的特权方法，能够访问 year 变量，同时自身属于公共可访问
    this.getYearBorn = function () {
        return year;
    }
}
// 创建 User 对象的一个新实例
var user1 = new User1("Bob",44);
// 验证返回的年份正确
console.log(user1.getYearBorn());//1973
console.log(user1.getYearBorn() == 1973);// true
// 注意我们无法访问该对象私有的年份属性
console.log(user1.yes);//undefined

/* 动态生成方法的例子，这些方法在新对象实例化时创建 */
  //创建一个新的用户对象，接受一个有很多属性的对象作为参数
  function User2( properties) {
      // 遍历该对象的所有属性，并保证其作用域正确
      for( var i in properties){ (function (which) {
              var p = i;
          // 创建此属性的一个新的读取器(getter)
          which[ "get" + p ] = function () {
              return properties[p];
          };
          // 创建此属性的一个新的设置器(setter)
          which[ "set" + p ] = function (val) {
              properties[p] = val;
          };
          })(this);

      }
  }
  // 创建一个新的用户对象实例，并将具有两个属性的一个对象传入作为种子
var user2 = new User2({
    name : "Bob",
    age : 44
});
 // name 属性并不存在
 // 因为它是属性对象（properties object）的私有变量

console.log(user2.name == null);//true
// 不过我们可以使用新的 getname() 方法来获取这个值
// 因为此 函数是动态生成的
console.log(user2.getname() == "Bob");//true
// 最后，我们看到能够使用这个新生成的函数来设置或获得年龄
user2.setage(22);
console.log(user2.getage() == 22); //true
//动态生成代码的能力不可小视，能够在运行时变量来生成代码是非常有用的
/** 静态方法 */
/* 静态方法的一个简单例子 */
// 添加到一个 User 对象的静态方法
User.cloneUser = function ( user) {
    // 创建并返回一个新的用户
    return new User(
        User.getName(),
        User.getAge()
    );
};