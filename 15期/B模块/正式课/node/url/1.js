const url=require("url");
let str="https://www.zhufengpeixun.com:8080/stu/index.html?name=zf&age=9&course=JS#box";
//console.log(url.parse(str,true));
let a=url.parse(str);
console.log(a.pathname);
//pase：第一个参数是这个地址
//      第二个参数默认false，query的属性值时字符串，传true后唯一区别是会把query的属性值变成对象
// Url {
//     protocol: 'https:',传输协议
//         slashes: true,斜杠
//         auth: null,作者
//         host: 'www.zhufengpeixun.com:8080',域名+端口号
//         port: '8080',端口号
//         hostname: 'www.zhufengpeixun.com',域名
//         hash: '#box',哈希值
//         search: '?name=zf&age=9&course=JS',？+查询参数
//         query: 'name=zf&age=9&course=JS',参数
//         pathname: '/stu/index.html',路径
//         path: '/stu/index.html?name=zf&age=9&course=JS',路径+参数
//         href: 'https://www.zhufengpeixun.com:8080/stu/index.html?name=zf&age=9&course=JS#box' 整个地址
// }