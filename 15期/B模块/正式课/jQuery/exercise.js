/**
 * Created by sssxxx on 2018/1/20.
 */
// $("#run").click(function(){
//     $("#gsy:not(:animated)").animate({left: "+=50",bottom: "-=50"}, 1000);
// });
// // $(":header").css("background", "#EEE");
// $(":header").css("background","red")
$('ul li:last').addClass(function() {
    return 'item-' + $(this).index();
});