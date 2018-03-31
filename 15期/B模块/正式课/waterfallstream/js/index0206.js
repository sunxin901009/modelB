//1.获取数据ajax
var data,
    container = document.getElementById("container"),
    ouls = container.getElementsByTagName("ul"),
    oulAry = utils.toArray(ouls);
var xhr = new XMLHttpRequest();
xhr.open("get", "data.txt", false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        data = utils.toJSON(xhr.responseText)
    }
}
xhr.send();

//2.绑定数据
function bindData() {
    for (var i = 0; i < 50; i++) {
        var curIndex = Math.round(Math.random() * 7),
            curData = data[curIndex],
            li = document.createElement("li"),
            img = document.createElement("img"),
            a = document.createElement("a"),
            p = document.createElement("p");
        img.setAttribute("data-img", curData.src);
        img.style.height = curData.height;
        li.appendChild(img);
        a.innerHTML = "采集";
        li.appendChild(a);
        p.innerHTML = curData.title;
        li.appendChild(p);
        oulAry.sort(function (a, b) {
            return a.offsetHeight - b.offsetHeight
        });
        oulAry[0].appendChild(li);
    }
}

bindData();
//3.图片懒加载
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
        imgH = curImg.offsetHeight,
        imgT = utils.offset(curImg).top,
        winT = utils.win("scrollTop");
    if (curImg.load) {
        return;
    }
    if (winT + winH >= imgH + imgT) {
        var oimg = new Image,
            trueSrc = curImg.getAttribute("data-img");
        oimg.src = trueSrc;
        oimg.onload = function () {
            curImg.src = trueSrc;
            oimg = null;
            curImg.load = true;
            fade(curImg);
        }
    }
}

window.onscroll = function () {
    var winT = utils.win("scrollTop"),
        allH = utils.win("offsetHeight");
    console.log(allH);
    if (winT + winH + 300 > allH) {
        bindData()
    }
    lazyLoad();
};

function fade(curImg) {
    utils.css(curImg, "opacity", .3);
    var lazyTimer = setInterval(function () {
        var op = utils.css(curImg, "opacity");
        if (op >= 1) {
            utils.css(curImg, "opacity", 1);
            clearInterval(lazyTimer);
            return;
        }
        op += 0.1;
        utils.css(curImg, "opacity", op)
    }, 70)
}