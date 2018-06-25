/*
单例模式
    保证一个类仅有一个实例，并提供一个访问他的全局访问点
*/

function Singleton (name) {
  this.name = name
  this.instance = null
  this.init()
}
Singleton.prototype.init = function () {
  this.getName()
}

Singleton.prototype.getName = function () {
  console.log(this.name)
}

Singleton.getInstance = function (name) {
  if (this.instance) {
    return this.instance
  } else {
    this.instance = new Singleton(name)
    return this.instance
  }
}

const aaa = Singleton.getInstance('aaa')

const bbb = Singleton.getInstance('bbb').getName()

console.log(aaa === bbb)

console.log()

/* 惰性单例 */
const createLoginLayer = (function () {
  let div
  if (!div) {
    div = document.createElement('div')
    div.innerHTML = '我是登陆浮层'
    document.body.appendChild(div)
  }
  return div
})()

const div = document.getElementById('btn')
div.onclick = function () {
  createLoginLayer().style.display = 'block'
}

/* 单一职责 */
const getSingle = function (fn) {
  let result
  return function () {
    return result || fn.apply(this, arguments)
  }
}

/* 时间只绑定一次 */
const bindEvent = getSingle(function () {
  let div = document.getElementById('div')
  div.addEventListener('click', function () {
    window.alert('click')
  })
  return true
})

bindEvent()

// 此为完整的 惰性单例且单一职责
