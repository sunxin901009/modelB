/**
 * Created by sssxxx on 2018/1/6.
 */
var oul=document.getElementById("oul");
var aa=document.getElementsByTagName("a");
var data;
var xhr=new XMLHttpRequest();
xhr.open("get","json/product.json",false);
xhr.onreadystatechange=function () {
    if (xhr.readyState===4 && /^2\d{2}$/.test(xhr.status)){
        data=utils.toJSON(xhr.responseText)
    }
}
xhr.send(null);
var str=``;
for (var i = 0; i < data.length; i++) {
    var crr= data[i];
    str+=`<li data-time="${crr.time}" data-hot="${crr.hot}" data-price="${crr.price}">
              <img src="${crr.img}" alt="">
              <span>${crr.title}</span>
              <span>${crr.time}</span>
              <span>${crr.hot}</span>
              <span>${crr.price}</span>
</li>`
}
oul.innerHTML = str;
for (var j = 0; j < str.length; j++) {
    aa[j].index=j;
    var flag=-1;
    aa[j].onclick = function () {
        change(this.index);
        flag*=-1;
    }
}
function change(index) {
    var olis=document.getElementsByTagName("li");
    var ary=utils.toArray(olis);
    var that=this;
    var newAry=["data-time","data-hot","data-price"]
    ary.sort(function (a,b) {
        var cur=a.getAttribute(newAry[index]);
        var next=b.getAttribute(newAry[index]);
        if (index===0){
            cur=cur.replace("-","").replace("-","")
            next=next.replace("-","").replace("-","")
        }
        return (cur-next)*flag;
    });
    var frg=document.createDocumentFragment();
    for (var k = 0; k < ary.length; k++) {
        frg.appendChild(ary[k])
    }
    oul.appendChild(frg);
    frg=null;
}