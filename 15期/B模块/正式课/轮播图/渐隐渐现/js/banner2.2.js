//1.获取数据ajax
var data;
var xhr = new XMLHttpRequest();
xhr.open("get", "json/banner.json", false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        data = utils.toJSON(xhr.responseText)
    }
};
xhr.send();
//2.绑定数据
var str = ``;
var sar = ``;
for (var i = 0; i < data.length; i++) {
    var cur = data[i];
    str+=`<li class="slide">
            <img src="img/default.gif" data-img="${cur.img}" alt="">
        </li>`
    sar+=`<li></li>`
}
//获取所以要操作的元素
var container=document.getElementById("container")
var wrapper=document.getElementById("wrapper");
var slideList=document.getElementsByClassName("slide");
var imgList=document.getElementsByTagName("img");
var focus=document.getElementById("focus");
var olis=focus.getElementsByTagName("li");
var left=document.getElementsByClassName("left")[0];
var right=document.getElementsByClassName("right")[0];
wrapper.innerHTML=str;
focus.innerHTML=sar;
//3.图片懒加载
for (var i = 0; i < imgList.length; i++) {
    var curImg = imgList[i];
    lazyLoad(curImg)
}
function lazyLoad(curImg) {
    var oimg=new Image();
    var trueSrc=curImg.getAttribute("data-img");
    oimg.src=trueSrc;
    oimg.onload=function () {
        curImg.src=trueSrc;
        oimg=null;
    }
}
//4.默认展示
function defa(index) {
    var index=index||0;
    utils.css(slideList[index],{zIndex:1,opacity:1});
    olis[index].className="select";
}
setTimeout(defa,500);
//5.图片轮播
var step=0,
    preStep=0;
function banner() {
    if (step===slideList.length-1){
        step=-1;
    }
    step++;
    // debugger
    change();
}
function change() {
    //debugger
    utils.css(slideList[step],"zIndex",1);
    animate({
        curEle:slideList[step],
        target:{opacity:1},
        duration:300
    });
    utils.css(slideList[preStep],{zIndex:0,opacity:0});
    olis[step].className="select";
    olis[preStep].className=null;
    preStep=step;
}
var bannerTimer=setInterval(banner,2000);
//6.鼠标移入、移出、点击arrow及focus
container.onmouseenter=function () {
    clearInterval(bannerTimer);
    left.style.display=right.style.display="block";
};
container.onmouseleave=function () {
    bannerTimer=setInterval(banner,2000);
    left.style.display=right.style.display="none";
};
right.onclick=banner;
left.onclick=function () {
    if (step===0){
        step=slideList.length;
    }
    step--;
    change()
};
for (var i = 0; i < olis.length; i++) {
    olis[i].index=i;
    olis[i].onmouseenter=function () {
        step=this.index;
        change()
    }
}