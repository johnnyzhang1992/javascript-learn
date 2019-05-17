let _toString = Object.prototype.toString;
// 定义类型对象
let map = {
    array: "Array",
    object: "Object",
    function: "Function",
    string: "String",
    null: "Null",
    undefined: "Undefined",
    boolean: "Boolean",
    number: "Number"
};
// 返回变量的实际类型
let getType = item => _toString.call(item).slice(8, -1);
// 判断变量类型是否和预想中的一样
let isTypeOf = (item, type) => {
    return map[type] && map[type] === getType(item);
};
// 方法一
// 深拷贝,深度优先遍历
function deepClone(obj, vistedArr = []) {
    let _obj = {};
    // 判断是否是引用类型
    if (isTypeOf(obj, "array") || isTypeOf(obj, "object")) {
        _obj = isTypeOf(obj, "array") ? [] : {};
        let index = vistedArr.indexOf(obj);
        // 若对象已拷贝过。那么直接返回
        // ~index === index !== -1 位取反操作 index+1
        if (~index) {
            _obj = vistedArr[index];
        } else {
            vistedArr.push(obj);
            // for in 会遍历对象以及原型上的可枚举属性
            // 顺序不一定按照实际定义排序
            for (let item in obj) {
                _obj[item] = deepClone(item,vistedArr);
            }
        }
    } else if (getType(obj) === "Function") {
        _obj = eval("(" + obj.toString() + ")");
    } else {
        _obj = obj;
    }
    return _obj;
}

// 方法二
// 深拷贝,深度优先遍历
function deepClone1(obj, vistedArr = []) {
    let _obj = {};
    // 判断是否是引用类型
    if (isTypeOf(obj, "array") || isTypeOf(obj, "object")) {
        _obj = isTypeOf(obj, "array") ? [] : {};
        let index = vistedArr.indexOf(obj);
        // 取出对象或者数组的所有属性名，数组为下标值
        let keys = Object.keys(obj);
        // 若对象已拷贝过。那么直接返回
        // ~index === index !== -1 位取反操作 index+1
        if (~index) {
            _obj = vistedArr[index];
        } else {
            vistedArr.push(obj);
            // 遍历属性名数组
            for (let i = 0; i < keys.length; i++) {
                _obj[keys[i]] = deepClone(obj[keys[i]],vistedArr);
            }
        }
    } else if (getType(obj) === "Function") {
        _obj = eval("(" + obj.toString() + ")");
    } else {
        _obj = obj;
    }
    return _obj;
}

/**
 * 下面为测试
 */

//输入引用类型obj
let obj = {
    a: 1,
    b: () => console.log(1),
    c: {
        d: 3,
        e: 4
    },
    f: [1, 2],
    und: undefined,
    nul: null
};

var objCopy = deepClone(obj)
var objCopy1 = deepClone1(obj)
console.log(objCopy)
console.log(objCopy1)
console.log(objCopy === objCopy1) // 对象类型判断 false 测试通过
console.log(obj.c === objCopy.c) // 对象类型判断 false 测试通过
console.log(obj.c === objCopy1.c) // 对象类型判断 false 测试通过
console.log(obj.b === objCopy1.b) // 函数类型判断 false 测试通过
console.log(obj.b === objCopy.b) // 函数类型判断 false 测试通过
console.log(obj.f === objCopy.f) // 数组类型判断 false 测试通过
console.log(obj.f === objCopy1.f) // 数组类型判断 false 测试通过
console.log(obj.nul, obj.und) // 输出null，undefined 测试通过
