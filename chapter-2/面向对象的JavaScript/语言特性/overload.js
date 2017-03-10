/**
 * Created by zq199 on 2017/3/7.
 */
//函数重载的例子

/** 发送一条信息的简单函数 */
function sendMessage(msg,obj) {
    // 如果消息和对象(的参数)都被提供
    if( arguments.length == 2){
        obj.handleMsg(msg);
        // 否则，嘉定只提供一条信息
    }else{
    //    那么仅显示默认的错误信息
        console.info(msg);
    }
}
//仅用一个参数调用这个函数 用 console来显示此消息
sendMessage("Hello World!");
// 又或者我们可以将一个我们自己写好的对象传入
//负责用另一套办法显示信息
sendMessage("How are you?",{
    handleMsg : function (msg) {
        console.info("This is a custom message: " +msg);
    }
});


/** 一个接受任意数量参数并将其转换为数组的函数 */
function makeArray() {
    // 临时使用的数组
    var arr = [];
    // 遍历传入的每一个参数
    for( var i = 0; i <arguments.length; i++){
        arr.push(arguments[i]);
    }
    console.info(arr);
    // 返回结果数组
    return arr;
}
makeArray("a","b","c");

/** 显示错误信息和默认信息 */
function displayError( msg ) {
    console.info("type_of:"+typeof  msg);
    // 检查并确认 msg 是否 undefined
    if( typeof msg == 'undefined'){
        // 如果是，则置 msg 为默认信息
        msg = " An error occurred.";
    }
//    显示改消息
    console.info(msg);
}
displayError();//undefined
displayError("a");//string
displayError(99);//number
displayError({"name":"johnnyzhang","age":"23"});//object

/** 类型检查 */
//一个函数，可以用来严格维护传入函数的所有参数

//用一个变量类型列表严格检查一个参数列表
function strict(types,args) {
    //保证类型的数量和参数的数量相匹配
    if(types.length != args.length){
        // 抛出一个有用的异常
        throw "Invalid number of arguments. Expected " +types.length +", received "+args.length + "instead.";
    }
    //遍历所有的参数，检查它们的类型
    for(var i=0;i<args.length;i++){
        if(args[i].constructor != types[i]){
            throw "Invalid number of arguments. Expected " +types[i].name +", received "+args[i].constructor.name + " instead.";
        }
    }
}

strict(["Object","Array","Function","String","Number","Boolean"],[{"an":"object"},["an","array"],function (){},"a string" ,55,true]);