const fs = require("fs"),
    http = require("http");

let server= http.createServer(function (request,response) {
   var a=fs.readFileSync("./index.html","utf-8");
     //var b=fs.readFileSync(""+request.url+"","utf-8");
    response.end(a);
});
server.listen(9080,function () {
    console.log("监听成功");
});
