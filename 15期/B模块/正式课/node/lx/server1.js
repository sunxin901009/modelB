//自己写一个服务，当浏览器访问地址时，返回一个HTML页面；
//当访问页面时，页面中遇到link、img的src、script的src；都会发送一个请求
//客户端：去服务端拉取文件
//服务端：根据路径读取文件，并且把读取的数据返回给客户端；
let fs=require("fs"),
    url=require("url"),
    http=require("http");
//创建一个监听端口号的服务；
//自己的电脑作为服务器：http+IP或者localhost；自己电脑上浏览器作为客户端；客户端的地址栏就可以往服务端发送请求；
http.createServer(function (request,response) {
   //读取HTML的数据
    //每当请求一次，回调函数执行一次；每次读取的都是index.html文件；
    //index.html  css  js  全部返回一个字符串；但是图片不可以返回字符串
    //request：包含了所以请求信息；url 属性值代表当前的
    //获取当前的请求路径
    //浏览器可以判断出后端返回的具体文件类型；按照对应类型的进行加载；
    //低版本的IE不能识别当前是什么类型的文件，需要手动设置响应头；
    let a=null;
    let {pathname}=url.parse(request.url, true);
    if (pathname=="/"){
        a=fs.readFileSync("./index.html")
    }else {
        try {
            a=fs.readFileSync(`.${pathname}`);
        }catch (e){
            response.end("NO FOUND!")
        }
    }
    response.end(a);
}).listen(8081,function () {
    console.log("成功！！！");
});
