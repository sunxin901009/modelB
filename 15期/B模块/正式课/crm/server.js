const http = require("http"),
    url = require("url"),
    fs = require("fs");
let server = http.createServer(function (req, res) {
    let {pathname,query} = url.parse(req.url, true);
    let reg = /\.([a-z0-9A-Z])+$/i;
    if (reg.test(pathname)) {
        let resoult = fs.readFileSync(`.${pathname}`);
        let type = reg.exec(pathname)[0].substr(1).toUpperCase();
        let myType = "text/plain";
        switch (type) {
            case "HTML":
                myType = "text/html";
                break;
            case "CSS":
                myType = "text/css";
                break;
            case "PNG":
                myType = "image/png";
                break;
            case "JS":
                myType = "text/javascript";
                break;
            case "JSON":
                myType = "application/json";
                break;
        }
        res.writeHead(200, {"content-type": myType + ";charset:utf-8"});
        res.end(resoult);
    }
    //1.获取数据的接口
    //代码如果走此处，那么肯定请求的是数据；不可能是html，css等
    let customPath = "./json/custom.json";
    let con = fs.readFileSync(customPath, "utf-8");
    con=JSON.parse(con);//转JSON格式的对象
    //初始化一个对象
    let trueCon = {"code": 0, "msg": "成功", data: null};
    //查询
    if (pathname === "/getList") {
        trueCon.data = con;
        res.end(JSON.stringify(trueCon));
        return;
    }else if(pathname==="/removeInfo"){
        let curId=query["id"];
        for (let i = 0; i < con.length; i++) {
            if (curId==con[i]["id"]){
                con.splice(i,1);
                break;
            }
        }
        //后端数据json修改完成，需要告诉前端删除成功；
        fs.writeFileSync(customPath,JSON.stringify(con));
        trueCon={"code":0,"msg":"删除成功"};
        res.end(JSON.stringify(trueCon));
        return;
    }else if(pathname==="/getInfo"){
        //返回某个客户的具体信息
        let curId=query["id"];
        for (var i = 0; i < con.length; i++) {
            if (curId==con[i]["id"]){
                trueCon.data=con[i];
                break
            }
        }
        res.end(JSON.stringify(trueCon));
        return;
    }else if(pathname==="/updateInfo"){
        //更新某个客户的信息
        let str=``;
        req.on("data",function (chunk) {
            str+=chunk;
        });
        req.on("end",function () {
            //当请求体中的数据全部拿到执行
            let data=JSON.parse(str);
            for (var i = 0; i < con.length; i++) {
                if (con[i]["id"]==data["id"]){
                    con[i]=data;
                    break;
                }
            }
            fs.writeFileSync(customPath,JSON.stringify(con),"utf-8");
            res.end(JSON.stringify(trueCon))
        })
    }else if(pathname==="/addInfo"){
        let str=``;
        req.on("data",function (chunk) {
            str+=chunk;
        });
        req.on("end",function () {
            let curCus=JSON.parse(str);
            let lastIndex=con.length-1;
            curCus["id"]=Number(con[lastIndex]["id"])+1;
            con.push(curCus);
            fs.writeFileSync(customPath,JSON.stringify(con),"utf-8");
            res.end(JSON.stringify(trueCon))
        })
    }
}).listen(9088, function () {
    console.log("启动服务!!!");
});
