// let ary=[1,25,62,9];
// let newAry=ary.reduce(function (prev,next) {
//     //第一次进来，prev：第一项   next：第二项
//     //之后：prev：上一次回调函数的返回值  next：下一项
//     console.log(prev, next);
//     return prev+next;
// });
// console.log(newAry);
// let ary=[{c:3,p:5},{c:4,p:6},{c:5,p:10}];
// let b=ary.reduce((prev,next)=>prev+next.c*next.p,0);
// console.log(b);

// function fn(num) {
//     return num;
// }
// //箭头函数es6
// let fn=(num)=>{return num};
// let fn=num=>num;

// function fn(b) {
//     return function c() {
//         return b+c
//     }
// }
// //箭头函数写法
// let fn=b=>c=>b+c;//高阶函数

// class fn{
//     constructor(num){
//         console.log(num);
//     }
// }
// new fn(100);

// let obj={
//     fn:()=>{
//         console.log(1);
//     }
// };
// //可以写成
// let obj={
//     fn(){
//         console.log(1);
//     }
// };

let f = () => {
    console.log(this);//{}global
};
f.call(100);