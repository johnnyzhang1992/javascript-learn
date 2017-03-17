/**
 * Created by zq199 on 2017/3/17.
 */
//关于dom 章节的所有函数
// 一个获取元素文本内容的通用函数
function text(e) {
    var t = "";
    // 如果传入的是元素，则继续遍历其子元素
    // 否则假定它是一个数组
    e = e.childNodes || e;
    // 遍历所有子节点
    for( var j = 0;j < e.length;j++){
        // 如果不是元素，追加其文本值
        // 否则，递归遍历所有元素的子节点
        t += e[j].nodeType != 1 ? e[j].nodeValue : text(e[j].childNodes)
    }
    // 返回匹配的文本
    return t;
}
/** 获取和设置元素特性的值 */
function attr(elem,name,value) {
    // 确保提供的 name 是正确的
    if( !name || name.constructor != String ){
        //如果name参数不存在或者它的类型不是字符串
        // 返回 ''
        return '';
    }
    // 检查 name 是否处在怪异命名的情形中
    name = { 'for': 'htmlFor','class': 'className'}[name] || name ;
    // 如果用户传入value值的话
    if( typeof value != 'undefined'){
        // 首先使用快捷方式
        elem[name] = value;
        // 可以的话使用 setAttribute
        if(elem.setAttribute){
            elem.setAttribute(name,value);
        }
    }else{
        // 否则特性值默认为空
        elem[name] = '';
        // 可以的话使用 setAttribute
        if(elem.setAttribute){
            elem.setAttribute(name,'');
        }
    }
    // 返回特性的值
    return elem[name] || elem.getAttribute(name) || '';
}
//通过id查找元素
function id(name) {
    return document.getElementById(name);
}
//通过tagName查找元素
function tag(name,elem) {
    // 如果不提供上下文元素，则遍历整个文档
    return (elem || document).getElementsByTagName(name);
}

/** 通过类的值查找元素 */
/*
 遍历所有元素（或者某元素的所有后代）直至找到指定类的元素
 */
// 找出全部有指定类值的元素的函数
function hasClass(name,type) {
    var r = [];
    // 定位到类值上（允许多类值）
    var re = new RegExp("(^|\\s)" + name + "(\\s|$)");
    console.info(re);
    // 限制类型的查找，或者遍历所有元素
    var e = document.getElementsByTagName(type || "*");
    for( var j = 0;j < e.length;j++){
        // 如果元素拥有指定类，把它添加到函数的返回值中
        if( re.test(e[j])){ r.push(e[j])}
    }
    // 返回符合的元素列表
    return r;
}

function cleanWhitespace(element) {
    // 如果不提供参数，则处理整个HTML文档
    element = element || document;
    // 使用第一个子节点作为开始指针
    var cur = element.firstChild;

    // 一直到没有子节点为止
    while( cur != null){
        // 如果节点是文本节点，并且只包含空格
        if( cur.nodeType == 3 && ! /\S/.test(cur.nodeValue)){
            // 删除这个文本节点
            element.removeChild(cur);

            // 否则他就是一个元素
        }else if( cur.nodeType == 1){
            // 递归整个文档
            cleanWhitespace(cur);
        }
        cur = cur.nextSibling;//遍历子节点
    }
}
cleanWhitespace();
// 为所有HTML DOM元素动态绑定到新的DOM遍历函数
HTMLElement.prototype.next = function () {
    var elem = this;
    do{
        elem = elem.nextSibling;
    }while (elem && elem.nodeType != 1);
    return elem;
};
//查找相关元素的前一个兄弟元素的函数
function prev(elem) {
    do{
        elem  = elem.previousSibling;
    }while (elem && elem.nodeType != 1);
    return elem;
}
//查找相关元素的下一个兄弟元素的函数
function next(elem) {
    do{
        elem  = elem.nextSibling;
    }while (elem && elem.nodeType != 1);
    return elem;
}
//查找元素的第一个子元素的函数
function first(elem) {
    elem = elem.firstChild;
    return elem && elem.nodeType !=1 ? next(elem) : elem;
}
//查找元素的最后一个子元素的函数
function last(elem) {
    elem = elem.lastChild;
    return elem && elem.nodeType !=1 ? prev(elem) : elem;
}
//查找元素父元素的函数
function parent(elem,num) {
    num = num || 1;
    for(var i = 0;i<num;i++){
        if(elem != null){
            elem = elem.parentNode;
        }
    }
    return elem;
}

// 创建新 DOM 元素的通用函数
function create(elem) {
    return document.createElementNS ? document.createElementNS('http://baidu.com',elem) : document.createElement(elem);
}

// 转化一个DOM 节点/HTML 字符串混合型参数数组为纯粹的DOM节点数组
function changeElem(a) {
    var r = [];
    // 如果参数不是数组，则强行转换
    if(a.constructor != Array){ a = [a];}
    for(var i = 0;i < a.length;i++){
        // 如果是字符串
        if( a[i].constructor == String){
            // y用一个临时元素来存放 HTML
            var div = document.createElement("div");

            // 注入 HTML ，转换成DOM 结构
            div.innerHTML = a[i];
            // 提取DOM结构到临时div中
            for(var j =0;j<div.childNodes.length;j++){
                r[r.length] = div.childNodes[j];
            }
        }else if(a[i].length){ //如果不是数组
            // 假定是DOM节点数组
            for(var j = 0;j< a[i].length;j++){
                r[r.length] = a[i][j];
            }
        }else{
            r[r.length] = a[i];
        }
    }
    return r;
}
//插入和追加内容到DOM的改进函数
function before( parent,before,elem) {
    // 检查 parent 是否传入
    if(elem == null){
        elem = before;
        before = parent;
        parent = before.parentNode;
    }
    //获取元素的新数组
    var elems = changeElem(elem);

    // 向后遍历数组
    // 因为我们向前插入元素
    for( var i = elems.length -1;i>=0;i--){
        parent.insertBefore(elems[i],before);
    }
}
function append(parent,elem) {
    //获取元素的数组
    var elems = changeElem(elem);

    // 把他们都追加到元素中
    for( var i = 0; i<elems.length;i++){
        parent.appendChild(elems[i])
    }
}