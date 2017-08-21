/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/8/21.
 */
// 基本上，修饰器的行为就是下面这样。

@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;
// 注意，修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。