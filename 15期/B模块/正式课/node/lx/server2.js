//自己写一个服务，当浏览器访问地址时，返回一个HTML页面；
//当访问页面时，页面中遇到link、img的src、script的src；都会发送一个请求
//客户端：去服务端拉取文件
//服务端：根据路径读取文件，并且把读取的数据返回给客户端；
let fs=require("fs"),
    url=require("url"),
    http=require("http");
http.createServer(function (request,response) {
    let a=null;
    let {pathname}=url.parse(request.url, true);
    if (pathname=="/"){
        a=fs.readFileSync("./index.html")
    }else {
        try {
            a=fs.readFileSync(`.${pathname}`);
            let reg=/\.[a-zA-Z0-9]+$/i;
            let type=reg.exec(pathname)[0].substr(1).toUpperCase();

        }catch (e){
            response.end("NO FOUND!")
        }
    }
    response.end(a);
}).listen(8080,function () {
    console.log("成功！！！");
});
