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
function TwoArrDeleteSameDate(arr1,arr2,propertyName) {
    // 先合并
    let concatArr = arr1.concat(arr2);
    // 排序
    concatArr.sort(function (item1,item2) {
        return item1[propertyName] > item2[propertyName]
    });
    // 遍历过程中，相同项删除
    for(let i=concatArr.length-1;i>0;i--){
        if(concatArr[i][propertyName] == concatArr[i-1][propertyName]){
            concatArr.splice(i,1);
            concatArr.splice(i-1,1)
        }
    }
    return concatArr;
}
console.time('time');
console.log(TwoArrDeleteSameDate(_aa,_bb,'id'));
console.timeEnd('time');
