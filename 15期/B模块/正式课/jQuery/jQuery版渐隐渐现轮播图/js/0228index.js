//1.获取数据ajax
var $container = $("#container"),
    conta = $container[0],
    $swiper = $("#swiper"),
    $focus = $("#focus"),
    $arrow = $("#container a"),
    $left = $("#left"),
    $right = $("#right"),
    $imgList,
    $focusList;
$.ajax({
    url: "data.json",
    type: "get",
    async: false,
    success: function (data) {
        bindData(data)
    }
});
function bindData(data) {
    var imgStr = "",
        liStr = "";
    $.each(data, function (index, item) {
        imgStr += "<img data-img=" + item.img + ">";
        liStr += "<li></li>"
    });
    $swiper.html(imgStr);
    $focus.html(liStr);
    $imgList = $swiper.children();
    $focusList = $focus.children();
    delayImg()
}
function delayImg() {
    $imgList.each(function (index, item) {
        //debugger
        var newImg = new Image,
            trueAdd = $(item).attr("data-img");
        newImg.src = trueAdd;
        $(newImg).load(function () {
            item.src = trueAdd;
            newImg = null;
            $imgList.eq(0).show();
            $focusList.eq(0).addClass("select")
        })
    })
}
conta.step = null;
conta.timer = setInterval(autoMove, 2000);
function autoMove() {
    conta.step++;
    conta.step === $focusList.length ? conta.step = 0 : null;
    $imgList.stop().eq(conta.step).fadeIn().siblings().fadeOut();
    $focusList.eq(conta.step).addClass("select").siblings().removeClass("select");
}
$container.hover(function () {
    clearInterval(conta.timer);
    $arrow.show();
}, function () {
    conta.timer = setInterval(autoMove, 2000);
    $arrow.hide();
});
$focusList.mouseover(function () {
    conta.step = $(this).index() - 1;
    autoMove();
});
$right.click(function () {
    autoMove();
});
$left.click(function () {
    conta.step -= 2;
    conta.step === -2 ? conta.step = $focusList.length - 2 : null;
    autoMove();
});