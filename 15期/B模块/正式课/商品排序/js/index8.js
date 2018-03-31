/**
 * Created by sssxxx on 2018/1/8.
 */
//1.获取ajax
var look;
var see=new XMLHttpRequest();
see.open("get","json/product.json",false);
see.onreadystatechange=function () {
    if (see.readyState===4 && /^2\d{2}$/.test(see.status)){
        look=utils.toJSON(see.responseText);
    }
}
see.send(null);
//2.获取数据
var watch=``;
for (var i = 0; i < look.length; i++) {
    var cit = look[i];
    watch+=`<li data-time="${cit.time}" data-hot="${cit.hot}" data-price="${cit.price}">
             <img src="${cit.img}" alt="">
             <span>${cit.title}</span>
             <span>${cit.time}</span>
             <span>${cit.hot}</span>
             <span>${cit.price}</span>
</li>`
}
var oul=document.getElementById("oul");
oul.innerHTML=watch;
//3.循环绑定点击事件
var air=document.getElementsByTagName("a")
for (var j = 0; j < air.length; j++) {
    air[j].index=j;
    air[j].flag=1;
    air[j].onclick = function () {
        sortList.call(this)
    }
}
//4.排序
function sortList() {
    var olis=document.getElementsByTagName("li");
    var ary=utils.toArray(olis);
    var newAry=["data-time","data-hot","data-price"];
    var they=this;
    ary.sort(function (a,b) {
        var cuu=a.getAttribute(newAry[they.index]);
        var ner=b.getAttribute(newAry[they.index]);
        if (they.index===0){
            cuu=cuu.replace("-","").replace("-","")
            ner=ner.replace("-","").replace("-","")
        }
        return (cuu-ner)*they.flag;
    })
    this.flag*=-1;
    var frg=document.createDocumentFragment();
    for (var k = 0; k < ary.length; k++) {
        frg.appendChild(ary[k]);
    }
    oul.appendChild(frg)
    frg=null;
}
