/**
 * Created by zq199 on 2017/3/6.
 */
//用面向对象的JavaScript表示课程及其安排
// ‘Lecture’类的构造函数
// 用名称{ name} 和教师 {teacher} 作为参数

function Lecture(name,teacher) {
    //将参数保存为对象的局部属性 （local property）
    this.name = name;
    this.teacher = teacher;
}

// Lecture 类的一个方法 {method},用于生成一条展示 Lecture 信息的字符串

Lecture.prototype.display = function() {
    return this.teacher+" is teaching "+this.name;
};

// Schedule 类的构造函数，以课程的数组作为参数

function Schedule(lectures) {
    this.lectures = lectures;
}
// 构造一条字符串，表示课程的安排表

Schedule.prototype.display = function() {
    var str = '';
    //遍历每项课程，建立包含他们信息的字符串
    for (var i = 0;i < this.lectures.length; i++)
        str += this.lectures[i].display() + '; ';
    return str;
};

//给用户创建一个课程表

// 创建一个新的 Schedule 对象,保存在变量 ‘mySchedule’中

var mySchedule = new Schedule([
    // 创建一个 Lecture 对象的数组，作为 Schedule 对象的唯一参数传入
    new Lecture("Gym","Mr.Smith"),
    new Lecture("Math","Mrs. Jones"),
    new Lecture("English","TBD")
]);
console.info(mySchedule.display());