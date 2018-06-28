/* 代理模式
  代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。

*/
// 代理合并频繁的http请求

const httpRequest = function (id) {
  console.log(id + '正在请求……')
}

const proxyHttpRequest = (function () {
  let cache = []
  let timer = null
  return function (id) {
    cache.push(id)
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      if (cache.length) { // 判断是否需要发请求
        // 这个地方可以优化，请求去重
        httpRequest(cache.join(','))
        cache = []
      }
      clearInterval(timer)
      timer = null
    }, 2000)
  }
})()

let div = document.getElementsByTagName('div')
let num = 0

div[0].onclick = function () {
  num++
  proxyHttpRequest(num)
}
