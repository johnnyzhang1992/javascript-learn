let arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

Array.prototype.flat = function () { 
    return [].concat(...this.map(item => (Array.isArray(item) ? item.flat() : item)))
}
Array.prototype.unquie = function () { 
    // return Array.from(new Set(this))
    return [...new Set(this)]

}
console.log(arr.flat().unquie())

function flatArray(arr) { 
    return [].concat(...arr.map(item => { 
       return  Array.isArray(item) ? flatArray(item) : item
    }))
}
console.log(flatArray(arr))

function flatArray1(arr) { 
    let new_arr = [];
    for (let i = 0; i < arr.length; i++) { 
        let item = arr[i];
        if (Array.isArray(item)) {
            new_arr = new_arr.concat(flatArray(item))
        } else { 
            new_arr = new_arr.concat(item)
        }
    }
    return new_arr;
}
console.log(flatArray1(arr));
     