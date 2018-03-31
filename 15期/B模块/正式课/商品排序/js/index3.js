/**
 * Created by sssxxx on 2018/1/5.
 */
var oul = document.getElementById("oul");
var aa  = document.getElementsByTagName("a");
var data;
var xhr = new XMLHttpRequest();
xhr.open("get","json/product.json",false);
xhr.onreadystatechange=function () {
    if (xhr.readyState===4 &&/^2\d{2}$/.test(xhr.status)){
        data=utils.toJSON(xhr.responseText);
    }
};
xhr.send(null);
var str=``;
for (var i = 0; i < data.length; i++) {
    var cor= data[i];
    str+=`<li data-time="${cor.time}" data-hot="${cor.hot}" data-price="${cor.price}">
               <img src="${cor.img}" alt="">
               <span>${cor.title}</span>
               <span>${cor.time}</span>
               <span>${cor.hot}</span>
               <span>${cor.price}</span>
</li>`
}
oul.innerHTML = str;
for (var j = 0; j < aa.length; j++) {
    aa[j].index=j;
    aa[j].flag=1;
    aa[j].onclick = function () {
        change.call(this);
    }
}
function change() {c
    var olis=document.getElementsByTagName("li");
    var ary=utils.toArray(olis);
    var that=this;
    var newAry=["data-time","data-hot","data-price"]
    ary.sort(function (a,b) {
        var cur = a.getAttribute(newAry[that.index]);
        var next = b.getAttribute(newAry[that.index]);
        if (that.index===0){
            cur=cur.replace("-","").replace("-","");
            next=next.replace("-","").replace("-","");
        }
        return (cur-next)*that.flag;
    });
    that.flag*=-1;
    //console.log(ary);
    var frg=document.createDocumentFragment();
    for (var k = 0; k < ary.length; k++) {
        frg.appendChild(ary[k]);
    };
    oul.appendChild(frg);
    frg=null;
}