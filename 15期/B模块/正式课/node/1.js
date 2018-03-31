let promise=new Promise((res,rej)=>{
    setTimeout(function () {
        let a="黄瓜";
        res(a)
    },2000)
}).then(function (val) {
    console.log("拍" + val);
});