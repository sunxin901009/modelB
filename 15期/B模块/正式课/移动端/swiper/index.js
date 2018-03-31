(function() {
    window.addEventListener("resize",computedSize);
    function computedSize() {
        var winW=document.documentElement.clientWidth;
        document.documentElement.style.fontSize=winW/640*100+"px";
    }
    computedSize();
})()
var mySwiper = new Swiper ('.swiper-container', {
    //垂直方向轮播
    // direction: 'vertical',
    loop: true,
    effect:"effect",
    autoplay:2000,
    pagination: '.swiper-pagination',
    autoplayDisableOnInteraction:false,

})