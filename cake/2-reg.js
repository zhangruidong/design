// let reg = /[0-9]/g

// let str = "aa1a"

// console.log(reg.test(str)) 
// console.log(str.match(reg)) 

var str = 'For more information, see Chapter 3.4.5.1';
var re = /see (chapter \d+(\.\d)*)/i;
var found = str.match(re);
console.log(found);
