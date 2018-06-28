window.onload = function () {
  console.log(1)
}
const oldOnload = window.onload || function () {}

window.onload = function () {
  oldOnload()
  console.log(2)
}
