//1.获取数据
var data;
var xhr = new XMLHttpRequest();
xhr.open("get", "json/banner.json", false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        data = utils.toJSON(xhr.responseText)
    }
};
xhr.send(null);
//console.log(data);
//2.绑定数据
var str = ``;
var sar = ``;
for (var i = 0; i < data.length; i++) {
    //debugger
    var cur = data[i];
    str += `<li class="slide">
                <img src="img/default.gif" data-img="${cur.img}" alt="">     
        </li>`;
    sar += `<li data-index="${i}"></li>`
}
var container=document.getElementById("container");
var wrapper = document.getElementsByClassName("wrapper")[0];
var slideList = wrapper.getElementsByTagName("li");
var focusBox = document.getElementsByClassName("focusBox")[0];
var focusList = focusBox.getElementsByTagName("li");
var arrowLift=document.getElementsByClassName("arrowLift")[0];
var arrowRight=document.getElementsByClassName("arrowRight")[0];
wrapper.innerHTML = str;
focusBox.innerHTML = sar;
// 3.图片懒加载
var img = document.getElementsByTagName("img");
for (var i = 0; i < img.length; i++) {
    var cur = img[i];
    lazyImg(cur);
}
function lazyImg(n) {
    var oimg = document.createElement("img");
    var attr = n.getAttribute("data-img");
    //debugger
    oimg.src = attr;
    oimg.onload = function () {
        n.src = attr;
        utils.css(wrapper,"background","#eee")
        n.style.display="block";
        oimg=null;
    }
}
//4.默认展示
function init(step) {
    step=step||0;
    utils.css(slideList[step], {
        opacity: 1,
        zIndex: 1,
    });
    focusList[step].className = "select";
};
init();
//5.图片自动切换
var step = 0,
    prevStep = 0,
    count=data.length;
function bannerImg() {
    step++;
    if (step===count){
        step=0
    }
    change();
}
var bannerTimer=setInterval(bannerImg, 2000);
function change() {
    utils.css(slideList[step], "zIndex", 1);
    animate({
        curEle: slideList[step],
        target: {"opacity": 1},
        duration: 300
    });
    utils.css(slideList[prevStep], {"zIndex": 0 ,"opacity": 0});
    focusList[step].className = "select";
    focusList[prevStep].className = "";
    prevStep = step;
}
//6.鼠标移入、移出及点击
container.onmouseenter=function () {
    clearInterval(bannerTimer);
};
container.onmouseleave=function () {
    //debugger
    bannerTimer=setInterval(bannerImg,2000)
};
arrowRight.onclick=function () {
    bannerImg();
};
arrowLift.onclick=function () {
    //debugger
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