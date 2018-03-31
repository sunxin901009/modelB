const http=require("http");
//console.log(http);
//createServer：创建一个服务
let server=http.createServer(function (request,response) {
    //回调函数的执行：当客户端访问一次当前端口，那么回调函数会执行一次；默认给当前回调函数传递两个参数
    //request：包含客户端所有请求信息
    //response：包含了服务端所有的响应信息还有一些返回给客户端的方法
    //response.end()把服务端读取的内容返回给前端
    console.log(request.url);//访问路径
    response.end("nihaome")
});
//设定端口号进行监听
server.listen(8080,function () {
    //如果当前服务创建成功，那么回调函数立即执行，只执行一次；
    console.log("监听成功");
})
//http://172.18.0.7===localhost