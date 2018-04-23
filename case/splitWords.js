/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2018/4/23.
 */
let dict = {
    "家乡" : 1
};
// 待分词的字符串
let words = "我的家乡在松花江边上";

function splitWords(words) {
    let start = 0, end = words.length - 1, result = [];
    while (start != end) {
        let str = [];
        for (let i = start; i <= end; i++) {
            let s = words.substring(i, i + 1);
            str.push(s);
            // 如果在字典中，则添加到分词结果集
            if (str.join('') in dict) {
                result.push(str.join(''));
            }
        }

        start++;
        // console.log(str);
    }

    return result;
}

console.group("Base 分词: ");
console.log("待分词的字符串: ", words);
console.log("分词结果: ", splitWords(words));
console.groupEnd();
