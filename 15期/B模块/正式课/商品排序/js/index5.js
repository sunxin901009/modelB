/**
 * Created by sssxxx on 2018/1/6.
 */
//1.创建ajax
var xhr=new XMLHttpRequest();
var oul=document.getElementById("oul");
var air=document.getElementsByTagName("a");
var tig;
xhr.open("get","json/product.json",false);
xhr.onreadystatechange=function () {
    if (xhr.readyState===4 && /^2\d{2}$/.test(xhr.status)){
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
}
oul.innerHTML=mon;
//3.a标签循环绑定点击事件
for (var j = 0; j < air.length; j++) {
    air[j].index=j;
    air[j].flag=1;
    air[j].onclick=function () {
        change.call(this)
    }
}
//4.排序
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
            next=next.replace("-","").replace("-","")
        }
        return (cur-next)*that.flag;
    });
    this.flag*=-1;
    var frg=document.createDocumentFragment();
    for (var k = 0; k < ary.length; k++) {
        frg.appendChild(ary[k]);
    }
    oul.appendChild(frg);
    frg=null;
}