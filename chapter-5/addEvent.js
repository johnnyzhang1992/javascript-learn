/**
 * Created by zq199 on 2017/3/29.
 */

function addEvent(element,type,handler) {
    // 为每一个时间处理函数赋予一个独立的ID
    if(!handler.$$guid){
        handler.$$guid = addEvent.guid++;
    }
    // 为元素建立一个事件类型的散列表
    if(!element.events){
        element.events = {};
    }
    // 为每对元素/事件 建立一个事件处理函数的散列表
    var handlers = element.events[type];
    if(!handlers){
        handlers = element.events[type] = {};

        // 存储已有的事件处理函数（如果已存在一个）
        if(element["on" + type]){
            handlers[0]  = element["on" + type];
        }
    }
    // 在散列表中存储该事件处理函数
    handlers[handler.$$guid] = handler;

    // 赋予一个全局事件处理函数来处理所以工作
    element["on" + type] = handleEvent;
}
// 创建独立ID 的计算器
addEvent.guid = 1;

function removeEvent(element, type, handler) {
    // delete the event handler from the hash table
    if (element.events && element.events[type]) {
        delete element.events[type][handler.$$guid];
    }
}

function handleEvent(event) {
    var returnValue = true;
    // grab the event object (IE uses a global event object)
    event = event || fixEvent(window.event);
    // get a reference to the hash table of event handlers
    var handlers = this.events[event.type];
    // execute each event handler
    for (var i in handlers) {
        this.$$handleEvent = handlers[i];
        if (this.$$handleEvent(event) === false) {
            returnValue = false;
        }
    }
    return returnValue;
}

function fixEvent(event) {
    // add W3C standard event methods
    event.preventDefault = fixEvent.preventDefault;
    event.stopPropagation = fixEvent.stopPropagation;
    return event;
}
fixEvent.preventDefault = function() {
    this.returnValue = false;
};
fixEvent.stopPropagation = function() {
    this.cancelBubble = true;
};