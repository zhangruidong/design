/* 代理模式
  代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。

*/
// 缓存代理（乘积计算）
const mult = function () {
  return Array.from(arguments).reduce((previous, current) => {
    return previous * current
  })
}

const proxyMult = (function () {
  const cache = {}
  return function () {
    let args = [].join.call(arguments, ',')
    if (args in cache) {
      return cache[args]
    }
    cache[args] = mult.apply(this, arguments)
    return cache[args]
  }
})()

// console.log(mult(3, 4, 5))
console.log(proxyMult(3, 4, 5))
console.log(proxyMult(3, 4, 5))
