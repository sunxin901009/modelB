/**
 * Created by sssxxx on 2018/1/5.
 */
var oul = document.getElementById("oul");
var ab = document.getElementsByTagName("a");
var data;
var xhr =new XMLHttpRequest();
xhr.open("get","json/product.json",false);
xhr.onreadystatechange=function () {
    if (xhr.readyState=== 4 && /^2\d{2}$/.test(xhr.status)){
        data=utils.toJSON(xhr.responseText);
    }
}
xhr.send(null);
 var str=``;
for (var i = 0; i < data.length; i++) {
    var cur= data[i];
    str+=`<li data-time="${cur.time}" data-hot="${cur.hot}" data-price="${cur.price}">
              <img src="${cur.img}" alt="">
              <span>${cur.title}</span>
              <span>${cur.time}</span>
              <span>${cur.hot}</span>
              <span>${cur.price}</span>
</li>`
}
oul.innerHTML = str;
for (var j = 0; j < ab.length; j++) {
    ab[j].index=j;
    ab[j].flag=1;
    ab[j].onclick = function () {
        change.call(this)
    }
}
function change() {
    var olis = document.getElementsByTagName("li");
    var ary = utils.toArray(olis);
    var that=this;
    var newAry=["data-time","data-hot","data-price"];
    ary.sort(function (a,b) {
        var cor = a.getAttribute(newAry[that.index]);
        var next = b.getAttribute(newAry[that.index]);
        if (that.index===0){
            cor=cor.replace("-","").replace("-","");
            next=next.replace("-","").replace("-","");
        }
        return (cor-next)*that.flag;
    });
    that.flag*=-1;
    console.log(ary);
    var frg=document.createDocumentFragment();
    for (var k = 0; k < ary.length; k++) {
        frg.appendChild(ary[k]);
    }
    oul.appendChild(frg);
    frg=null;
}
