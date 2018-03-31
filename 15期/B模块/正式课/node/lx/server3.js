const fs = require("fs"),
    url = require("url"),
    http = require("http");
http.createServer(function (request, response) {
    let {pathname} = url.parse(request.url, true);
    let a = null;
    if (pathname == "/") {
        a = fs.readFileSync("./index.html", "utf-8");
        response.end(a)
    } else {
        try {
            a=fs.readFileSync(`.${pathname}`);
            let reg = /(\.[a-z0-9A-Z]+)$/i;
            let type=reg.exec(pathname)[0].substr(1).toUpperCase();
            let myType="text/html";
            switch (type){
                case "HTML":
                    myType="text/html";
                    break;
                case "CSS":
                    myType="text/css";
                    break;
                case "JS":
                    myType="text/javascript";
                    break;
                case "PNG":
                    myType="text/png"
            }
            respons.writeHead({"content-type":myType+";charset:utf-8"});
            response.end(a)
        } catch (e) {
            response.end("no found")
        }
    }


}).listen(8090, function () {
    console.log("成功！！");
});