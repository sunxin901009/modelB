var $container = $(".container"),
    $musicAudio = $("#musicAudio"),
    $musicBtn = $(".musicBtn"),
    musicAudio = $musicAudio[0],
    $header = $(".header"),
    $main = $(".main"),
    $wrapper = $(".wrapper"),
    wrapper=$wrapper[0],
    $footer = $(".footer"),
    $current = $footer.find(".current"),
    $duration = $footer.find(".duration"),
    $already = $footer.find(".already"),
    already=$already[0],
    $proBg=$(".proBg"),
    proBg=$proBg[0],
    autoTimer;
//1.请求数据
$.ajax({
    url: "json/lyric.json",
    method: "get",
    async: false,
    success: function (data) {
        bindHtml(data.lyric)
    }
});
function computedMain() {
    var winH=document.documentElement.clientHeight,
        rem=parseFloat(document.documentElement.style.fontSize),
       mainH=winH-$header[0].offsetHeight-$footer[0].offsetHeight-.6*rem;
    $main.css("height",mainH/rem+"rem")
}
window.addEventListener("resize",computedMain);
//2.绑定数据
function bindHtml(data) {
    //处理数据
    data = data.replace(/&#(\d+);/g, function (res, a) {
        switch (parseFloat(a)) {
            case 32:
                return " ";
                break;
            case 40:
                return "(";
                break;
            case 41:
                return ")";
                break;
            case 45:
                return "-";
                break;
        }
        return res;
    })
    //存放处理后的数据
    var ary = [];
    data.replace(/\[(\d+)&#58;(\d+)&#46;(?:\d+)\]([^&#]+)(?:&#10)/g, function (res, min, sec, val) {
        ary.push({
            minute: min,
            second: sec,
            value: val
        })
    })
    // console.log(ary);
    var str = ``;
    for (var i = 0; i < ary.length; i++) {
        var item = ary[i]
        str += `<p data-min="${item.minute}" data-sec="${item.second}"> ${item.value}</p>`
    }
    $wrapper.html(str);
    musicAudio.play();
    $musicBtn.addClass("select");
    autoTimer=setInterval(computedTime, 1000);
}

function formateTime(time) {
    var min = Math.floor(time/60),
        sec = Math.ceil(time - min * 60);
    min < 10 ? min = "0" + min : null;
    sec < 10 ? sec = "0" + sec : null;
    return min+":"+sec;

}

$musicBtn.tap(function () {
    if (musicAudio.paused) {
        musicAudio.play();
        $musicBtn.addClass("select")
    } else {
        musicAudio.pause();
        $musicBtn.removeClass("select")
    }

});
var step=0,
    curTop=0;
function computedTime() {
    //在音频的标签对象上有currentTime属性，记录当前的播放时间；duration：代表当前音频一共多少秒；
    var curTime=musicAudio.currentTime,
        durTime=musicAudio.duration,
        cur=formateTime(curTime);
    if(curTime>=durTime){
        clearInterval(autoTimer);
        $musicBtn.removeClass("select");
        $already.css("width","100%");
        return;
    }
    $duration.html(formateTime(durTime));
    $current.html(cur);
    $already.css("width",curTime/durTime*100+"%");
    var min=cur.split(":")[0],
        sec=cur.split(":")[1];
    //获取对应时间下的p标签，p标签的行内属性，data-min、data-sec；
    //filter：如果是行内属性，需要加上[]
    var curP=$wrapper.find("p").filter('[data-min="'+min+'"]').filter('[data-sec="'+sec+'"]');
    if (curP.length>0){
        curP.addClass("select").siblings().removeClass("select");
        step++;
        if (step>=4){
            curTop-=.84;
            $wrapper.css("top",curTop+"rem")
        }
    }
}