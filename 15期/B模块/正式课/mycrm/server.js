const fs = require("fs"),
    url = require("url"),
    http = require("http");
let server = http.createServer(function (req, res) {
    let {pathname, query} = url.parse(req.url,true),
        reg = /\.([a-zA-Z0-9])+$/i,
        obj = {code: 0, msg: "获取成功", data: null},
        con = fs.readFileSync("./json/custom.json"),
        path="./json/custom.json";
            con = JSON.parse(con);
    if (reg.exec(pathname)) {
        let air = fs.readFileSync(`.${pathname}`);
        res.end(air)
    }else if (pathname==="/getList"){
        let data=con;
        obj.data=con;
        res.end(JSON.stringify(obj))
    }else if(pathname==="/removeInfo"){
        for (let i = 0; i < con.length; i++) {
            if (con[i]["id"]==query["id"]){
                con.splice(i,1);
                break;
            }
        }
        fs.writeFileSync(path,JSON.stringify(con));
        res.end(JSON.stringify(obj))
    }else if(pathname==="/getInfo"){
        for (var i = 0; i < con.length; i++) {
            if(con[i]["id"]==query["id"]){
                obj.data=con[i];
                break;
            }
        }
        res.end(JSON.stringify(obj))
    }else if(pathname==="/updateInfo"){
        let str="";
        req.on("data",function (c) {
            str+=c;
        });
        req.on("end",function () {
            let curData=JSON.parse(str);
            for (let i = 0; i < con.length; i++) {
                if (con[i]["id"]==curData["id"]){
                    con[i]=curData;
                    break;
                }
            }
            fs.writeFileSync(path,JSON.stringify(con));
            res.end(JSON.stringify(obj))
        })
    }else if(pathname==="/addInfo"){
        let str=``;
        req.on("data",function (c) {
            str+=c;
        });
        req.on("end",function () {
            let curData=JSON.parse(str),
                lastIndex=con.length-1,
                id=Number(con[lastIndex]["id"])+1;
            curData["id"]=id;
            con.push(curData);
            fs.writeFileSync(path,JSON.stringify(con));
            res.end(JSON.stringify(obj))
        })
    }


}).listen(9090, function () {
    console.log("启动服务！");
});