//1.请求数据
var data,
    outer = document.getElementById("outer"),
    swriper = document.getElementById("swiper"),
    oDivs = swriper.getElementsByTagName("div"),
    oLis = document.getElementsByTagName("li"),
    left = document.getElementById("left"),
    right = document.getElementById("right"),
    oUl = document.getElementById("focus");

var xhr = new XMLHttpRequest();
xhr.open("get", "json/banner.json", false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        data = utils.toJSON(xhr.responseText)
    }
};
xhr.send();

//2.绑定数据
function bindData() {
    var str = ``,
        strLi = ``;
    for (var i = 0; i < data.length; i++) {
        var cur = data[i];
        str += ` <div>
            <img src="${cur.img}" alt="">
        </div>`
        strLi += `<li></li>`
    }
    swiper.innerHTML = str;
    oUl.innerHTML = strLi;
    swriper.appendChild(oDivs[0].cloneNode(true))
}

bindData();
//3.自动轮播
var step = null,
    oDivW = oDivs[0].offsetWidth;

function autoMove() {
    step++;
    if (step === 5) {
        utils.css(swiper, "left", 0);
        step = 1;
    }
    zfAnimate(swiper, {left: step * -oDivW}, 300)
    changeTip(step)
}
setInterval(autoMove, 2000);
function changeTip(n) {
    for (var i = 0; i < oLis.length; i++) {
        i === n ? utils.addClass(oLis[i], "select") : utils.removeClass(oLis[i], "select")
    }
}