const before = function (fn, beforefn) {
  return function () {
    fn.apply(this, arguments)
    return beforefn.apply(this, arguments)
  }
}
/* 装饰者模式可以动态修改参数
fn和 beforefn 公用一个arguments
arguments是复杂类型的应用，在fn函数中修改arguments也会导致beforefn中参数的修改
这可以应用到对ajax方法的 参数的装饰上

*/

const after = function (fn, afterfn) {
  return function () {
    const ret = afterfn.apply(this, arguments)
    fn.apply(this, arguments)
    return ret
  }
}

console.log(document.getElementById('div'))
document.getElementById = before(function () {
  console.log(1)
}, document.getElementById)

console.log(document.getElementById('div'))
