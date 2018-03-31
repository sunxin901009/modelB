var $outer = $("#outer"),
    $swiper = $(".swiper"),
    $focus = $("#focus"),
    $oImgs,
    maxLength;
//1.请求数据ajax
$.ajax({
    url: "./data.json",
    type: "get",
    async: false,
    success: function (data) {
        bindData(data)
}
});

//绑定数据
function bindData(data) {
    var imgStr = "",
        liStr = "";
    $.each(data, function (index, item) {
        imgStr += "<img data-src=" + item.img + ">";
        liStr += "<li></li>"
    });
    $swiper.html(imgStr);
    $focus.html(liStr);
    $("ul li").eq(0).addClass("select");
    $oImgs = $("#outer img");
    maxLength = $oImgs.length;
    delayImg();
}

function delayImg() {
    $oImgs.each(function (index) {
        var trueAddress = $(this).attr("data-src"),
            newImg = new Image,
            that = this;
        newImg.src = trueAddress;
        $(newImg).load(function () {
            that.src = trueAddress;
            index === 0 ? $(that).fadeIn() : null;
            newImg = null;
        })
    });
    outer.step = 0;
    outer.timer = setInterval(autoMove, 2000)
}

function autoMove() {
    outer.step++;
    outer.step === maxLength ? outer.step = 0 : null;
    $oImgs.stop().eq(outer.step).fadeIn().siblings().fadeOut();
    $("ul li").eq(outer.step).addClass("select").siblings().removeClass("select")
}


$("ul li").mouseover(function () {
    outer.step=$(this).index()-1;
    autoMove()
});
$outer.hover(function () {
    clearInterval(outer.timer);
    $("#outer a").show()
}, function () {
    outer.timer = setInterval(autoMove, 2000);
    $("#outer a").hide()
});
$("#right").click(function () {
    autoMove()
});
$("#left").click(function () {
    outer.step -= 2;
    outer.step < -1 ? outer.step = maxLength - 2 : null;
    autoMove()
})