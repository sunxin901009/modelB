/**
 * Created by sssxxx on 2018/1/4.
 */
var oul=document.getElementById("oul");
var as=document.getElementsByTagName("a");
var data;
var xhr=new XMLHttpRequest();
xhr.open("get","json/product.json",false);
xhr.onreadystatechange = function () {
    if (xhr.readyState===4 && /^2\d{2}$/.test(xhr.status)){
        data=utils.toJSON(xhr.responseText)
    }
}
xhr.send(null);
//2.绑定数据  写入页面
var str=``;
for (var i = 0; i < data.length; i++) {
    var cr = data[i];
    str +=`<li data-time="${cr.time}" data-hot="${cr.hot}" data-price="${cr.price}">
            <img src="${cr.img}" alt="">
            <span>${cr.title}</span>
            <span>${cr.time}</span>
            <span>${cr.hot}</span>
            <span>${cr.price}</span>      
</li>`
}
oul.innerHTML = str;
//3.循环绑定点击事件并排序
for (var j = 0; j< as.length; j++) {
    as[j].index=j;
    as[j].flag=1;
    as[j].onclick = function () {
        change.call(this)
    }
}
function change() {
    var olis=document.getElementsByTagName("li");
    var ary=utils.toArray(olis);
    var that=this;
    var newAry=["data-time","data-hot","data-price"];
    ary.sort(function (a,b) {
        var cur=a.getAttribute(newAry[that.index]);
        var next=b.getAttribute(newAry[that.index]);
        if (that.index===0){
            cur=cur.replace("-","").replace("-","");
            next=next.replace("-","").replace("-","");
        }
        return (cur-next)*that.flag;
    });
    that.flag*=-1;
    var frg=document.createDocumentFragment();
    for (var k = 0; k < ary.length; k++) {
        frg.appendChild(ary[k]);
    }
    oul.appendChild(frg);
    frg=null;
}
