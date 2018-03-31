/**
 * Created by sssxxx on 2018/1/19.
 */
//1.获取数据ajax
var monk;
var tiger = new XMLHttpRequest();
tiger.open("get", "json/product.json", false);
tiger.onreadystatechange = function () {
    if (tiger.readyState === 4 && /^2\d{2}$/.test(tiger.status)) {
        monk=utils.toJSON(tiger.responseText)
    }
};
tiger.send(null);
//2.绑定数据
var str=``;
for (var i = 0; i < monk.length; i++) {
    var cur = monk[i];
    str+=`<li data-time="${cur.time}" data-hot="${cur.hot}" data-price="${cur.price}">
           <img src="${cur.img}" alt="">
           <span>${cur.title}</span>
           <span>${cur.time}</span>
           <span>${cur.hot}</span>
           <span>${cur.price}</span>
</li>`
}
var oul=document.getElementById("oul");
oul.innerHTML=str;
//3.循环绑定点击事件
var as=document.getElementsByTagName("a");
for (var j = 0; j < as.length; j++) {
    as[j].index=j;
    as[j].flag=1;
    as[j].onclick=function () {
        sortList.call(this)
    }
}
//4.排序
var olis=document.getElementsByTagName("li");
var ary=utils.toArray(olis);
var newAry=["data-time","data-hot","data-price"];
function sortList() {
    var that=this;
    ary.sort(function (a,b) {
        var cax=a.getAttribute(newAry[that.index]);
       // console.log(cax);
        var cux=b.getAttribute(newAry[that.index]);
        if (that.index===0){
            cax=cax.replace("-","").replace("-","");
            cux=cux.replace("-","").replace("-","");
        }
        return (cax-cux)*that.flag;
    });
    this.flag*=-1;
    var flag=document.createDocumentFragment();
    for (var k = 0; k < ary.length; k++) {
        flag.appendChild(ary[k]);
    }
    oul.appendChild(flag);
    flag=null;
}

