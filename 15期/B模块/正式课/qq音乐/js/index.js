//1.先获取元素
var $header=$(".header"),
    $main=$(".main"),
    $footer=$(".footer"),
    $container=$(".container"),
    musicAudio=$("#musicAudio")[0],
    $musicBtn=$header.find(".musicBtn"),
    $current=$footer.find(".current"),
    $duration=$footer.find(".duration"),
    $already=$footer.find(".already"),
    $wrapper=$main.find(".wrapper");
//2.播放音乐
musicAudio.play();
