//1.获取数据ajax
var data,
    container = document.getElementById("container"),
    ouls = container.getElementsByTagName("ul"),
    oulsAry = utils.toArray(ouls);
var xhr = new XMLHttpRequest();
xhr.open("get", "data.txt", false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        data = utils.toJSON(xhr.responseText)
    }
};
xhr.send();

//2.绑定数据
function bindData() {
    for (var i = 0; i < 50; i++) {
        var index = Math.round(Math.random() * 7),
            curData = data[index],
            li = document.createElement("li"),
            oimg = document.createElement("img"),
            a = document.createElement("a"),
            p = document.createElement("p");
        oimg.setAttribute("data-img", curData.src);
        oimg.src = "";
        oimg.style.height = Math.round(Math.random() * (350 - 200) + 200) + "px";
        li.appendChild(oimg);
        a.innerHTML = "采集";
        a.href="javascript:;"
        li.appendChild(a);
        p.innerHTML = curData.title;
        li.appendChild(p);
        oulsAry.sort(function (a, b) {
            return a.scrollHeight - b.scrollHeight;
        });
        oulsAry[0].appendChild(li);
    }
}

bindData();
var imgList = document.getElementsByTagName("img"),
    winH = utils.win("clientHeight");

function lazyLoad() {
    for (var i = 0; i < imgList.length; i++) {
        lazy(i)
    }
}

lazyLoad();

function lazy(i) {
    var curImg = imgList[i],
        winT = utils.win("scrollTop"),
        curH = curImg.offsetHeight,
        curT = utils.offset(curImg).top;
    if (curImg.load) {
        return;
    }
    if (winT + winH >= curT + curH) {
        var oimg = new Image,
            trueSrc = curImg.getAttribute("data-img");
        oimg.src = trueSrc;
        oimg.onload = function () {
            curImg.src = trueSrc;
            oimg = null;
            curImg.load = true;
            fade(curImg)
        }
    }
}

window.onscroll = function () {
    var winT = utils.win("scrollTop"),
        allH = container.offsetHeight;
    if (winT + winH + 300 > allH) {
        bindData();
    }
    lazyLoad()
};

function fade(curImg) {
    utils.css(curImg, "opacity", .3);
    var timer = setInterval(function () {
        var op = utils.css(curImg, "opacity");
        if (op >= 1) {
            utils.css(curImg, "opacity", 1);
            clearInterval(timer);
            return;
        }
        op = op + 0.1;
        utils.css(curImg, "opacity", op)
    }, 50)

}