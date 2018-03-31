//fs  是一个内置模块
const fs = require("fs");
//fs 是个对象
// fs.readFile("./tsconfig.json","utf-8",function (error,value) {
//     console.log(value);
//     console.log(error);
// })
//读取文件
//readFile：异步读取文件数据的方法；第一个参数是路径，第二个参数返回的数据类型默认是buffer数据类型的；第三个参数是回调函数，当读取成功之后，会调用这个函数；回调函数中会默认传递两个参数；第一个参数：如果读取失败，error代表错误信息，成功则是null；第二个参数如果数据读取成功，参数值是读取的值；读取不成功是undefined；

//  var a=fs.readFileSync("./tsconfig.json","utf-8");
// console.log(a);
// console.log(typeof a);
//同步读取数据，第一个参数是路径，第二个参数是返回的数据类型；函数的返回值是读取的数据。

//console.log(fs);

//fs.writeFile:向文件中写入数据
//参数：fs.writeFile(pathname,[content],"编码格式",callback())
//fs.writeFile写入时要求也是字符串格式；而且是覆盖式，把之前的内容全部覆盖
//fs.writeFileSync(pathname,[content],"编码格式")  没有回调函数；
// fs.readFile("./json/data2.json", "utf-8", (error, value) => {
//     if (error) {
//         console.log(error);
//     } else {
//        let a= fs.readFileSync("./json/data1.json","utf-8");
//        let newAry=JSON.parse(a);
//        newAry.push(JSON.parse(value));
//         fs.writeFile("./json/data1.json", JSON.stringify(newAry),"utf-8", (e, v) => {
//             console.log(e);//null
//             console.log(v);//undefined
//         })
//     }
// })

//fs.readdir：读取相应路径下的文件
fs.readdir("./less",(error,value)=>{
    console.log(error);
    //value：以数组形势返回，数组中每一项都是对应的文件名；
    console.log(value);
});
let a=fs.readdirSync("./less");
console.log(a);
