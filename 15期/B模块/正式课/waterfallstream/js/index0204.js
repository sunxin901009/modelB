//1.获取数据ajax
var data;
var ouls=document.getElementsByTagName("ul");
var oulAry=utils.toArray(ouls);
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
        //每次循环产生一个0-7随机数字，去获取数据
        var round=Math.round(Math.random()*7);
        var curData=data[round];
        //创建li
        var oli=document.createElement("li");
        //创建a
        var curA=document.createElement("a");
        curA.innerHTML="采集";
        curA.href="javascript:;"
        oli.appendChild(curA);
        //给li新增img
        var curImg=document.createElement("img");
        //curImg.src="./images/time.gif";
        //把当前图片的真是路径存储到图片的一个自定义属性上
        curImg.setAttribute("data-real",curData.src);
        //给每张图片随机产生一个200-350之间的高度
        curImg.style.height=Math.round(Math.random()*(350-200)+200)+"px";
        //放入li
        oli.appendChild(curImg);
        //创建p
        var curP=document.createElement("p");
        curP.innerHTML=curData.title;
        oli.appendChild(curP);
        oulAry.sort(function (a,b) {
            //.按照每一个ul的scrollHeight 进行排序
            return a.scrollHeight-b.scrollHeight
        });
        oulAry[0].appendChild(oli);
    };

}
bindData();
var imgs=document.getElementsByTagName("img");
function delayImg() {
    for (var i = 0; i < imgs.length; i++) {
        checkImg(i)
    }
}
var winH=utils.win("clientHeight");
function checkImg(i) {
    var curImg=imgs[i];
    if (curImg.load){
        return;
    }
    var curT=utils.offset(curImg).top;
    var curH=curImg.offsetHeight;
    var winT=utils.win("scrollTop");
    if (winH+winT>curT+curH){
        var trueSrc=curImg.getAttribute("data-real");
        var oimg=new Image();
        oimg.src=trueSrc;
        oimg.onload=function () {
            curImg.src=trueSrc;
            oimg=null;
            curImg.load=true;
            fade(curImg)
        }
    }
}
delayImg();
window.onscroll=function () {
    delayImg();
    var curT=utils.win("scrollTop");
    var allH=utils.win("scrollHeight");
    if (curT+winH+300>allH){
        bindData()
    }
};
function fade(curImg) {
    utils.css(curImg,"opacity",.3);
    var timer=setInterval(function () {
        var curOp=utils.css(curImg,"opacity");
        curOp+=0.1;
        if (curOp>=1){
            utils.css(curImg,"opacity",1);
            clearInterval(timer);
            return
        }
        utils.css(curImg,"opacity",curOp)
    },50)
}
