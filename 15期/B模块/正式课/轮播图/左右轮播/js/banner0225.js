//1.获取数据ajax
var data,
    xhr = new XMLHttpRequest();
xhr.open("get", "json/banner.json", false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        data = utils.toJSON(xhr.responseText)
    }
};
xhr.send();
//2.绑定数据
var outer = document.getElementById("outer"),
    swiper = document.getElementById("swiper"),
    focus = document.getElementById("focus"),
    odivs = swiper.getElementsByTagName("div");

function bindData() {
    var str = ``,
        focusStr = ``;
    for (var i = 0; i < data.length; i++) {
        var cur = data[i];
        str += ` <div>
            <img src="${cur.img}" alt="">
        </div>`
        focusStr += `<li></li>`
    }
    swiper.innerHTML = str;
    focus.innerHTML = focusStr;
    swiper.appendChild(odivs[0].cloneNode(true));

}

bindData();
//3.图片轮播
var step = null,
    picW = odivs[0].offsetWidth,
    focusList = focus.getElementsByTagName("li");
focusList[0].className="selected";
function move() {
    step++;
    if (step === odivs.length) {
        utils.css(swiper, "left", 0);
        step = 1;
    }
    change()
}
setInterval(move, 2000);
function change() {
    zfAnimate(swiper, {left: -step * picW}, 300);
    for (var i = 0; i < focusList.length; i++) {
        i === step ? utils.addClass(focusList[i], "selected") : utils.removeClass(focusList[i], "selected");
        step === 4 ? utils.addClass(focusList[0], "selected") : null;
    }
}