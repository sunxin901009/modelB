//1.获取数据ajax
var bannerData = null,
    $container = $("#container"),
    $wrapper = $("#wrapper"),
    $slideList = null,
    $imgList = null,
    $focus = $("#focus"),
    $focusList = null,
    $arrow = $(".arrow"),
    $left = $(".arrow.left"),
    $right = $(".arrow.right");
$.ajax({
    //打开路径
    url: "json/banner.json",
    //方法
    method: "get",
    //数据类型
    dataType: "json",
    //异步
    async: false,
    //成功后存储数据
    success: function (result) {
        bannerData = result;
    }
});
//2.绑定数据
var str = ``,
    focusStr = ``;
$.each(bannerData, function (index, item) {
    str += `<li class="slide">
        <img src="" data-img="${item.img}" alt="">
        </li>`
    focusStr += `<li></li>`
});
$wrapper.html(str);
$focus.html(focusStr);
$slideList = $(".slide");
$imgList = $wrapper.find("img");
$focusList = $focus.children();

//3.图片懒加载
function lazyLoad() {
    $.each($imgList, function (index, item) {
        var oimg = new Image,
            trueSrc = $(item).data("img");
        oimg.src = trueSrc;
        oimg.onload = function () {
            item.src = trueSrc;
            oimg = null;
        }
    })
}
lazyLoad();
//4默认展示
function init() {
    $slideList.eq(0).css({
        zIndex: 1,
        opacity: 1
    });
    $focusList.eq(0).addClass("select")
}
setTimeout(init, 500);
//5.图片轮播
var step = 0;
function bannerMove() {
    step++;
    step === bannerData.length ? step = 0 : null;
    change();
}
var bannerTimer = setInterval(bannerMove, 2000);
function change() {
    var $curSlide = $slideList.eq(step);
    $curSlide.css("zIndex", 1).siblings().css("zIndex", 0);
    $curSlide.stop().animate({opacity: 1}, 300, function () {
        $curSlide.siblings().css("opacity", 0)
    });
    $focusList.eq(step).addClass("select").siblings().removeClass("select");
}
//6.鼠标移入、移出、点击及focus
$container.mouseenter(function () {
    clearInterval(bannerTimer);
    $arrow.css("display", "block");
}).mouseleave(function () {
    bannerTimer = setInterval(bannerMove, 2000);
    $arrow.css("display", "none");
});
$left.click(function () {
    step--;
    step === -1 ? step = bannerData.length - 1 : null;
    change();
});
$right.click(function () {
    bannerMove();
});
$focusList.mouseenter(function (index,item) {
    step=$(this).index();
    change();
});
