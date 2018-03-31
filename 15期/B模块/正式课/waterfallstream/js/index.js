//1.要操作谁就要获取谁
var oUl = document.getElementsByTagName("ul");
var oImgs = document.getElementsByTagName("img");
// 把一个集合装转换成一个真正的数组
var oUlArr = utils.toArray(oUl);
// 2.通过ajax获取后台的数据
var data;
var xhr = new XMLHttpRequest();
xhr.open("get",'data.txt',false);
xhr.onreadystatechange = function () {
    if(xhr.readyState==4 && /^2\d{2}$/.test(xhr.status)){
        data = utils.toJSON(xhr.responseText);
        console.log(data)
    }
};
xhr.send(null);
//3.绑定数据
function bindData() {
    for(var i=0;i<50;i++){
        var str = "<li></li>"
        var oLi = document.createElement("li");
        // li.innerHTML = str;
        // 产生一个随机的索引，去data里面去取图片的信息
        var index = Math.round(Math.random()*7);
        var curentData = data[index];
        console.log(curentData)
        // 每循环一次，创建li 创建一个a 一个img  一个p;
        var a = document.createElement("a");
        a.href = "javascript:;"
        a.innerHTML ="采集";
        oLi.appendChild(a);
        // 创建img
        var img = document.createElement("img");
        img.setAttribute("data-real",curentData.src);
        img.style.height=Math.round(Math.random()*(350-200)+200)+"px";
        oLi.appendChild(img);
        // 创建P 标签
        var p= document.createElement("p");
        p.innerHTML = curentData.title;
        oLi.appendChild(p);
        oUlArr.sort(function (a,b) {
            // console.log(a,b)
            return a.offsetHeight-b.offsetHeight;
        });
        oUlArr[0].appendChild(oLi)
    }
}
bindData()
// 2.当滑动到距离页面底部1000px，进行对页面重新新增元素

var winHeight = utils.win('clientHeight');
var winT = utils.win("scrollTop");
window.onscroll = function () {
    delayImg();
    var winH = utils.win('scrollHeight');
    winT = utils.win("scrollTop");
    // var winHeight = utils.win('clientHeight');
    if(winT+winHeight+1000>winH){
        bindData();
    }
}
//3.图片延迟加载
function delayImg() {
    // 执行一次delayImg就获取一次滚动条卷起的高度
    for(var i=0;i<oImgs.length;i++){
        checkImg(oImgs[i]);
    }
}
delayImg();
// 4.校验当前图片是否应该显示
function checkImg(img) {
    if(img.flag)return;
    // var winHeight = utils.win("clientHeight");
    // var winScrollT = utils.win('scrollTop');
    var curH = img.offsetHeight;
    var curT = utils.offset(img).top;
    var realSrc = img.getAttribute("data-real")
    if(curH+curT<winHeight+winT){
        var Img = document.createElement("img");
        Img.src = realSrc;
        Img.onload = function () {
            img.src = realSrc;
            fadeIn(img);
            Img = null;
            img.flag = true;
        }
    }
}
//5.图片渐变的方法
function fadeIn(img){
    var timer = setInterval(function () {
        var op = utils.css(img,"opacity");
        if(op>1){
            clearInterval(timer);
            return;
        }
        op+=0.1;
        utils.css(img,"opacity",op)
    },100)
}







