/**
 * 
 * 简介：
 * vue 通过 原型拦截 的方式重写了数组的7个方法，首先获取到这个数组的 Observer
 * 如果有新的值，就调用 observerArray 对新的值进行监听
 * 然后调用 notify 通知 render watcher，执行 update
 * 
 * 核心：
 * arrayMethods 首先继承了 Array，然后对数组中所有能改变数组自身的方法
 * 如 push、pop 等这些方法重写
 * 获取到 插入的值，然后把新添加的值，变成一个响应式对象
 * 并且再调用 ob.dep.notify() 手动触发依赖通知
 * 
 */
// 获取数组的原型 Array.prototype 有常用的数组方法
var arrayProto = Array.prototype
// 将 arrayMethods 的原型指向 Array.prototype
var arrayMethods = Object.create(arrayProto)
[
    // 列出需要重写的数组方法名
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
].forEach(function (method) {
    // 遍历上述数组方法名，依次将上述重写后的数组方法添加到 arrayMethods 对象上
    var original = arrayProto[method]
    // 保存一份当前的方法名对应的数组的原始方法
    def(arrayMethods, method, function mutator () {
        var args = []
        var len = arguments.length
        while (len--) args[len] = arguments[len]
        // 调用数组数组方法，并传入参数 args，并将执行结果赋给result
        var result = original.apply(this, args)
        // 当数组调用重写后的方法时，this 指向该数组，当该数组为响应式时，就可以获取到 __ob__ 属性
        var ob = this.__ob__
        var inserted
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args    
                break;
            case 'splice':
                inserted = arg.slice(2)
                break;
        }
        if (inserted) {
            ob.observerArray(inserted)
        }
        // 将当前数组的变更通知给其订阅者
        ob.dep.notify()
        // 最后返回执行结果
        return result
    })
})
