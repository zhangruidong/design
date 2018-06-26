/* 策略模式
  定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换

*/

const strategies = {
  S (salary) {
    return salary * 4
  },
  A (salary) {
    return salary * 3
  },
  B (salary) {
    return salary * 2
  }
}

function calculateBonus (level, salary) {
  return strategies[level](salary)
}

console.log(calculateBonus('S', 20000))
console.log(calculateBonus('A', 20000))
console.log(calculateBonus('B', 20000))

const tween = {
  linear: function (t, b, c, d) {
    return c * t / d + b
  },
  easeIn: function (t, b, c, d) {
    return c * (t /= d) * t + b
  },
  strongEaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b
  },
  strongEaseOut: function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b
  },
  sineaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t + b
  },
  sineaseOut: function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b
  }
}

function Animate (dom) {
  this.dom = dom // 进行运动的dom节点
  this.startTime = 0 // 动画开始时间
  this.startPos = 0 // 动画开始时，dom节点的位置，即dom的初始位置
  this.endPos = 0 // 动画结束时，dom节点的位置，即dom的目标位置
  this.propertyName = null // dom节点需要被改变的css属性名
  this.easing = null // 缓动算法
  this.duration = null // 动画持续时间
}

Animate.prototype.start = function (propertyName, endPos, duration, easing) {
  this.startTime = +new Date() // 动画启动时间
  this.startPos = this.dom.getBoundingClientRect()[ propertyName ] // dom节点初始位置
  this.propertyName = propertyName // dom节点需要被改变的CSS属性名
  this.endPos = endPos // dom节点目标位置
  this.duration = duration // 动画持续时间
  this.easing = tween[ easing ] // 缓动算法

  const self = this
  let timeId = setInterval(function () { // 启动定时器，开始执行动画
    if (self.step() === false) { // 如果动画已结束，则清除定时器
      clearInterval(timeId)
    }
  }, 19)
}

Animate.prototype.step = function () {
  let t = +new Date() // 取得当前时间
  if (t >= this.startTime + this.duration) { // (1)
    this.update(this.endPos) // 更新小球的CSS属性值
    return false
  }
  var pos = this.easing(t - this.startTime, this.startPos,
    this.endPos - this.startPos, this.duration)
  // pos为小球当前位置
  this.update(pos) // 更新小球的CSS属性值
}

Animate.prototype.update = function (pos) {
  this.dom.style[ this.propertyName ] = pos + 'px'
}

const div = document.getElementById('div')
const animate = new Animate(div)
animate.start('left', 500, 1000, 'strongEaseOut')
