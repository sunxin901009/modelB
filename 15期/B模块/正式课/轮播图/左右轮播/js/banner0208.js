//1.获取数据ajax
var data,
    container = document.getElementById("container"),
    wrapper = document.getElementById("wrapper"),
    focus = document.getElementById("focus"),
    arrow = document.getElementsByClassName("arrow")[0],
    left = document.getElementsByClassName("left")[0],
    right = document.getElementsByClassName("right")[0],
    olisList = wrapper.getElementsByTagName("li"),
    focusList = focus.getElementsByTagName("li");
xhr = new XMLHttpRequest();
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
        str += `<li class="slide">
                <img src="${cur.img}" alt="">
            </li>`
        strLi += `<li></li>`
    }
    wrapper.innerHTML = str;
    focus.innerHTML = strLi;
    wrapper.appendChild(olisList[0].cloneNode(true));
    focusList[0].className = "select";
}

bindData();
//3.自动轮播
var step = null,
    imgW = utils.css(olisList[0], "width"),
    timer = setInterval(move, 2000);

function move() {
    step++;
    if (step === focusList.length + 1) {
        utils.css(wrapper, "left", 0);
        step = 1;
    }
    change();
}

function change() {
    animate({
        curEle: wrapper,
        target: {left: -step * imgW}
        , duration: 300
    });
    for (var i = 0; i < focusList.length; i++) {
        i === step ? utils.addClass(focusList[i], "select") : utils.removeClass(focusList[i], "select");
        step === 4 ? utils.addClass(focusList[0], "select") : null;
    }
}
//4.鼠标移入、移出及点击
container.onmouseenter=function () {
    clearInterval(timer);
    left.style.display=right.style.display="block"
}
container.onmouseleave=function () {
    timer=setInterval(move,2000);
    left.style.display=right.style.display="none"
}
right.onclick=function () {
    move()
};
left.onclick=function () {
    if (step===0){
        utils.css(wrapper,"left",-imgW*(focusList.length))
        step=focusList.length;
    }
    step--;
    change();
};
for (var i = 0; i < focusList.length; i++) {
    focusList[i].index=i;
    focusList[i].onclick=function () {
        step=this.index;
        change()
    }
}