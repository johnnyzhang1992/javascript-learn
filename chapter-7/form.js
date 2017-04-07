/**
 * Created by zq199 on 2017/4/5.
 */

/** -----表单验证 ------*/
/*-------------检查一个必填字段是否被修改 -------------- */
// 检查输入元素是否键入了信息的通用函数
function checkRequired(elem) {
    if( elem.type == "checkbox" || elem.type == "radio"){
        return getInputByName(elem.name).numChecked;
    }else{
        return elem.value.length > 0  && elem.value != elem.defaultValue;
    }
}
// 找出指定name的所有input元素（对查找以及复选框或单选框十分有用）
function getInputByName(name) {
    // 匹配的Input元素的数组
    var results = [];
    // 追踪被选中元素的数量
    results.numChecked = 0;

    // 找出文档中所有input元素
    var input = document.getElementsByTagName("input");
    for( var i = 0;i<input.length;i++){
        // 找出所有指定name 的字段
        if( input[i].name == name){
            // 保存结果，稍后会返回
            results.push(input[i]);
            // 记录被选中字段的数量
            if(input[i].checked){
                results.numChecked++
            }
        }
    }
}
// 等待文档完成加载
window.onload = function () {
    // 获得表单并监听提交事件
    console.log("加载完毕！");
    document.getElementById('form').onsubmit = function () {
        console.log("sssssss");
        // 获取需检查的input元素
        var elem = document.getElementById('age');
        // 确保年龄的必选字段已经被选中
        if( !checkRequired(elem)){
            // 否则显示错误并组织表单提交
            console.warn("Required field is empty - "+ "you must be over 13 to use this site");
            return false
        }

        // 获取需检查的input元素
        var elem1  = document.getElementById("name");

        // 确保名字字段有文本输入
        if( !checkRequired(elem1)){
            // 否则显示错误并组织表单提交
            console.warn("Required field is empty - "+ "please provide your name.");
            return false
        }
    };
};
