//1.获取数据ajax
var data;
var xhr=new XMLHttpRequest();
xhr.open("get","json/banner.json",false);
xhr.onreadystatechange=function () {
    if (xhr.readyState===4 && /^2\d{2}$/.test(xhr.status)){
        data=utils.toJSON(xhr.responseText);
    }
};
xhr.send(null);
//2.绑定数据
var str=``;
var sar=``;
for (var i = 0; i < data.length; i++) {
    var cur = data[i];
    str+=` <li id="slid">
            <img src="" data-img="${cur.img}" alt="">
        </li>`
    sar+=`<li></li>`
}
var container=document.getElementById("container");
var wrapper=document.getElementById("wrapper");
var slidList=wrapper.getElementsByTagName("li");
var focus=document.getElementById("focus");
var focusList=focus.getElementsByTagName("li");
var imgList=wrapper.getElementsByTagName("img");
var arrowLeft=document.getElementsByClassName("left")[0];
var arrowRight=document.getElementsByClassName("right")[0];
wrapper.innerHTML=str;
focus.innerHTML=sar;
//3.图片懒加载
for (var i = 0; i < imgList.length; i++) {
    var cur=imgList[i];
    lazyImg(cur);
}
function lazyImg(n) {
    var oimg=new Image();
    var trueSrc=n.getAttribute("data-img");
    oimg.src=trueSrc;
    oimg.onload=function () {
        n.src=trueSrc;
        oimg=null;
    };
    utils.css(n,"display","block")
}
//4.默认展示
function show() {
    utils.css(slidList[0],{
        opacity:1,
        zIndex:1
    });
    focusList[0].className="select";
}
show();
//5.图片轮播
var step=0,
    preStep=0,
    count=data.length;
function banner() {
    step++;
    if (step===count){
        step=0
    }
    change()
}
var bannerTimer=setInterval(banner,2000);
function change() {
    utils.css(slidList[step],"zIndex",1);
    animate({
        curEle:slidList[step],
        target:{"opacity":1},
        duration:300
    });
    utils.css(slidList[preStep],{zIndex:0,opacity:0});
    focusList[step].className="select";
    focusList[preStep].className=null;
    preStep=step;
}
//6.鼠标移入、移出及点击
container.onmouseenter=function () {
    clearInterval(bannerTimer)
};
container.onmouseleave=function () {
    bannerTimer=setInterval(banner,2000)
};
arrowRight.onclick=function () {
    banner()
};
arrowLeft.onclick=function () {
    if (step===0){
        step=count;
    }
    step--;
    change()
};
for (var i = 0; i < focusList.length; i++) {
    focusList[i].index=i;
    focusList[i].onmouseenter=function () {
        step=this.index;
        change()
    }
}