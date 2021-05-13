const Observer = function (data) {
    // 循环修改为每个属性添加 get 和 set
    for(let key in data) {
        defineReactive(data, key)
    }
    
}