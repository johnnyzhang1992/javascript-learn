/**
 * Created by zq199 on 2017/3/30.
 */

//----- 获取元素的真实、最终的CSS 样式属性值的函数-----------
// 获取指定元素(elem) 的样式属性（name）
function getStyle(elem ,name) {
    // 如果属性存在于style[]中，那么它已被设置了(并且是当前的)
    if( elem.style[name]){
        console.log("Normal");
        return elem.style[name];
    }else if(elem.currentStyle){
        // 否则，尝试使用IE的方法
        console.log("IE");
        return elem.currentStyle[name];
    }else if( document.defaultView &&　document.defaultView.getComputedStyle){
        // 或者W3C 的方法，如果存在的话

        // 它使用的是通用的 ' text-align' 的样式规则而非 'textAlign'
        name = name.replace(/([A-Z])/g,"-$1");
        name = name.toLowerCase();

        // 获取样式对象并获取属性（存在的话）值
        var s = document.defaultView.getComputedStyle(elem,"");
        console.log("W3C");
        return s && s.getPropertyValue(name);
    }else{
        // 否则，用户使用的是其他浏览器
        console.log("Other");
        return null;
    }

}

/**  ------------- 动态元素 ---------- */

/* -----获取位置------------- */

//----两个确定元素相对于整个文档的x和y位置的辅助函数------
// 获取元素的X（水平，左端）位置
function pageX(elem) {
    // 查看我们是否位于根元素
    return elem.offsetParent ?
        // 如果我们能继续得到上一个元素，增加当前的偏移量并继续向上递归
         elem.offsetLeft + pageX(elem.offsetParent) :
        // 否则，获取当前的偏移量
         elem.offsetLeft;
}
// 获取元素的y（垂直，顶端）位置
function pageY(elem) {
    // 查看我们是否位于根元素
    return elem.offsetParent ?
        // 如果我们能继续得到上一个元素，增加当前的偏移量并继续向上递归
        elem.offsetTop + pageY(elem.offsetParent) :
        // 否则，获取当前的偏移量
        elem.offsetTop;
}


//-----确定元素相对于父亲的位置的两个函数--------
function parentX(elem) {
    // 如果offsetParent 是元素的父亲，那么提前退出
    // 否则，我们需要找到元素和元素的父亲相对于整个页面位置，并计算他们之间的差
    return elem.parentNode == elem.offsetParent ? elem.offsetLeft : pageX(elem) - pageX(elem.parentNode);
}
// 获取元素相对于父亲的垂直位置
function parentY(elem) {
    // 如果offsetParent 是元素的父亲，那么提前退出
    // 否则，我们需要找到元素和元素的父亲相对于整个页面位置，并计算他们之间的差
    return elem.parentNode == elem.offsetParent ? elem.offsetTop : pageY(elem) - pageY(elem.parentNode);
}


//------ 获取元素的CSS位置的辅助函数---------------------
  // 查找元素的左端位置
function posX(elem) {
    // 获取最终样式并得到数值
    return parseInt( getStyle(elem,"left"));
}
 // 查找元素的顶端位置
function posY(elem) {
    // 获取最终样式并得到数值
    return parseInt( getStyle(elem,"top"));
}

/* ----------  设置位置 -------------- */

//------ 设置元素x和y位置（与当前位置无关）的一对函数
//设置元素水平位置的函数
function setX(elem,pos) {
    // 使用像素单位设置CSS的'left'属性
    elem.style.left = pos + "px";
}
//设置元素垂直位置的函数
function setY(elem,pos) {
    // 使用像素单位设置CSS的'top'属性
    elem.style.top = pos + "px";
}

//------ 调整元素相对于当前位置的距离的一对函数 ----------------
// 在元素的水平位置上增加像素距离的函数
function addX(elem,pos) {
    // 获取当前水平位置，然后增加偏移量
    setX(elem,posX(elem) +pos);
}
// 在元素的垂直位置上增加像素距离的函数
function addY(elem,pos) {
    // 获取当前垂直位置，然后增加偏移量
    setY(elem,posY(elem) +pos);
}

/** ------------- 元素的尺寸 ------------------- */

/* ---------获取元素当前的高度和宽度 -------- */
// 获取元素的真实高度（使用CSS最终样式值）
function getHeight(elem) {
    // 获取CSS的最终值并解析出可用的数值
    return parseInt( getStyle(elem,'height'))
}
// 获取元素的真实宽度（使用CSS最终样式值）
function getWidth(elem) {
    // 获取CSS的最终值并解析出可用的数值
    return parseInt( getStyle(elem,'width'))
}

/* ----- 即使元素隐藏，亦能分别获取它潜在的完整高度和宽度的两个参数  -------*/
// 查找元素完整的、可能的高度
function fullHeight( elem ) {
    // 如果元素时显示的，那么使用 offsetHeight 就能得到高度，如果没有offsetHeight
    // 则使用getHeight()
    if ( getStyle( elem, 'display' ) != 'none' ){
        return elem.offsetHeight || getHeight( elem );
    }else{
        // 否则，我们必须处理display 为none 的元素，
        // 并且重置它的css属性以获取更精确的读数
        var old = resetCSS( elem, {
            display: '',
            visibility: 'hidden',
            position: 'absolute'
        });

        // 使用clientHeight 找出元素的完整高度，
        // 如果还不生效，则使用getHeight()函数
        var h = elem.clientHeight || getHeight( elem );

        // 最后，恢复CSS的原有属性
        restoreCSS( elem, old );

        // 并返回元素的完整高度
        return h;
    }

}

// Find the full, possible, width of an element (not the actual,
// current, width)
function fullWidth( elem ) {
    // If the element is being displayed, then offsetWidth
    // should do the trick, barring that, getWidth() will work
    if ( getStyle( elem, 'display' ) != 'none' )
        return elem.offsetWidth || getWidth( elem );

    // Otherwise, we have to deal with an element with a display
    // of none, so we need to reset its CSS properties to get a more
    // accurate reading
    var old = resetCSS( elem, {
        display: '',
        visibility: 'hidden',
        position: 'absolute'
    });

    // Figure out what the full width of the element is, using clientWidth
    // and if that doesn't work, use getWidth
    var w = elem.clientWidth || getWidth( elem );

    // Finally, restore the CSS properties back to what they were
    restoreCSS( elem, old );

    // and return the full width of the element
    return w;
}

// 设置CSS 一组属性的函数，它可以恢复到原有设置
function resetCSS( elem, prop ) {
    var old = {};

    // 遍历每一个函数
    for ( var i in prop ) {
        // 记录旧的属性值
        old[ i ] = elem.style[ i ];

        // 并设置新的属性值
        elem.style[ i ] = prop[i];
    }

    // 返回已经变化的值的集合，预留给restoreCSS 函数使用
    return old;
}

// 恢复CSS原有属性，防止resetCSS 函数副作用的函数
function restoreCSS( elem, prop ) {
    // 重置所以属性，恢复他们的原有值
    for ( var i in prop )
        elem.style[ i ] = prop[ i ];
}

/** --------元素的可见性 ------------ */

// ------ 使用CSS的display属性来切换元素可见性的一组函数--------
 // 使用display隐藏元素的函数
function hide(elem) {
    // 找出元素display的当前状态
    var curDisplay = getStyle(elem,"display");

    // 记录它的display状态
    if( curDisplay != 'none'){
        elem.$oldDisplay = curDisplay;
    }
    elem.style.display = 'none'
}
// 使用display 显示元素的函数
function show(elem) {
   // 设置display 属性为它的原始值，如没有记录有原始值，则使用'block'
    elem.style.display = elem.$oldDisplay || '';
}

// ------调节元素透明度的函数--------
// 设置元素的透明度（级别从0-100）
function setOpacity(elem,level) {
    // 如果存在 filters 这个属性，则他是IE，所以设置Alpha 滤镜
    if(elem.filters){
        elem.style.filters = 'alpha(opacity='+ level+')';
    }else {
        // 否则，使用W3C的opacity属性
        elem.style.opacity = level /100;
    }
}

/** ---------动画--------------------*/

/* ----------滑动-------------*/
//----通过在短时间内增加高度逐步显示隐藏元素的函数-----
function slideDown(elem) {
    // 从0 高度开始滑动
    elem.style.height = '0px';

    //先显示元素（但是看不见它，因为它的高度是0）
    show(elem);

    // 找到元素的完整的潜在高度
    var h = fullHeight(elem);

    // 我们在1秒钟内执行一个20帧的动画
    for( var i = 0;i<= 100;i +=5){
        // 保证我们能够保证正确的 'i'的闭包函数
        (function () {
            var pos = i;
            // 设置timeout 以让它能在指定的时间点运行
            setTimeout(function () {
                // 设置元素的新高度
                elem.style.height = ((pos/100)*h) + 'px';
            },((pos +1)*10))
        })()
    }
}

/* ---------- 渐显 -------------*/
function fadeIn(elem) {
    // 从0透明度开始
    setOpacity(elem,0);

    // 先显示元素，但是看不见它，因为它的透明度为0
    show(elem);

    // 我们在1秒钟内执行一个20帧的动画
    for( var i = 0;i<= 100;i +=5){
        // 保证我们能够保证正确的 'i'的闭包函数
        (function () {
            var pos = i;
            // 设置timeout 以让它能在指定的时间点运行
            setTimeout(function () {
                // 给元素设置一个新的透明度
              setOpacity(elem,pos)
            },((pos +1)*10))
        })()
    }
}

/** --------- 浏览器 --------------------*/

/* ---------- 鼠标位置 -------------*/

// ----------- 两个通用函数，用以获取鼠标光标相对于整个页面的当前位置 ---

// 获取光标的水平位置
function getX(e) {
    // 标准事件对象
    e = e || window.event;

    // 先检查非 IE浏览器的位置，再检查IE的位置
    return e.pageX || e.clientX + document.body.scrollLeft;
}
// 获取光标的垂直位置
function getY(e) {
    // 标准事件对象
    e = e || window.event;

    // 先检查非 IE浏览器的位置，再检查IE的位置
    return e.pageY || e.clientY + document.body.scrollTop;
}

//----------------两个获取鼠标相对于当前元素位置的函数 ---------

// 获取鼠标相对于当前元素（事件对象'e'的属性target）的X位置
function getElementX(e) {
    // 获取正确的元素偏移量
    return ( e && e.layerX) || window.event.offsetX;
}
// 获取鼠标相对于当前元素（事件对象'e'的属性target）的Y位置
function getElementY(e) {
    // 获取正确的元素偏移量
    return ( e && e.layerY) || window.event.offsetY;
}