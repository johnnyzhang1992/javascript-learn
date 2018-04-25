/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2018/4/25.
 */

let obj = new Object();
obj.name = 'obj';
obj.age = 28;
console.log(obj);
// 对象字面量表示法
let obj1 = {
  name: 'obj1',
  age: 28
};
console.log(obj1);

function displayInfo(args) {
    let output = '';
    if(typeof args.name == 'string'){
        output += 'Name: '+ args.name + '\n';
    }
    if(typeof args.age == 'number'){
        output += 'Age: '+ args.age + '\n';
    }
    console.log(output);
}

displayInfo(obj);
displayInfo(obj1);

// 访问方式
console.log(obj.name);// 点表示法
console.log(obj['name']);// 方括号语法

let name = 'name';
console.log(obj[name]);// 变量
