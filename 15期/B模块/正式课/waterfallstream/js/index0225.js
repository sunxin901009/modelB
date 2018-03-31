//1.获取数据ajax
var data,
    xhr = new XMLHttpRequest();
xhr.open("get", "data.txt", false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        data = utils.toJSON(xhr.responseText)
    }
};
xhr.send();

//2.绑定数据
function bindData() {
    for (var i = 0; i < 40; i++) {
        var curData = data[Math.round(Math.random() * 7)],
            ulList = document.getElementsByTagName("ul"),
            li = document.createElement("li"),
            img = document.createElement("img"),
            a = document.createElement("a"),
            p = document.createElement("p");
        img.style.height = curData.height;
        img.setAttribute("data-img", curData.src);
        li.appendChild(img);
        a.href = "javascript:;";
        a.innerHTML = "采集";
        li.appendChild(a);
        p.innerHTML = curData.title;
        li.appendChild(p);
        ulList = utils.toArray(ulList);
        ulList.sort(function (a, b) {
            return a.offsetHeight - b.offsetHeight;
        });
        ulList[0].appendChild(li)
    }
}

bindData();
//3.图片懒加载
var imgList = document.getElementsByTagName("img");

function lazy() {
    for (var i = 0; i < imgList.length; i++) {
        lazyLoad(i)
    }
}

var winH = utils.win("clientHeight");
lazy();

function lazyLoad(i) {
    var curImg = imgList[i],
        winT = utils.win("scrollTop"),
        imgH = curImg.offsetHeight,
        imgT = utils.offset(curImg).top;
    if (curImg.flag) return;
    if (winT + winH >= imgT + imgH) {
        var oimg = new Image,
            trueSrc = curImg.getAttribute("data-img");
        oimg.src = trueSrc;
        oimg.onload = function () {
            curImg.src = trueSrc;
            oimg = null;
            fade(curImg);
            curImg.flag = true;
        }
    }
}

var container = document.getElementById("container");
window.onscroll = function () {
    var allH = utils.win("offsetHeight"),
        winT = utils.win("scrollTop");
    if (winT+winH+ 300 >= allH) {
        bindData();
    }
    lazy();
};

function fade(curImg) {
    utils.css(curImg, "opacity", .3);
    curImg.timer = setInterval(function () {
        var op = utils.css(curImg, "opacity");
        if (op >= 1) {
            utils.css(curImg, "opacity", 1);
            clearInterval(curImg.timer);
            return;
        }
        op += .1;
        utils.css(curImg, "opacity", op)
    }, 50)
}