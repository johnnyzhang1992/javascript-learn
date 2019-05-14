
console.log('--');

function test(n){
    if (n < 10) { 
        console.log('--n<10--');
    } else {
        console.log('---not---')
    }
}
let promisefy = (fn) => {

    return (n) => { 
        return new Promise((resolve,reject) => {
            fn(n);
            if (n < 10) {
                console.log(n);
                resolve(n)
            } else { 
                reject('message')
            }
        })
    }
   
};

// test(8, (err,data) => { 
//     if (err) { 
//          throw Error('')
//     }
//     console.log(data)
// })
let test_promise = promisefy(test);
async function f_async() { 
    let value = await 1;
    console.log('---async--')
    console.log(value)
}
test_promise(1)
    .then((res) => {
        setTimeout(() => {
            console.log('---settime---')
        },0)
        console.log(res);
        console.log('--then--')
        f_async();
        setTimeout(() => {
            console.log('---settime---')
        },0)
    },()=>{
        console.log('---reject')
    })
    .catch((err) => { console.log(err) });
