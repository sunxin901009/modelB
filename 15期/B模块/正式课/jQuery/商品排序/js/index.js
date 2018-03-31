//1.获取数据ajax
var data,
    str = ``,
    $oul = $("#oul");
$.ajax({
    url: "json/product.json",
    dataType: "json",
    method: "get",
    async: false,
    success: function (result) {
        data = result
    }
});
//2.绑定数据
$.each(data, function (index, item) {
    str += `<li data-time="${item.time}" data-hot="${item.hot}" data-price="${item.price}">
            <img src="${item.img}" alt="">
            <span>${item.title}</span>
            <span>${item.time}</span>
            <span>${item.hot}</span>
            <span>￥${item.price}</span>
           
        </li>`
});
$oul.html(str);
var $olis = $("li");
//3.绑定点击事件并排序
$("a").attr("flag",-1);
$("a").click(function () {
    this.flag=$(this).attr("flag");
    this.flag*=-1;
    $(this).attr("flag",this.flag)
    var index = $(this).index(),
        newAry = ["data-time", "data-hot", "data-price"],
        frag = document.createDocumentFragment();
    var ary=$.makeArray($olis);
    var that=this;
    ary.sort(function (a, b) {
        var cur = a.getAttribute(newAry[index - 1]),
            next = b.getAttribute(newAry[index - 1]);
        if (index === 1) {
            cur = cur.replace(/-/g, "");
            next = next.replace(/-/g, "");
        }
        return (cur - next)*that.flag;
    });
    $.each(ary, function (index, item) {
        $(frag).append(item)
    });
    $oul.append(frag);
    frag = null;
});
