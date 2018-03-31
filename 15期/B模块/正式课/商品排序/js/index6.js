/**
 * Created by sssxxx on 2018/1/7.
 */
//1.获取ajax
var tig;
xhr = new XMLHttpRequest();
xhr.open("get", "json/product.json", false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        tig=utils.toJSON(xhr.responseText)
    }
};
xhr.send(null);
//2.获取数据
var mon=``;
for (var i = 0; i < tig.length; i++) {
    var cur= tig[i];
    mon+=`<li data-time="${cur.time}" data-hot="${cur.hot}" data-price="${cur.price}">
              <img src="${cur.img}" alt="">
              <span>${cur.title}</span>
              <span>${cur.time}</span>
              <span>${cur.hot}</span>
              <span>${cur.price}</span>
</li>`
};
var oul=document.getElementById("oul");
oul.innerHTML = mon;
//3.绑定a标签点击事件
var air=document.getElementsByTagName("a");
for (var j = 0; j < air.length; j++) {
    air[j].index=j;
    air[j].flag=1;
    air[j].onclick=function () {
        rank.call(this);
    }
}
//4.排序
function rank() {
    var olis=document.getElementsByTagName("li");
    var ary=utils.toArray(olis);
    var that=this;
    var newAry=["data-time","data-hot","data-price"]
    ary.sort(function (a,b) {
        var cac=a.getAttribute(newAry[that.index])
        var nex=b.getAttribute(newAry[that.index])
        if (that.index===0){
            cac=cac.replace("-","").replace("-","")
            nex=nex.replace("-","").replace("-","")
        }
        return (cac-nex)*that.flag;
    });
    this.flag*=-1;
    //5.将排好的顺序放入UL标签里面
    var frg=document.createDocumentFragment();
    for (var k = 0; k < ary.length; k++) {
        frg.appendChild(ary[k]);
    }
    oul.appendChild(frg);
    frg=null;
}