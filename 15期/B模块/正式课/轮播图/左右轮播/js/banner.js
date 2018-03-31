//1.获取数据ajax
var data;
var xhr = new XMLHttpRequest();
xhr.open("get", "json/banner.json", false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        data = utils.toJSON(xhr.responseText)
    }
};
xhr.send(null);
//2.绑定数据
var str = ``;
var sar = ``;
for (var i = 0; i < data.length; i++) {
    var cur = data[i];
    str += `<li class="slide">
                <img src="" data-img="${cur.img}" alt="">
            </li>`
    sar += `<li></li>`
}
var container=document.getElementById("container");
var wrapper = document.getElementById("wrapper");
var slideList = document.getElementsByClassName("slide");
var focus = document.getElementById("focus");
var focusList = focus.getElementsByTagName("li");
var left = document.getElementsByClassName("left")[0];
var right = document.getElementsByClassName("right")[0];
var imgList = wrapper.getElementsByTagName("img");
wrapper.innerHTML = str;
focus.innerHTML = sar;

//3.图片懒加载
function lz() {
    for (var i = 0; i < imgList.length; i++) {
        var cur = imgList[i];
        lazy(cur);
    }
    clearTimeout(lazyTimer)
}
function lazy(img) {
    var trueSrc = img.getAttribute("data-img");
    var oimg = new Image();
    oimg.src = trueSrc;
    oimg.onload = function () {
        img.src = trueSrc;
        oimg = null;
    }
}
var lazyTimer = setTimeout(lz, 500);

//4.图片轮播
wrapper.appendChild(slideList[0].cloneNode(true));
var index=0;
focusList[index].className="select"
function banner() {
    if (index===slideList.length-1){
        utils.css(wrapper,"left",0)
        index=0
    }
    change(++index)
}
var bnTimer=setInterval(banner,2000)
function change(index) {
    animate({
        curEle:wrapper,
        target:{left:-index*1000},
        duration:500
    })
    var tempIndex=index;
    if (index===slideList.length-1){
        tempIndex=0;
    }
    for (var i = 0; i < focusList.length; i++) {
       focusList[i].className=i===tempIndex?"select":null;
    }
}
//5.鼠标移入、移出及点击
container.onmouseenter=function () {
    clearInterval(bnTimer);
    left.style.display=right.style.display="block";
}

container.onmouseleave=function () {
    bnTimer=setInterval(banner,2000);
    left.style.display=right.style.display="none";
}
right.onclick=function () {
    banner()
}
//当运动到第一张的时候 有问题！！！！
left.onclick=function () {
    if (index===0){
        utils.css(wrapper,"left",-(slideList.length-1)*1000);
        // debugger
        index=slideList.length-1;
    }
    index--;
    change(index)
}
for (var i = 0; i < focusList.length; i++) {
    focusList[i].Myindex=i;
    focusList[i].onmouseenter=function () {
        index=this.Myindex;
        change(index)
    }
}