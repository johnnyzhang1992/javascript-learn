/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2018/5/26.
 */
let _aa = [{
    'id': 1,
    'name': '123'
}, {
    'id': 4,
    'name': '143',
    "code": '2'
}, {
    'id': 6,
    'name': '153'
}, {
    'id': 5,
    'name': '1573'
}];
let _bb = [{
    'id': 1,
    'name': '123'
}, {
    'id': 4,
    'name': '143',
    "code": '2'
},{
    'id':10,
    'name': 'sssss'
}];
// 获取数组中同一属性值相同的元素，并返回组合数组
function twoArraySameData(arr1, arr2,propertyName) {
    let arr_ids  = [];
    arr1.concat(arr2).map(function (item) {
        arr_ids.push(item[propertyName])
    });
    return arr_ids;
}
// 数组相同元素留下，然后去重
function trimSameData(array){
    // 排序
    let sort_arr = array.sort(function (val1,val2) {
        return val1 > val2
    });
    let new_arr = [];
    // 去重
    for(let i=0;i<sort_arr.length;i++){
        if(sort_arr[i] == sort_arr[i+1]){
            new_arr.push(sort_arr[i])
        }
    }
    return new_arr;
}

let deleteSameIdObject = function (arr1,arr2,propertyName) {
    let same_ids = trimSameData(twoArraySameData(arr1,arr2,propertyName));
    let concatArr = arr1.concat(arr2);
    let resultArr = [];
    concatArr.map(function (item) {
        if(same_ids.indexOf(item[propertyName]) == -1){
            resultArr.push(item);
        }
    });
    return resultArr;
};
console.time('time');
console.log(deleteSameIdObject(_aa,_bb,'id'));
console.timeEnd('time');