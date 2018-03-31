//1.获取数据ajax
var $container = $("#container"),
    cont = $("#container")[0],
    $swiper = $("#swiper"),
    $focus = $("#focus"),
    $imgList,
    $focusList,
    $arrow=$("#container a")
    $left = $("#left"),
    $right = $("#right");
$.ajax({
    url: "data.json",
    type: "get",
    async: false,
    success: function (data) {
        bindData(data)
    }
});

//2.绑定数据
function bindData(data) {
    var str = "",
        liStr = "";
    $.each(data, function (index, item) {
        str += "<img data-img=" + item.img + ">";
        liStr += "<li></li>"
    });
    $swiper.html(str);
    $focus.html(liStr);
    $imgList = $swiper.children();
    $focusList = $focus.children();
    delayImg()
}

//3.图片懒加载
function delayImg() {
    $imgList.each(function (index, item) {
        var newImg = new Image,
            trueSrc = $(item).attr("data-img");
        newImg.src = trueSrc;
        $(newImg).load(function () {
            item.src = trueSrc;
            newImg = null;
        })
    });
    $imgList.eq(0).show();
    $focusList.eq(0).addClass("select");
}
//4.自动轮播
cont.timer = setInterval(autoMove, 2000);
cont.step = 0;
function autoMove() {
    cont.step++;
    cont.step === $imgList.length ? cont.step = 0 : null ;
    $imgList.stop().eq(cont.step).fadeIn().siblings().fadeOut();
    $focusList.eq(cont.step).addClass("select").siblings().removeClass("select");
}
//5.鼠标移上、移出及点击
$container.hover(function () {
    clearInterval(cont.timer);
    $arrow.show();
},function () {
    cont.timer=setInterval(autoMove,2000);
    $arrow.hide();
});
$focusList.mouseover(function () {
    cont.step=$(this).index()-1;
    autoMove()
});
$right.click(function () {
    autoMove()
});
$left.click(function () {
    cont.step-=2;
    cont.step===-2?cont.step=$imgList.length-2:null;
    autoMove();
});